import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const mockAxios = jest.genMockFromModule<typeof axios>('axios');
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const data = 'content';
  const url = 'users/1';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.mocked(axios.create).mockReturnValue(mockAxios);
    mockAxios.get = jest.fn().mockReturnValue(Promise.resolve({ data }));
    await throttledGetDataFromApi('users/1');
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.mocked(axios.create).mockReturnValue(mockAxios);
    mockAxios.get = jest.fn().mockReturnValue(Promise.resolve({ data }));
    await throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(mockAxios.get).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    jest.mocked(axios.create).mockReturnValue(mockAxios);
    mockAxios.get = jest.fn().mockReturnValue(Promise.resolve({ data }));
    const result = await throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(result).toBe(data);
  });
});
