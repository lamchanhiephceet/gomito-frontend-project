import {Component, Inject, OnInit} from '@angular/core';
import {CommentService} from '../comment.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Comment} from '../../comment';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  constructor(private commentService: CommentService,
              @Inject(MAT_DIALOG_DATA) public data: Comment) { }

  ngOnInit(): void {
  }

}
