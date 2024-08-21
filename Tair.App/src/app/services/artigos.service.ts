import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Artigos } from '@models/artigos';

@Injectable({
  providedIn: 'root',
})
export class ArtigosService extends BaseService {

  constructor(private http: HttpClient) {super();}

  obterArtigos(): Observable<Artigos[]> {
    return this.http
        .get<Artigos[]>(this.urlServiceV1 + 'artigos/obter-artigos-sem-paginacao', this.obterHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  obterArtigoPeloId(id: string): Observable<Artigos> {
    return this.http
        .get<Artigos>(this.urlServiceV1 + 'artigos/' + id, this.obterHeaderJson())
        .pipe(
          catchError(this.serviceError)
    );
  }

  obterArtigoPelaUrl(url: string): Observable<Artigos> {
    return this.http
        .get<Artigos>(this.urlServiceV1 + 'artigos/' + url, this.obterHeaderJson())
        .pipe(
          catchError(this.serviceError)
    );
  }

}