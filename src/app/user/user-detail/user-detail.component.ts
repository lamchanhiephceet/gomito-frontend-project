import { Component, OnInit } from '@angular/core';
import {GUser} from '../GUser';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: number;
  user: GUser;
  selectedImage: any = null;
  imgSrc: string;
  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.user = await this.userService.getUserInfo().toPromise();
    // this.imgSrc = this.user.avatarUrl;
    this.userService.getUserInfo().subscribe(data => {
      console.log(data);
      // console.log(data.avatarUrl);
      // this.username = data.username;
      // this.email = data.email;
      this.imgSrc = data.avatarUrl;
    });
  }

  // submit() {
  //   if (this.selectedImage !== null){
  //     const filePath = `attachment/$(this.selectedImage.name.split('.').slice(0, -1).join('.'))_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     const $this = this;
  //
  //     this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe( url => {
  //           this.imgSrc = url;
  //           const updateUser: GUser = {
  //             avatarUrl: url
  //           };
  //           $this.userService.updateUserAvatar(updateUser).subscribe(data => {
  //             console.log('update ava ok');
  //           });
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }

  // tslint:disable-next-line:typedef
  // showPreview(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => this.imgSrc = e.target.result;
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.selectedImage = event.target.files[0];
  //     // this.submit();
  //   } else {
  //     this.imgSrc = 'https://civilcode.ge/images/2/24/Blank-avatar.png';
  //     this.selectedImage = null;
  //   }
  // }

}
