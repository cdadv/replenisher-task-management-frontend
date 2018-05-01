import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { MatProgressBar, MatButton, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { TokenService } from '../../views/sessions/token.service'


@Injectable()
export class SecuredHttpService {
  private basic_url = 'http://54.213.41.232:8181'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Content-Type, Content-Range, Content-Disposition, Content-Description'
    }),
    params: undefined
  };

  constructor(private http: HttpClient, private tokenService: TokenService, private snack: MatSnackBar) { 
  }


  get(uri: string) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    //
    this.validateAccessToken().subscribe(data => {
      access_token = this.onSuccess();
    }, err => {
      this.onErrorRefresh().subscribe(data => {
        access_token = this.onErrorRefreshSuccess(data);
      }, err => {
        this.onErrorRefreshError(err);
      }
      )
    });
    //
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.get(request_url, this.httpOptions);
  }

  post(uri: string, data: any) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    //
    this.validateAccessToken().subscribe(data => {
      access_token = this.onSuccess();
    }, err => {
      this.onErrorRefresh().subscribe(data => {
        access_token = this.onErrorRefreshSuccess(data);
      }, err => {
        this.onErrorRefreshError(err);
      }
      )
    });
    //
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.post(request_url, data, this.httpOptions);
  }
  
  postSecurely(uri: string, body: any, httpOptions: any) {
    let request_url = this.basic_url + uri;
    let access_token:string = localStorage.getItem('access_token');
    //
    this.validateAccessToken().subscribe(data => {
      access_token = this.onSuccess();
    }, err => {
      this.onErrorRefresh().subscribe(data => {
        access_token = this.onErrorRefreshSuccess(data);
      }, err => {
        this.onErrorRefreshError(err);
      }
      )
    });
    //
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.post(request_url, body, httpOptions);
  }

  put(uri: string, data: any) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    //
    this.validateAccessToken().subscribe(data => {
      access_token = this.onSuccess();
    }, err => {
      this.onErrorRefresh().subscribe(data => {
        access_token = this.onErrorRefreshSuccess(data);
      }, err => {
        this.onErrorRefreshError(err);
      }
      )
    });
    //
    this.httpOptions.params = new HttpParams().append('access_token', access_token);
    return this.http.put(request_url, data, this.httpOptions);
  }

  delete(uri: string, id: any, idName: string) {
    let request_url = this.basic_url + uri;
    let access_token = localStorage.getItem('access_token');
    //
    this.validateAccessToken().subscribe(data => {
      access_token = this.onSuccess();
    }, err => {
      this.onErrorRefresh().subscribe(data => {
        access_token = this.onErrorRefreshSuccess(data);
      }, err => {
        this.onErrorRefreshError(err);
      }
      )
    });
    //
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: new HttpParams().append('access_token', access_token).append(idName, id)
    };
    return this.http.delete(request_url, deleteOptions);
  }

  validateAccessToken(): Observable<any> {
    return this.tokenService.validateAccessToken();
  }

  onSuccess(): string {
    return localStorage.getItem('access_token');
  }

  onErrorRefresh(): Observable<any> {
      return this.tokenService.refreshAccessToken()
    }

  onErrorRefreshSuccess(result: any): string  {
    let access_token = result['access_token'];
    let expires_in = result['expires_in'];
    let refresh_token = result['refresh_token'];
    let token_type = result['token_type'];
    let scope = result['scope'];
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return access_token;
  }

  onErrorRefreshError(err: any): any {
    this.snack.open(err.error.error_description, 'ERROR', { duration: 7000 });
  }
}