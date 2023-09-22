import {Component, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {BoardService} from '../board/board.service';
import {ExcelReport} from '../models/excel-report';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {saveAs} from 'file-saver';
import {MatSort, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-excel-report',
  templateUrl: './excel-report.component.html',
  styleUrls: ['./excel-report.component.css']
})
export class ExcelReportComponent implements OnInit {
  boardId: number;
  constructor(private boardService: BoardService){ }
  isShowTbl = false;
  isShowNotFound = false;
  displayedColumns = ['STT', 'BoardName', 'ListName', 'CardName', 'FirstName', 'Email', 'AboutAccount'];
  dataSource: MatTableDataSource<ExcelReport> = new MatTableDataSource<ExcelReport>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.showExcel();
  }

  exportExcel(): void {
    const fileName = 'boards_detail.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  showExcel(): void {
    this.isShowNotFound = false;
    this.isShowTbl = true;
    this.boardService.getAllExcelData()
      .subscribe((response: any) => {
        // tslint:disable-next-line:triple-equals
        if (response.status === 200){
          this.dataSource.data = response.body as ExcelReport[];
          // console.log(this.dataSource.data);
          // console.log(response.body);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }else{
          console.log('error');
        }

        if (this.dataSource.data === null || this.dataSource.data.length === 0){
          this.isShowNotFound = true;
          this.isShowTbl = false;
        }
      });
  }

  downloadFile(): void{
    this.boardService
      .downLoadFile()
      .subscribe((response) => {
          // const url = URL.createObjectURL(response);
          //
          // const a = document.createElement('a');
          // a.href = url;
          // a.download = `boards_detail.xlsx`;
          // a.click();
          //
          // URL.revokeObjectURL(url);
          // a.remove();

          const contentDispositionHeader = response.headers.get('Content-Disposition');
          const fileNameFromHeader = contentDispositionHeader?.split('filename=')[1];
          console.log(fileNameFromHeader);
          const fileName = 'boards_detail.xlsx';
          const finalFileName = fileNameFromHeader || fileName ;

          const blob = response.body;
          saveAs(blob, finalFileName);
        },
        error => {
          console.error('Download failed:', error);
        });
  }

}
