import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { JWToken, User } from '../pages/register/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userLogged = new JWToken();
  userLocalStorage: any;

  constructor(private http: HttpClient) {super();}

  register(user: User): Observable<User>{
    return this.http
      .post(this.urlServiceV1 + 'nova-conta', user, this.obterHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  login(user: User): Observable<User>{
    return this.http
      .post(this.urlServiceV1 + 'entrar', user, this.obterHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  confirmEmail(username: string, token: string): Observable<boolean>{
    return this.http
      .post(this.urlServiceV1 + 'confirm-email/' + username + "/" + token, this.obterHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  logout() {
    this.LocalStorage.limparDadosLocaisUsuarioSession();
  }

}