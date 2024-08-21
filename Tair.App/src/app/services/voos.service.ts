import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Voos } from '@models/voos';
import { Session } from 'inspector';
import { CreateSession } from '@models/create_session';
import { Reservas } from '@models/reservas';

@Injectable({
  providedIn: 'root',
})
export class VoosService extends BaseService {

  constructor(private http: HttpClient) {super();}

  obterVoosHomepage(): Observable<Voos[]> {
    return this.http
        .get<Voos[]>(this.urlServiceV1 + 'voos/obter-voos-sem-paginacao', this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  obterVooPeloId(id: string): Observable<Voos> {
    return this.http
        .get<Voos>(this.urlServiceV1 + 'voos/' + id, this.ObterAuthHeaderJson())
        .pipe(
          // map(this.extractData),
          catchError(this.serviceError)
    );
  }

  obterVooPelaUrl(url: string): Observable<Voos> {
    return this.http
        .get<Voos>(this.urlServiceV1 + 'voos/' + url, this.ObterAuthHeaderJson())
        .pipe(
          // map(this.extractData),
          catchError(this.serviceError)
    );
  }

  testeCheckout(session: CreateSession): Observable<any>{
    return this.http
      .post(this.urlServiceV1 + 'stripe/create-session/', session, this.ObterAuthHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  obterMinhasReservas(): Observable<Reservas[]> {
    return this.http
        .get<Reservas[]>(this.urlServiceV1 + 'reservas/obter-minhas-reservas', this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  cancelarVoo(reservaId: string): Observable<any>{
    return this.http
      .post(this.urlServiceV1 + 'stripe/refund-charge/' + reservaId, null, this.ObterAuthHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

}