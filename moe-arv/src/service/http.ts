
import { useToasMessage } from "@/composables/toast/useToastMessage";
import { TOKEN_STORAGE } from "@/utils/constants/constants";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}


const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(TOKEN_STORAGE);
  try {
    if (config && token && token != null && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  } catch (error) {
    throw new Error(error + "");
  }
};

const BASE_URL = "https://api.realworld.io/api"

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return  this.instance ?? this.initHttp(this.defaultErrorHandler);
  }

  private configuration: Readonly<Record<string, string | boolean>> | null =
    null;

  private defaultErrorHandler: boolean = false;

  constructor(defaultErrorHandler: boolean) {
    this.defaultErrorHandler = defaultErrorHandler
  }

  
  initHttp(hasDefaultErrorHandler = true) {
    const headers : any = {
      "Content-Type": "application/json"
      // multipart/form-data
    }
    
    const http = axios.create({
      baseURL: BASE_URL,
      timeout:60000,
      headers
    });

    // INJECT ACCESS TOKEN
    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));
    
    http.interceptors.response.use(
      (response) => response,
      (error) => {
        if(hasDefaultErrorHandler)
          return this.handleError(error);
        else return Promise.reject(error)
      }
    );

    this.instance = http;
    return http;
  }

  public setBaseUrl = (val:string) => {
    this.http.defaults.baseURL = val;
  }

  public setHeaders = (val:{[key:string]:any}) => {
    this.http.defaults.headers =  {...this.http.defaults.headers,...val}
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.options<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error:any) {
    
    let status:any;
    if(error.status){
      status = error.status
    }
    else if(error.response && error.response.status){
      status = error.response.status
    }

    let err = error as any
    let msg = '';
    if(err && err.response && err.response?.data && err.response?.data.errors) {
      let resp = err.response.data.errors as any
      for (let index = 0; index < Object.keys(resp).length; index++) {
        const element = Object.keys(resp)[index];
        msg = `${element} ${resp[element]}`
      }
    }
    const toast = useToasMessage()
    toast.showErrorToast(msg, "Error")

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Unauthorized: {
        break;
      }
      case StatusCode.Forbidden: {
        break;
      }
      default:{
        break;
      }
    }

    return Promise.reject(error);
  }
}

export let http = new Http(true);

