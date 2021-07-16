import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Attachment} from '../../attachment';

@Component({
  selector: 'app-edit-attachment',
  templateUrl: './edit-attachment.component.html',
  styleUrls: ['./edit-attachment.component.css']
})
export class EditAttachmentComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<EditAttachmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Attachment) { }

  ngOnInit(): void {
  }

}
