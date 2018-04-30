import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { MatProgressBar, MatButton, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { TokenService } from '../../views/sessions/token.service'


@Injectable()
export class SecuredHttpService {
  private basic_url = 'http://127.0.0.1:8181'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    params: undefined
  };

  constructor(private http: HttpClient, private tokenService: TokenService, private snack: MatSnackBar) { 
  }

  get(uri: string) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.get(request_url, this.httpOptions);
  }

  post(uri: string, data: any) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.post(request_url, data, this.httpOptions);
  }
  
  postSecurely(uri: string, body: any, httpOptions: any) {
    let request_url = this.basic_url + uri;
    let access_token:string = localStorage.getItem('access_token');
    access_token = this.validateAccessToken();
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.post(request_url, body, httpOptions);
  }

  put(uri: string, data: any) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.put(request_url, data, this.httpOptions);
  }

  delete(uri: string, id: any, idName: string) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: new HttpParams().append('access_token', access_token).append(idName, id)
    };
    return this.http.delete(request_url, deleteOptions);
  }

  validateAccessToken(): any {
    this.tokenService.validateAccessToken().subscribe(data => {
      console.log('access_token validated.')
      return localStorage.getItem('access_token');
    }, err => {
      console.log('access_token expired. Trying to refresh')
      this.tokenService.refreshAccessToken().subscribe(data => {
        let access_token = data['access_token'];
        let expires_in = data['expires_in'];
        let refresh_token = data['refresh_token'];
        let token_type = data['token_type'];
        let scope = data['scope']
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        return access_token;
      }, err => {
        console.error('refreshing access_token failed')
        this.snack.open(err.error.error_description, 'ERROR', { duration: 7000 });
      })
    });
  }
}