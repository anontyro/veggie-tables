import * as path from 'path';
import { scanDirectories } from './fileSystemUtils';

describe('scanDirectories', () => {
  test('ensure env is updated correctly', () => {
    process.env.NODE_ENV = 'production';
    expect(process.env.NODE_ENV).toBe('production');
    process.env.NODE_ENV = 'dev';
    expect(process.env.NODE_ENV).toBe('dev');
  });
  test('scanDirectories will return the correct results from mocks/testDir', async () => {
    const dir = path.join(__dirname, '../mocks/testDir');
    const results = await scanDirectories(dir);
    const expected = [
      {
        name: 'carrots_01',
        path: '/mocks/testDir/carrots_01.jpg',
      },
      {
        name: 'default_placeholder',
        path: '/mocks/testDir/default_placeholder.png',
      },
    ];
    expect(results).toStrictEqual(expected);
  });
  test('scanDirectories will return the correct results from mocks/testDir for only supported extensions', async () => {
    const dir = path.join(__dirname, '../mocks/testDir');
    const results = await scanDirectories(dir);
    const expected = [
      {
        name: 'carrots_01',
        path: '/mocks/testDir/carrots_01.jpg',
      },
      {
        name: 'default_placeholder',
        path: '/mocks/testDir/default_placeholder.png',
      },
    ];
    expect(results).toStrictEqual(expected);
  });
  test('scanDirectories will recursively go over all nested directories', async () => {
    const dir = path.join(__dirname, '../mocks/testNestDir');
    const results = await scanDirectories(dir);
    const expected = [
      {
        name: 'default_placeholder',
        path: '/mocks/testNestDir/anotherDir/default_placeholder.png',
      },
      {
        name: 'onions_yellow_01',
        path: '/mocks/testNestDir/anotherDir/finalDir/onions_yellow_01.jpg',
      },
      {
        name: 'carrots_01',
        path: '/mocks/testNestDir/carrots_01.jpg',
      },
    ];
    expect(results).toStrictEqual(expected);
  });
});
