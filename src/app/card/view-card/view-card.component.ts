import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';
import {GUser} from '../../user/GUser';
import {CardService} from '../card.service';
import {MatDialog} from '@angular/material/dialog';
import {AddAttachmentComponent} from '../../attachment/add-attachment/add-attachment.component';
import {AttachmentService} from '../../attachment/service/attachment.service';
import {Attachment} from '../../attachment';
import {CommentService} from '../../comment/comment.service';
import {Comment} from '../../comment';
import {Glabel} from '../../glabel';
import {throwError} from 'rxjs';
import {WebSocketService} from '../../notification/web-socket-service';
import {LabelService} from '../../label/label.service';


@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {
  members: GUser[];
  cardId: number;
  attachments: Attachment[];
  comments: Comment[];
  newComment: string;
  guser: GUser;

  labels: Glabel[];
  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              private cardService: CardService,
              private attachmentService: AttachmentService,
              private create: MatDialog,
              private commentService: CommentService,
              private webSocketService: WebSocketService,
              private labelService: LabelService,
              @Inject(MAT_DIALOG_DATA) public data: {
                card: GCard,
                labels: Glabel[],
                members: GUser[],
                content: Comment[],
                boardName: string
              }) {
  }

  ngOnInit(): void {
    this.newComment = '';
    this.cardId = this.data.card.cardId;
    const $this = this;
    this.getAllAttachments(this.cardId);
    this.getAllComments(this.cardId);
    this.getAllLabels(this.cardId);
    this.cardService.getMembersOfCard(this.cardId).subscribe(result => {
      $this.members = result;
    }, err => {
      throwError(err);
    });
  }

  private getAllComments(cardId: number): void {
    this.commentService.getCommentByCardId(cardId).subscribe(result => {
      console.log(result);
      this.comments = result;
    }, err => {
      console.log(err);
      throwError(err);
    });
  }
  private getAllLabels(cardId: number): void {
    this.labelService.getAllLabels(cardId).subscribe(result => {
      console.log(result);
      this.labels = result;
    }, err => {
      console.log(err);
      throwError(err);
    });
  }
  private getAllAttachments(cardId: number): void {
    this.attachmentService.getAttachment(cardId).subscribe(result => {
      console.log('check result');
      this.attachments = result;
      console.log(result);
    }, err => {
      throwError(err);
    });
  }

  addMemberToCard(member: GUser): void {
    const mem: GUser = {
      userId: member.userId
    };
    const $this = this;
    this.cardService.addMemberToCard(mem, this.cardId).subscribe(result => {
      console.log('OK');
    }, err => {
      console.log(err);
      if (err.status === 200) {
        $this.members.push(member);
        $this.data.card.members = $this.members;
        if (!(member.username === $this.webSocketService.fromUser)) {
          // thông báo cho thành viên được thêm
          const msg = ' add you to card ' + $this.data.card.cardName + ' at board ' + $this.data.boardName;
          $this.webSocketService.$sendOne($this.data.card.cardId, msg, member.username);
        }
      }
      throwError(err);
    });
  }

  // tslint:disable-next-line:typedef
  addAttachment() {
    const addAttachment = this.create.open(AddAttachmentComponent, {
      data: {
        cardId: this.cardId
      },
      height: '453px',
      width: '305px'
    });
    addAttachment.afterClosed().subscribe(result => {
      console.log('close box check');
      console.log(result);
      this.getAllAttachments(this.cardId);
    });
  }

  addLabelToCard(label: Glabel): void {
    // @ts-ignore
    const updateCard: GCard = {
      cardId: this.data.card.cardId
    };
    const $this = this;
    this.cardService.addLabelToCard(label.labelId, updateCard).subscribe(data => {
    }, err => {
      if (err.status === 200) {
        $this.data.card.labels.push(label);
        console.log('Đã xong việc thêm label');
      }
      console.log(err);
    });
  }
  createComment(cont): void {
    const createContend: Comment = {
      content: cont,
      cardId: this.cardId,
    };
    console.log(createContend);
    this.newComment = '';
    this.commentService.createComment(createContend).subscribe(result => {
      console.log(result);
      this.comments.push(result);

      // thông báo cho thành viên trong nhóm
      const msg = ' was commented on ' + this.data.card.cardName + ' at board ' + this.data.boardName;
      this.webSocketService.$sendAll(this.data.card.cardId, msg);
    }, err => {
      console.log(err);
      throwError(err);
    });

  }
}
