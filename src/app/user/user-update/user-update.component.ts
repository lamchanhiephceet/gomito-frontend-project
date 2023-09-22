import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router} from '@angular/router';
import {GUser} from '../GUser';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
id: number;
user: GUser;
selectedImage: any = null;
imgSrc: string;
  constructor(private  userService: UserService,
              private router: Router,
              private storage: AngularFireStorage,
              ) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.user = await  this.userService.getUserInfo().toPromise();
  }
// tslint:disable-next-line:typedef
updateUser(){
    this.userService.updateUserAvatar(this.user).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
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
}
