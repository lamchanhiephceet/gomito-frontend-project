import {Component, Inject, Input, OnInit} from '@angular/core';
import {CommentService} from '../comment.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Comment} from '../../comment';
import {DeleteCommentComponent} from '../delete-comment/delete-comment.component';
import {EditCommentComponent} from '../edit-comment/edit-comment.component';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {
  @Input() items: Comment[];
  comments: Comment[];

  constructor(private commentService: CommentService,
              private create: MatDialog) { }

  ngOnInit(): void {
    console.log('Kiểm tra items: ' + this.items);
  }

  // tslint:disable-next-line:typedef
  // openEditComment(id: number, contends: string) {
  //   const updateComment: Comment = {
  //     commentId: id,
  //     content: contends
  //   };
  //   const editComment = this.create.open(EditCommentComponent, {
  //     data: updateComment,
  //     width: '400px'
  //   });
  //
  //   editComment.afterClosed().subscribe(result => {
  //     this.commentService.updateComment(result.id, result.contend).subscribe(data => {
  //       for (const comment of this.comments){
  //         if (comment.commentId === id){
  //           comment.content = data.content;
  //         }
  //       }
  //     }, error => {
  //       throwError(error);
  //     });
  //   });
  //
  // }

  // tslint:disable-next-line:typedef
  // openDeleteComment(id: number) {
  //
  //   const deleteComment: Comment = {
  //     commentId: id
  //   };
  //   const deleteCom = this.create.open(DeleteCommentComponent, {
  //     data: deleteComment,
  //     width: '250px'
  //   });
  //   deleteCom.afterClosed().subscribe(result => {
  //     console.log(result);
  //     this.commentService.deleteComment(result).subscribe(data => {});
  //   });
  // }
}
