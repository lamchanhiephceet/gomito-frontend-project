import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DashboardService} from './dashboard.service';
import {GUser} from '../user/GUser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;
  email: string;
  selectedImage: any = null;
  imgSrc: string;

  constructor(private userService: UserService,
              private dashboardService: DashboardService,
              private storage: AngularFireStorage,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.isLogin) {
        this.openSnackBar();
      }
    });
    this.userService.getUserInfo().subscribe(data => {
      console.log(data.avatarUrl);
      this.username = data.username;
      this.email = data.email;
      this.imgSrc = data.avatarUrl;
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.selectedImage !== null){
      const filePath = `attachment/$(this.selectedImage.name.split('.').slice(0, -1).join('.'))_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const $this = this;

      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( url => {
            this.imgSrc = url;
            const updateUser: GUser = {
              avatarUrl: url
            };
            $this.userService.updateUserAvatar(updateUser).subscribe(data => {
              console.log('update ava ok');
            });
          });
        })
      ).subscribe();
    }
  }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit();
    } else {
      this.imgSrc = 'https://civilcode.ge/images/2/24/Blank-avatar.png';
      this.selectedImage = null;
    }
  }

  openSnackBar(): void {
    this.snackBar.open('Login Successful! Welcome to GOMITO!', 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-class']
    });
  }
}
