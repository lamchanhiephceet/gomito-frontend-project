import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BoardCreateComponent} from '../board-create/board-create.component';
import {AuthService} from '../../auth/auth.service';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {GCard} from '../../gCard';
import {CardService} from '../../card/card.service';
import {WebSocketService} from '../../notification/web-socket-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationModel} from '../../notification/notification-model';
import {NotificationService} from '../../notification/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: string;
  cards: GCard[];
  notifications: NotificationModel[];
  unread: number;

  constructor(public createForm: MatDialog,
              private authService: AuthService,
              private router: Router,
              private localStorage: LocalStorageService,
              private cardService: CardService,
              public webSocketService: WebSocketService,
              private snackBar: MatSnackBar,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.search = '';
    this.cards = [];
    this.notifications = [];
    this.unread = null;

    this.getAllNotifications();
    // bật socket
    const ws = this.webSocketService;
    const $this = this;
    ws.fromUser = this.localStorage.retrieve('username');
    ws.$connect();
    // tslint:disable-next-line:only-arrow-functions typedef
    ws.stompClient.connect({}, function(frame) {
      console.log('connected to: ' + frame);
      // lắng nghe các tín hiệu từ server
      // tslint:disable-next-line:only-arrow-functions typedef
      ws.stompClient.subscribe(ws.topic + ws.fromUser, function(response) {
        const newNotification = JSON.parse(response.body);
        console.log(newNotification);
        ws.hasNewNotification = String(Number(ws.hasNewNotification) + 1);
        console.log(ws.hasNewNotification);
        $this.unread += 1;
        $this.alertNotification(newNotification);
      });
    }, ws.errorCallBack);
  }

  openCreateForm(): void {
    const dialogRef = this.createForm.open(BoardCreateComponent, {
      width: '500px'
    });
  }

  logout(): void {
    this.authService.logout().subscribe(data => {
      console.log('Logout');
    }, error => {
      throwError(error);
    });
    this.localStorage.clear();
    this.router.navigateByUrl('login');
    this.webSocketService.$disconnect();
  }

  toDashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

  changePw(): void {
    this.router.navigateByUrl('dashboard/change-password');
  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }

  searchCard(name: string): void {
    const $this = this;
    $this.cardService.searchCard(name).subscribe(data => {
      $this.cards = data;
      console.log('check search');
      console.log($this.cards);
    });
  }

  viewCard(card: GCard): void {
    this.router.navigate(['/board/' + card.boardId], {queryParams: {cardId: card.cardId}});
    console.log('ok');
  }

  toggleBadgeVisibility(): void {
    this.notificationService.getAllNotifications().subscribe(result => {
      this.notifications = result;
    }, err => {
      throwError(err);
    });
    this.unread = null;
    this.webSocketService.hasNewNotification = '';
    this.notificationService.markRead(this.notifications).subscribe(data => {
    }, err => {
      console.log(err);
    });
  }

  public alertNotification(notification): void {
    this.snackBar.open(notification.message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-class']
    });
  }

  private getAllNotifications(): void {
    this.notificationService.getAllNotifications().subscribe(result => {
      this.notifications = result;
      for (const notification of this.notifications) {
        if (notification.status === 0) {
          this.unread++;
        }
      }
    }, err => {
      throwError(err);
    });
  }
}
