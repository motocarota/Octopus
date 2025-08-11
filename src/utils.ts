import { existsSync, readFileSync} from 'fs';
const path = require('path');

export function getFile(fileName: string) {
  let fullPath = path.join(__dirname, 'some', 'path', fileName);

  if (!existsSync(fullPath)) {
    console.error('file not found: ', fullPath);
    return null;
  }
  let file = readFileSync(fullPath);
    
  return file;
}