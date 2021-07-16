import {Component, Inject, OnInit} from '@angular/core';
import {ListModel} from '../../list-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-list-update',
  templateUrl: './list-update.component.html',
  styleUrls: ['./list-update.component.css']
})
export class ListUpdateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ListUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ListModel) {
  }

  ngOnInit(): void {
  }
}
