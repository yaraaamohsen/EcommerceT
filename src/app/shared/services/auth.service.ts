import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { loginData, SignupData } from '../models/signup-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environment/base';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router, @Inject(PLATFORM_ID) private _browserID: object) {
    if (isPlatformBrowser(_browserID)) {
      if (localStorage.getItem('userToken') != null) {
        this.decodeUserData();
        this._Router.navigate([localStorage.getItem('currentPage')]);
      }
    }
  }  
  userDecode: BehaviorSubject<any> = new BehaviorSubject(null);

  sendRegister(userData: SignupData): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData);
  }

  sendLogin(userData: loginData): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData);
  }

  decodeUserData(){
    this.userDecode.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken'))));
  }

  sendEmailVerify(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, data)
  }  
  
  sendCode(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, data)
  }

  sendNewPassword(data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, data)
  }
  
}
