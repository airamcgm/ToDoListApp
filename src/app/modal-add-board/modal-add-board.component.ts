import { Component, OnInit, Inject, Input  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RestApiService } from "../shared/rest-api.service";
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-modal-add-board',
  templateUrl: './modal-add-board.component.html',
  styleUrls: ['./modal-add-board.component.css']
})
export class ModalAddBoardComponent implements OnInit {
  @Input() boardDetails = {name: '', createdAt: ''}

  constructor(public dialogRef: MatDialogRef<ModalAddBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public restApi: RestApiService,public router: Router) { 
    }

  
  ngOnInit() {

  }
  save(){
    //
    this.boardDetails.createdAt = (formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en')).toString();
    this.restApi.createBoard(this.boardDetails).subscribe((data: {}) => {
      //this.router.navigate(['/board-list'])
      //this.router.navigateByUrl('/board-list', {skipLocationChange: true}).then(()=>this.router.navigate(["board-list"])); 
    })
    this.dialogRef.close();
  }
  cancel(){
    this.dialogRef.close();
  }
}
