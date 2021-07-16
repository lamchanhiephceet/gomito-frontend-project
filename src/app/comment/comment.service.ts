import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../comment';
import {environment} from '../../environments/environment';

// const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getAllComment(): Observable<Comment[]> {
      return this.httpClient.get<Comment[]>(this.baseUrl + 'comments');
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(this.baseUrl + 'api/comments/', comment);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(this.baseUrl + `comments/${id}`, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(this.baseUrl + `api/comments/delete/${id}`);

  }

  getCommentByCardId(cardId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.baseUrl + `api/cards/writeComment/${cardId}`);
  }
}
