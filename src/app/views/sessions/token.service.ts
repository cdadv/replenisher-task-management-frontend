import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { UnsecuredHttpService } from '../../shared/services/httpunsecured.service';


@Injectable()
export class TokenService {
    private grant_type = {
        password: 'password',
        refresh: 'refresh_token'
    }
    private scope: string = 'select';
    private client_id: string = 'clientId';
    private client_secret: string = 'clientSecret';

    constructor(private unsecuredHttpService: UnsecuredHttpService) { }

    getAccessToken(signInData): Observable<any> {
        let username = signInData.username;
        let password = signInData.password;
        const uri = '/oauth/token';
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
              }),
              params: new HttpParams()
              .append('username', username)
              .append('password', password)
              .append('grant_type', this.grant_type.password)
              .append('scope', this.scope)
              .append('client_id', this.client_id)
              .append('client_secret', this.client_secret)
        }
        return this.unsecuredHttpService.postUnsecurely(uri, null, httpOptions)
    }

    validateAccessToken(): Observable<any> {
        let access_token_old = localStorage.getItem('access_token');
        const uri = '/oauth/check_token';
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
              }),
              params: new HttpParams()
              .append('token', access_token_old)
        }
        return this.unsecuredHttpService.postUnsecurely(uri, null, httpOptions)
    }

    refreshAccessToken(): Observable<any> {
        let refresh_token_old = localStorage.getItem('refresh_token');
        const uri = '/oauth/token';
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
              }),
              params: new HttpParams()
              .append('refresh_token', refresh_token_old)
              .append('grant_type', this.grant_type.refresh)
              .append('client_id', this.client_id)
              .append('client_secret', this.client_secret)
        }
        return this.unsecuredHttpService.postUnsecurely(uri, null, httpOptions)
    }

    
}