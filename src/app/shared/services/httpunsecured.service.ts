import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { MatProgressBar, MatButton, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { TokenService } from '../../views/sessions/token.service'


@Injectable()
export class UnsecuredHttpService {
  private basic_url = 'http://ec2-54-213-41-232.us-west-2.compute.amazonaws.com:8181'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    params: undefined
  };

  constructor(private http: HttpClient, private snack: MatSnackBar) { 
  }

  postUnsecurely(uri: string, body: any, httpOptions: any) {
    let request_url = this.basic_url + uri;
    return this.http.post(request_url, body, httpOptions);
  }
}