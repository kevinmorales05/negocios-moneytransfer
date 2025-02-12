import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  // public static username?: string = '';

  // public static password?: string = ''

  public static bearerToken?: string = '';

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }
}
