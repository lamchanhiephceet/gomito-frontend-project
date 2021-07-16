import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GBoard} from "../../../gboard";
import {LocalStorageService} from "ngx-webstorage";
import {BoardService} from '../../../board/board.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private userId: number;
  gboards: GBoard[];
  constructor(private listBoardService: BoardService,
              private router: Router,
              private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.getBoard();
  }

  private getBoard(){
    // @ts-ignore
    this.listBoardService.getBoardList().subscribe(data => {
      this.gboards = data;
    });
  }

  navigateToList(boardId: number){
    this.router.navigateByUrl("/board/" + boardId);
  }
}
