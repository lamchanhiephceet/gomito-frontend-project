import {Component, Input, OnInit} from '@angular/core';
import {AttachmentService} from '../service/attachment.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteAttachmentComponent} from '../delete-attachment/delete-attachment.component';
import {EditAttachmentComponent} from '../edit-attachment/edit-attachment.component';
import {Attachment} from '../../attachment';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.css']
})
export class ViewAttachmentComponent implements OnInit {
  @Input() items: Attachment[];
  @Input() cardId: number;

  constructor(private attachmentService: AttachmentService,
              private create: MatDialog) {
  }

  ngOnInit(): void {
    this.getAttachmentList();
  }

  // tslint:disable-next-line:typedef
  private getAttachmentList(){
      // @ts-ignore
    this.attachmentService.getAttachment(this.cardId).subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  // tslint:disable-next-line:typedef
  openDelete(id: number) {
      this.attachmentService.deleteAttachment(id).subscribe(data => {
        console.log(data);
        this.getAttachmentList();
      }, err => {
        console.log(err.status);
      }, () => {
        confirm('Delete Success');
      });
  }

  // tslint:disable-next-line:typedef
  openEdit(id: number, name: string) {
    // tslint:disable-next-line:one-variable-per-declaration
    const updateAttachment: Attachment = {
      attachmentId: id,
      attachmentName: name
    };
    const editAttachment = this.create.open(EditAttachmentComponent, {
      data: updateAttachment,
      width: '250px'
    });
    editAttachment.afterClosed().subscribe(result => {
      this.attachmentService.editAttachment(result).subscribe(data => {
        console.log(data);
        alert('Update success!!!');
        for (const attach of this.items) {
          if (attach.attachmentId === id) {
            attach.attachmentName = data.attachmentName;
          }
        }
      }, error => {
        throwError(error);
      });
    });
  }

  // tslint:disable-next-line:typedef
//   openImage(img: string)
//
}
