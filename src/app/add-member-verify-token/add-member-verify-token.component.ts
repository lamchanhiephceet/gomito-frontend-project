// @ts-ignore
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-add-member-verify-token',
  templateUrl: './add-member-verify-token.component.html',
  styleUrls: ['./add-member-verify-token.component.css']
})
export class AddMemberVerifyTokenComponent implements OnInit {
  private messageUsername: string;
  private token: string;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router, ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
    this.authService.addMemberVerifyToken(this.token).subscribe(data => {
    }, err => {
      if (err.status === 200) {
        this.messageUsername = 'Bạn đã được thêm thành viên của một bảng!';
        this.router.navigate(['login']);
      } else if (err.status === 404) {
        this.messageUsername = 'Xác nhân không thành công!';
        this.router.navigate(['login']);
      }
    });
  }
}
