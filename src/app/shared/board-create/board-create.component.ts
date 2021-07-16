import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {BoardService} from '../../board/board.service';
import {Router} from '@angular/router';
import {GBoard} from '../../gboard';

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css']
})
export class BoardCreateComponent implements OnInit {
  boardName: '';
  newBoard: GBoard;

  constructor(public dialogRef: MatDialogRef<BoardCreateComponent>,
              private boardService: BoardService,
              private router: Router) { }

  ngOnInit(): void {
    this.boardName = '';
    this.newBoard = new GBoard();
  }

  // tslint:disable-next-line:typedef
  createBoard() {
    this.newBoard.boardName = this.boardName;
    this.boardService.createBoard(this.newBoard).subscribe(data => {
      console.log(data);
      alert('Created');
      this.router.navigateByUrl('board/' + data.boardId);
    });
    this.dialogRef.close();
  }
}
