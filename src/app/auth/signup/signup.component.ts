import { Component, OnInit } from '@angular/core';
import {SignupRequest} from './signup-request';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequest: SignupRequest;
  signupForm: FormGroup;
  message: string;
  //Vừa thêm để chuyển hướng khi gửi mail thành công
  private token: string;

  constructor(private authService: AuthService,
              private router: Router,
              private localStorage: LocalStorageService) {
    this.signupRequest = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.localStorage.clear();
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });

  }

  signup(): void{
    this.signupRequest.username = this.signupForm.get('username').value;
    this.signupRequest.email = this.signupForm.get('email').value;
    this.signupRequest.password = this.signupForm.get('password').value;
    this.authService.signup(this.signupRequest).subscribe((data) => {
      this.router.navigate(['/login'], {queryParams: {isRegistered: 'true'}});
      console.log(data);
    }, err => {
      if (err.status === 400) {
        this.message = 'User is exist';
      }
      throwError(err);
    });
  }
}
