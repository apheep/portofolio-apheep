const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components', 'sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace: import imgImage from "@/public/assets/file.png";
  // With: const imgImage = "/assets/file.png";
  content = content.replace(/import\s+([a-zA-Z0-9_]+)\s+from\s+["']@\/public\/assets\/(.*?\.(png|jpg|jpeg|svg))["'];?/g, 'const $1 = "/assets/$2";');
  
  fs.writeFileSync(filePath, content);
}
console.log('Fixed imports!');
