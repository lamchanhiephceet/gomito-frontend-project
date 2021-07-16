import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../comment';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllComment(): Observable<Comment[]> {
      return this.httpClient.get<Comment[]>(API_URL + '/comments');
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(API_URL + '/api/comments/', comment);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(API_URL + `/comments/${id}`, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(API_URL + `/api/comments/delete/${id}`);

  }

  getCommentByCardId(cardId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + `/api/cards/writeComment/${cardId}`);
  }
}
