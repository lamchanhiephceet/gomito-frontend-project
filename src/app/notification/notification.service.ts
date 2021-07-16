import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationModel} from './notification-model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getAllNotifications(): Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]>(this.baseUrl + 'api/users/get-notifications');
  }

  markRead(notifications: NotificationModel[]): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'api/users/mark-read', notifications);
  }
}
