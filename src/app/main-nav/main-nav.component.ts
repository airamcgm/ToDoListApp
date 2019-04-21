import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from "../shared/rest-api.service";
import { MatDialog } from '@angular/material';
import { ModalAddBoardComponent } from 'src/app/modal-add-board/modal-add-board.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  Board: any = [];
  board_select : number;
  nameBoard : string;
  
  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog, public restApi: RestApiService) {}

  ngOnInit() {
    this.restApi.getBoards().subscribe((data: {}) => {
      this.Board = data;
      this.board_select = this.Board[0]['id'];
      this.nameBoard = this.Board[0]['name'];
    })
    console.log("val" + this.Board);

  }  

 // Get boards list
 loadBoards() {
  this.restApi.getBoards().subscribe((data: {}) => {
    this.Board = data;
  })
}  

private delay(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
openDialog(): void {
  const dialogRef = this.dialog.open(ModalAddBoardComponent, {
   
  });

  dialogRef.afterClosed().subscribe(async result => {
    console.log('The dialog was closed');
    await this.delay(500);
    this.loadBoards();
   
  });
}

selectBoard(event, idBoardSelect, nameBoard): void {
  this.board_select  = idBoardSelect;
  this.nameBoard = nameBoard;
}

}
