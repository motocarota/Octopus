import { existsSync, readFileSync} from 'fs';
import { Channel, Env, Post } from './types/Types';
const path = require('path');
import accounts from './accounts'

export function getFile(fileName: string) {
  let fullPath = path.join(__dirname, 'some', 'path', fileName);

  if (!existsSync(fullPath)) {
    console.error('file not found: ', fullPath);
    return null;
  }
  let file = readFileSync(fullPath);
    
  return file;
}