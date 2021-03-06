import { Injectable } from '@angular/core';
import {BoardModel} from '../shared/board-create/board-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';
import {Route, Router} from '@angular/router';
import {GBoard} from '../gboard';
import {environment} from '../../environments/environment';

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

  getBoardInfo(boardId: number): Observable<GBoard> {
    return this.httpClient.get<GBoard>(this.baseUrl + 'api/boards/' + boardId + '/getInfo');
  }
}
