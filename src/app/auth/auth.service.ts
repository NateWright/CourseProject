import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  regreshToke: string,
  expiresIn: string,
  localId: string
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private saveUserKey = 'userData';

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signUpUrl,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(response => this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn))
    );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(this.loginUrl,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(response => this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn))
    );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem(this.saveUserKey));
    if(!userData){
      return;
    }
    
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  logout() {
    localStorage.removeItem(this.saveUserKey);
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(() => new Error(errorMessage));
    }
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Credentials';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(
    email: string, 
    id: string, 
    token: string, 
    expiresIn: number) {
      const expirationDate = new Date((new Date()).getTime() + expiresIn * 1000);
      const user = new User(email, id, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem(this.saveUserKey, JSON.stringify(user));
  }
}
