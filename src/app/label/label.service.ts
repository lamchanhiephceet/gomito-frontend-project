import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Glabel} from '../glabel';
import {G} from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private httpClient: HttpClient) { }

  getAllLabels(boardId: number): Observable<Glabel[]>{
    return this.httpClient.get<Glabel[]>('http://localhost:8080/api/boards/getAllLabel/' + boardId);
  }

  createLabel(label: Glabel): Observable<Glabel>{
    return this.httpClient.post<Glabel>('http://localhost:8080/api/labels/', label);
  }
}
