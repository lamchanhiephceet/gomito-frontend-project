import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GCard} from '../../gCard';


@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GCard) {
  }

  ngOnInit(): void {
  }
}
