// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ENV } from './env.config';
import { SongsModel } from './models/songs.model';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

  // GET list of public, future songs
  getSongs$(): Observable<SongsModel[]> {
    return this.http
      .get(`${ENV.BASE_API}songs`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET all songs - private and public (admin only)
  getAdminSongs$(): Observable<SongsModel[]> {
    return this.http
      .get(`${ENV.BASE_API}songs/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an song by ID (login required)
  getSongById$(id: string): Observable<SongsModel> {
    return this.http
      .get(`${ENV.BASE_API}songs/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }

}