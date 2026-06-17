import { Project, Node } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('Convert Design to React Code/src/imports/EndOfBodyStart/index.tsx');

const functions = sourceFile.getFunctions();
const funcNames = functions.map(f => f.getName()!).filter(Boolean);
const funcMap = new Map();
functions.forEach(f => funcMap.set(f.getName()!, f));

const callGraph: Record<string, string[]> = {};

functions.forEach(f => {
  const name = f.getName()!;
  callGraph[name] = [];
  f.forEachDescendant(node => {
    if (Node.isJsxSelfClosingElement(node)) {
      const tagName = node.getTagNameNode().getText();
      if (funcNames.includes(tagName)) callGraph[name].push(tagName);
    } else if (Node.isJsxOpeningElement(node)) {
      const tagName = node.getTagNameNode().getText();
      if (funcNames.includes(tagName)) callGraph[name].push(tagName);
    } else if (Node.isCallExpression(node)) {
      const exprName = node.getExpression().getText();
      if (funcNames.includes(exprName)) callGraph[name].push(exprName);
    }
  });
});

const getDependencies = (root: string): Set<string> => {
  const deps = new Set<string>();
  deps.add(root);
  const queue = [root];
  while(queue.length > 0) {
    const curr = queue.shift()!;
    const calls = callGraph[curr] || [];
    for(const call of calls) {
      if(!deps.has(call)) {
        deps.add(call);
        queue.push(call);
      }
    }
  }
  return deps;
};

const mainDeps = callGraph['EndOfBodyStart'] || [];
const sectionsDir = path.join(process.cwd(), 'components', 'sections');
if (!fs.existsSync(sectionsDir)) fs.mkdirSync(sectionsDir, { recursive: true });

const sectionDepsList = mainDeps.map(getDependencies);
const allSectionDeps = sectionDepsList.reduce<string[]>((acc, set) => [...acc, ...Array.from(set)], []);

const sharedDeps = new Set<string>();
const countMap: Record<string, number> = {};
allSectionDeps.forEach(dep => {
  countMap[dep] = (countMap[dep] || 0) + 1;
  if (countMap[dep] > 1) sharedDeps.add(dep);
});

// Also add any functions that aren't in sections to shared, just in case
funcNames.forEach(name => {
    if (!countMap[name] && name !== 'EndOfBodyStart') {
        sharedDeps.add(name);
    }
});


let importsText = sourceFile.getImportDeclarations().map(i => i.getText()).join('\n');
importsText = importsText.replace(/from ".\//g, 'from "@/public/assets/');
importsText = importsText.replace(/"\.\/(.*?\.png)"/g, '"/assets/$1"'); // If we use next/image or something, but actually they are imports.
// Wait, in Next.js you can't just import images from public like `import img from "/public/..."`.
// You can import from '@/public/...' if path alias is set. Or better, just fix the paths.

// Write shared.tsx
const sharedComponents: string[] = [];
sharedDeps.forEach(dep => {
  if (funcMap.has(dep)) sharedComponents.push(funcMap.get(dep).getText());
});
fs.writeFileSync(path.join(sectionsDir, 'Shared.tsx'), `import React from 'react';\n${importsText}\n\n${sharedComponents.join('\n\n')}\n\nexport { ${Array.from(sharedDeps).join(', ')} };`);

// Write each section
const exportedSections: string[] = [];
mainDeps.forEach((sectionName, index) => {
  const deps = sectionDepsList[index];
  const sectionDeps = new Set<string>();
  deps.forEach(d => {
    if (!sharedDeps.has(d)) sectionDeps.add(d);
  });
  
  const sectionCode: string[] = [];
  sectionDeps.forEach(d => {
    if (funcMap.has(d)) sectionCode.push(funcMap.get(d).getText());
  });

  const sharedToImport = Array.from(deps).filter(d => sharedDeps.has(d));
  let importShared = '';
  if (sharedToImport.length > 0) {
    importShared = `import { ${sharedToImport.join(', ')} } from './Shared';\n`;
  }

  const fileContent = `import React from 'react';\n${importsText}\n${importShared}\n${sectionCode.join('\n\n')}\n\nexport default ${sectionName};`;
  fs.writeFileSync(path.join(sectionsDir, `${sectionName}.tsx`), fileContent);
  exportedSections.push(sectionName);
});

// Write Main EndOfBodyStart Component
const mainImports = exportedSections.map(s => `import ${s} from './${s}';`).join('\n');
const mainFile = `import React from 'react';\n${mainImports}\n\n${funcMap.get('EndOfBodyStart').getText()}\n\nexport default EndOfBodyStart;`;
fs.writeFileSync(path.join(sectionsDir, 'EndOfBodyStart.tsx'), mainFile);
console.log('Successfully split into components!');
