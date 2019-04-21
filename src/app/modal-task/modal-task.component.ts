import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RestApiService } from "../shared/rest-api.service";
import {formatDate} from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface Tags {
  name: string;
  color: string;
}

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})

export class ModalTaskComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({name: value.trim(), color:this.getRandomColor()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  constructor(public dialogRef: MatDialogRef<ModalTaskComponent>,@Inject(MAT_DIALOG_DATA) public data:any, public restApi: RestApiService) { }
  @Input() taskDetail = {id_board: 0, title: '', description: '', complete: false, priorityName: 'trivial',priorityValue : 4, createdAt: '',status: ''}

  id_board:number
  id_task:number
  isNew:boolean
  type:string
  Board: any = [];
  TagsList: any = [];
  tmp: any = [];
  imagePriority : string;

  ngOnInit() {
    this.taskDetail.id_board = this.id_board;
    this.loadBoards();
    this.imagePriority = "trivial";

    if(!this.isNew){
      this.restApi.getTask(this.id_task).subscribe((data: {}) => {
        this.tmp = data;
        this.taskDetail.title = data['title'];
        this.taskDetail.description = data['description'];
        this.taskDetail.complete = data['complete'];
        this.taskDetail.priorityName = data['priorityName'] + "-" + data['priorityValue'];
        this.taskDetail.priorityValue = data['priorityValue'];
        this.taskDetail.createdAt = data['createdAt'];
        this.taskDetail.status = data['status'];
        this.imagePriority = data['priorityName'];
        this.restApi.getTagList(this.id_task).subscribe((dataTag: {}) => { 
          this.TagsList = dataTag; 
          for(let some of this.TagsList){
            this.tags.push({name: some.name, color:some.color});
          }
        });       

      });

      
    }
  }



  save(){
    this.taskDetail.createdAt = (formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en')).toString();
    this.taskDetail.status = this.type;
    this.taskDetail.priorityValue = Number(this.taskDetail.priorityName.split("-")[1]);
    this.taskDetail.priorityName = this.taskDetail.priorityName.split("-")[0];

    if(this.isNew) {
      let id_task :number;
      this.restApi.createTask(this.taskDetail).subscribe((data: {}) => {
          id_task = data['id'];

          for(let tag of this.tags){
            var tagDetail = {id_tarea: 0, color: '', name: ''};
            tagDetail.id_tarea =  data['id'];
            tagDetail.color = tag['color'];
            tagDetail.name = tag['name'];
            console.log(tagDetail);
  
            this.restApi.createTag(tagDetail).subscribe((data: {}) => {
              console.log(data['name'] + "insert");
            });
          } 
        });
    }else{
      if(window.confirm('Are you sure, you want to update?')){
        this.restApi.updateTask(this.id_task, this.taskDetail).subscribe(data => {
          this.restApi.getTagList(this.id_task).subscribe((dataTag: {}) => { 
            this.TagsList = dataTag; 
            for(let some of this.TagsList){
              this.restApi.deleteTag(some.id).subscribe((datDrop: {}) => {
                console.log(datDrop['name'] + "drop");
              });
            }
          });

          for(let tag of this.tags){
            var tagDetail = {id_tarea: 0, color: '', name: ''};
            tagDetail.id_tarea =  data['id'];
            tagDetail.color = tag['color'];
            tagDetail.name = tag['name'];
            console.log(tagDetail);
  
            this.restApi.createTag(tagDetail).subscribe((data: {}) => {
              console.log(data['name'] + "insert");
            });
          }           

          });
        }
    }

    this.dialogRef.close();

  }

  delete(){
    if(window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteTask(this.id_task).subscribe((datDrop: {}) => {
        console.log(datDrop['name'] + "drop");
        
      });      
    }
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

  loadBoards() {
    return this.restApi.getBoards().subscribe((data: {}) => {
      this.Board = data;
    })
  }  

  getRandomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
    console.log(hex);
  }

}
