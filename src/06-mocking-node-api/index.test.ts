// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const delay = 1000;
    doStuffByTimeout(callback, delay);
    jest.advanceTimersByTime(1000);
    expect(timeoutSpy).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const delay = 1000;
    doStuffByTimeout(callback, delay);

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalled();
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
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const interval = 1000;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(1000);

    expect(intervalSpy).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 500;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const fakePath = 'test.txt';
  const fakeContent = 'Hello, World!';
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const mockedJoin = jest
      .spyOn(path, 'join')
      .mockImplementation((...args) => {
        return '/mocked/path/' + args[args.length - 1];
      });

    await readFileAsynchronously(fakePath);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, fakePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(fakePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(fakeContent));
    const result = await readFileAsynchronously(fakePath);
    expect(result).toEqual(fakeContent);
  });
});
