import {Component, Inject, OnInit} from '@angular/core';
import {ListModel} from '../../list-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-creat-list',
  templateUrl: './creat-list.component.html',
  styleUrls: ['./creat-list.component.css']
})
export class CreatListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreatListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ListModel) {
  }

  ngOnInit(): void {
  }

}
