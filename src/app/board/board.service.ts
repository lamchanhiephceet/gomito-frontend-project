import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';
import {Route, Router} from '@angular/router';
import {GBoard} from '../models/gboard';
import {environment} from '../../environments/environment';
import {GUser} from '../user/GUser';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) { }

  // tslint:disable-next-line:typedef
  createBoard(newBoard: GBoard): Observable<GBoard> {
    // const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.retrieve('authenticationToken'));
    return this.httpClient.post<GBoard>(this.baseUrl + 'api/boards/', newBoard);
  }

  getBoardList(): Observable<GBoard[]>{
    const id = this.localStorage.retrieve('userId');
    return this.httpClient.get<GBoard[]>(this.baseUrl + 'api/users/' + id);
  }

  getBoardInfo(boardId: any): Observable<GBoard> {
    return this.httpClient.get<GBoard>(this.baseUrl + 'api/boards/' + boardId + '/getInfo');
  }

  downLoadFile(): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.baseUrl + 'api/boards/excel', {
      responseType: 'blob', observe: 'response'
    });
  }

  getAllExcelData(): Observable<HttpResponse<any>> {
    // const id = this.localStorage.retrieve('userId');
    return this.httpClient.get(this.baseUrl + 'api/boards/excel-info', {observe: 'response'});
  }

  // searchMember(search: string): Observable<GUser> {
  //   return this.httpClient.get<GUser>(this.baseUrl + 'api/cards/searches/' + search);
  // }
}
