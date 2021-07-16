import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocketEndPoint = 'http://localhost:8080/notifications';
  topic = '/topic/notify/';
  stompClient: any;
  fromUser;
  hasNewNotification: string;
  snackBar: MatSnackBar;

  constructor() {
  }

  $connect(): void {
    console.log('Initialize webSocket Connection...');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    console.log(this.fromUser + ' connecting to server...');
    this.hasNewNotification = '';
  }

  $disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnect');
  }

  errorCallBack(error): void {
    console.log(error);
    setTimeout(() => {
      this.$connect();
    }, 5000);
  }

  $sendAll(cardId: number, msg: string): void {
    console.log('Send notification to all members');
    this.stompClient.send('/app/notifyAll/' + cardId, {}, JSON.stringify({
      senderName: this.fromUser,
      message: this.fromUser + msg
    }));
  }

  $sendOne(cardId: number, msg: string, name: string): void {
    console.log('Send notification to ' + name);
    this.stompClient.send('/app/notifyOne/' + cardId, {}, JSON.stringify({
      senderName: this.fromUser,
      message: this.fromUser + msg,
      receiverName: name
    }));
  }
}
