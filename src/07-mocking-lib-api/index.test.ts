// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Title' } }),
  create() {
    return {
      get: this.get.mockResolvedValue({ data: { id: 1, title: 'Title' } }),
    };
  },
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts/1');

    expect(axiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);

    expect(axios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: 'Sample Title',
      body: 'Sample body',
    };
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

    const data = await throttledGetDataFromApi('/posts/1');

    expect(data).toEqual(mockData);
  });
});
