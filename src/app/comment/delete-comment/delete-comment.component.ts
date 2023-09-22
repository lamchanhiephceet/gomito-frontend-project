import {Component, Inject, OnInit} from '@angular/core';
import {CommentService} from '../comment.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Attachment} from '../../models/attachment';
import {Comment} from '../../models/comment';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnInit {

  constructor(private commentService: CommentService,
              @Inject(MAT_DIALOG_DATA) public data: Comment) { }

  ngOnInit(): void {
  }

}
