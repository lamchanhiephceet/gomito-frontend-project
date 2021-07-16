import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "./web-socket-service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  user: '';
  group: '';
  notification: string[] = [];
  webSocketService: WebSocketService;
  webSocketEndPoint = 'http://localhost:8080/notify';
  topic = '/topic/notify/';
  taskNotification: string;

  constructor() { }

  ngOnInit(): void {
    this.webSocketService = new WebSocketService();
    this.webSocketService.webSocketEndPoint
  }

}
