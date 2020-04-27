import * as path from 'path';

const fs = require('fs').promises;

interface FileItem {
  name: string;
  path: string;
}

export const scanDirectories = async (dirName: string, results: FileItem[] = []) => {
  let files = await fs.readdir(dirName, { withFileTypes: true });
  for (let f of files) {
    let fullPath = path.join(dirName, f.name);
    if (f.isDirectory()) {
      await scanDirectories(fullPath, results);
    } else {
      const relativePath = fullPath.split('server')[1] || '';
      results.push({
        name: f.name.split('.')[0],
        path: relativePath,
      });
    }
  }
  return results;
};
