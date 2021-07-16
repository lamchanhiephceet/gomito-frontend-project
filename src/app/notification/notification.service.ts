import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationModel} from './notification-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getAllNotifications(): Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]>('http://localhost:8080/api/users/get-notifications');
  }

  markRead(notifications: NotificationModel[]): Observable<any> {
    return this.httpClient.put('http://localhost:8080/api/users/mark-read', notifications);
  }
}
