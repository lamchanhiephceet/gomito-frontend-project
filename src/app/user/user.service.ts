import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GUser} from './GUser';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<GUser> {
    return this.http.get<GUser>(this.baseUrl + 'api/users');
  }

  getAllMembers(boardId: number): Observable<GUser[]> {
    return this.http.get<GUser[]>(this.baseUrl + 'api/boards/' + boardId + '/get-members');
  }

  inviteMember(member: GUser, boardId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'api/boards/' + boardId + '/add-member', member);
  }

  updateUserAvatar(user: GUser): Observable<GUser> {
    return this.http.put<GUser>(this.baseUrl + 'api/users/updateAvatar', user);
  }

  // searchMember(boardId: number, search: string): Observable<GUser[]> {
  //   return this.http.get<GUser[]>(this.baseUrl + 'api/users/search/' + boardId + '/' + search);
  // }
}
