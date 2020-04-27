import * as path from 'path';

const fs = require('fs').promises;
const supportedExtensions = ['jpg', 'jpeg', 'png'];

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
      let imageFolder = 'server';
      if (process.env.NODE_ENV === 'production') {
        imageFolder = 'build';
      }
      const relativePath = fullPath.split(imageFolder)[1] || '';
      const name = f.name.split('.');
      if (supportedExtensions.includes(name[1])) {
        results.push({
          name: name[0],
          path: relativePath,
        });
      }
    }
  }
  return results;
};

export const saveFile = async (file: any, saveDir: string) => {
  if (!file) {
    return null;
  }

  try {
    await fs.stat(saveDir);
  } catch (err) {
    await fs.mkdir(saveDir);
  }

  try {
    await fs.copyFile(file.path, `${saveDir}/${file.name}`);
    return {
      name: file.name,
      dir: `${saveDir}/${file.name}`.split('server')[1] || '',
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
