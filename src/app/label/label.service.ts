import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Glabel} from '../glabel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getAllLabels(boardId: number): Observable<Glabel[]>{
    return this.httpClient.get<Glabel[]>(this.baseUrl + 'api/boards/getAllLabel/' + boardId);
  }

  createLabel(label: Glabel): Observable<Glabel>{
    return this.httpClient.post<Glabel>(this.baseUrl + 'api/labels/', label);
  }
}
