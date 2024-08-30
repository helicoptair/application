import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Voos } from '@models/voos';
import { CreateSession } from '@models/create_session';
import { Reservas } from '@models/reservas';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class VoosService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterVoosHomepage(): Observable<Voos[]> {
    return this.http
      .get<Voos[]>(`${this.urlServiceV1}voos/obter-voos-sem-paginacao`, this.ObterAuthHeaderJson())
      .pipe(
        tap(data => console.log('Dados recebidos (VoosHomepage):', data)),
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  obterVooPeloId(id: string): Observable<Voos> {
    return this.http
      .get<Voos>(`${this.urlServiceV1}voos/${id}`, this.ObterAuthHeaderJson())
      .pipe(
        tap(data => console.log('Dados recebidos (VooPeloId):', data)),
        catchError(this.handleError)
      );
  }

  obterVooPelaUrl(url: string): Observable<Voos> {
    return this.http
      .get<Voos>(`${this.urlServiceV1}voos/${url}`, this.ObterAuthHeaderJson())
      .pipe(
        tap(data => console.log('Dados recebidos (VooPelaUrl):', data)),
        catchError(this.handleError)
      );
  }

  testeCheckout(session: CreateSession): Observable<any> {
    return this.http
      .post(`${this.urlServiceV1}stripe/create-session/`, session, this.ObterAuthHeaderJson())
      .pipe(
        tap(data => console.log('Dados recebidos (Checkout):', data)),
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  obterMinhasReservas(): Observable<Reservas[]> {
    return this.http
      .get<Reservas[]>(`${this.urlServiceV1}reservas/obter-minhas-reservas`, this.ObterAuthHeaderJson())
      .pipe(
        tap(data => console.log('Dados recebidos (MinhasReservas):', data)),
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  cancelarVoo(reservaId: string): Observable<any> {
    return this.http
      .post(`${this.urlServiceV1}stripe/refund-charge/${reservaId}`, null, this.ObterAuthHeaderJson())
      .pipe(
        tap(data => console.log('Dados recebidos (CancelarVoo):', data)),
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error(error.message || 'Erro no servidor'));
  }
}
