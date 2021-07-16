import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from './signup/signup-request';
import {Observable} from 'rxjs';
import {LoginRequest} from './login/login-request';
import {ChangePasswordRequest} from '../change-password/change-password-request';
import {LoginResponse} from './login/login-respponse';
import {LocalStorageService} from 'ngx-webstorage';
import {tap} from 'rxjs/operators';
import {RefreshTokenRequest} from './refresh-token-request';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService) { }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post('http://localhost:8080/auth/signup', signupRequest,
      {responseType: 'text'});
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8080/auth/login', loginRequest);
  }

  // @ts-ignore
  verifyToken(token: string): Observable<any> {
    return this.http.get('http://localhost:8080/auth/accountVerification/' + token);
  }

  addMemberVerifyToken(token: string): Observable<any>{
    return this.http.get('http://localhost:8080/api/users/join/' + token);
  }

  // tslint:disable-next-line:typedef
  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }

  // tslint:disable-next-line:typedef
  refreshToken() {
    return this.http.post<LoginResponse>('http://localhost:8080/auth/refresh/token',
      this.refreshToken())
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  // tslint:disable-next-line:typedef
  changePassword(changePwRequest: ChangePasswordRequest): Observable<any> {
    console.log(changePwRequest);
    return this.http.post('http://localhost:8080/api/users/change-password', changePwRequest);
  }
  // tslint:disable-next-line:typedef
  getUserName() {
    return this.localStorage.retrieve('username');
  }

  // tslint:disable-next-line:typedef
  private getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  logout(): Observable<any> {
    const logoutReq: RefreshTokenRequest = {
      username: this.localStorage.retrieve('username'),
      refreshToken: this.localStorage.retrieve('refreshToken')
    };
    console.log(logoutReq);
    return this.http.post('http://localhost:8080/auth/logout', logoutReq);
  }
}
