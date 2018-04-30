import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
  private access_token = '437f9497-749c-4bb5-9d36-0e081832cc14';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    params: new HttpParams().set('access_token', this.access_token)
  };

  constructor(private http: HttpClient) { 
  }

  get(uri: string) {
    return this.http.get(uri, this.httpOptions);
  }

  post(uri: string, data: any) {
    return this.http.post(uri, data, this.httpOptions);
  }

  put(uri: string, data: any) {
    return this.http.put(uri, data, this.httpOptions);
  }

  delete(uri: string, id: any, idName: string) {
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: new HttpParams().append('access_token', this.access_token).append(idName, id)
    };
    return this.http.delete(uri, deleteOptions);
  }
}