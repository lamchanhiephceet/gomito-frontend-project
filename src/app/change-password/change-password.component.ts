import { Component, OnInit } from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {ChangePasswordRequest} from './change-password-request';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordRequest: ChangePasswordRequest = {
    oldPassword: '',
    newPassword: ''
  };
  message: string;
  textColor: string;

  constructor(private authService: AuthService) { }
  hide = true;


  ngOnInit(): void {
  }

  changePassword(): void {
    this.authService.changePassword(this.changePasswordRequest).subscribe(data => {
      this.message = 'Change password successful';
    }, err => {
      console.log(err);
      if (err.status == 304 || err.status == 200) {
        this.textColor = 'blue';
        this.message = 'Change password successful';
      } else {
        this.textColor = 'red';
        this.message = 'Maybe you type wrong password';
      }
      throwError(err);
    });
  }
}
