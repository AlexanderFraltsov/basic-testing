import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    const timeout = 1000;
    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    const interval = 1000;
    doStuffByInterval(cb, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 1000;
    doStuffByInterval(cb, interval);

    expect(cb).not.toHaveBeenCalled();

    const times = 5;
    jest.advanceTimersByTime(times * interval);
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  const mockedJoin = jest.mocked(join).mockReturnValue('');
  const mockedExistsSync = jest.mocked(existsSync);
  const content = 'content';
  const mockedReadFile = jest.mocked(readFile);
  const pathToFile = 'path_to_file';

  test('should call join with pathToFile', async () => {
    mockedExistsSync.mockReturnValue(false);
    await readFileAsynchronously(pathToFile);
    expect(mockedJoin).toHaveBeenLastCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    mockedExistsSync.mockReturnValue(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockReturnValue(Promise.resolve(content));
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(content);
  });
});
