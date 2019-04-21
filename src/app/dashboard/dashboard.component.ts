import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { ModalTaskComponent } from 'src/app/modal-task/modal-task.component';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, public restApi: RestApiService) { }

  @Input() id_board: number; 

  title = 'Drag and Drop';

  todos: any = [];
  completed: any = [];
  doings: any = [];

  onDrop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, 
        event.previousIndex,
        event.currentIndex);
    } else{
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }

    this.cleanArray();
    this.validList();
    this.evaluateChanges();
  }

 evaluateChanges(): void {
    this.updateTaskList(this.todos,"ToDo");
    this.updateTaskList(this.doings,"Doing");
    this.updateTaskList(this.completed,"Done");
  }

  updateTaskList(list,type ){
    for (let entry of list) {
      if(Number(entry.id) !== 0){
        if(entry.status !== type){
            entry.status = type;
            var auxId = entry.id;
            this.restApi.updateTask(auxId, entry).subscribe(data => {});
            
        }
      }
    }  
  }

  validList(): void{
    if(this.todos.length === 0){
      this.todos = [{id: 0,title: '',descripcion: ''}];
    }

    if(this.doings.length === 0){
      this.doings = [{id: 0,title: '',descripcion: ''}];
    }

    if(this.completed.length === 0){
      this.completed = [{id: 0,title: '',descripcion: ''}];
    }  

  }

  cleanArray(): void {
    this.todos = this.removeAux(this.todos);
    this.doings = this.removeAux(this.doings);
    this.completed = this.removeAux(this.completed);
  }

  removeAux(list):any {
    var array_name = [];
    for (let entry of list) {
      if(Number(entry.id) !== 0){
        array_name.push(entry);
      }
    }
    return array_name;
  }

  openDialog(id_task, isNew, type): void {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
     
    });

    dialogRef.componentInstance.id_board = this.id_board;
    dialogRef.componentInstance.id_task = id_task;
    dialogRef.componentInstance.isNew = isNew;
    dialogRef.componentInstance.type = type;

    dialogRef.afterClosed().subscribe(async result => {
      await this.delay(500);
      this.initTasks();
    });
  }

  private delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit() {
    FlexLayoutModule;
    this.initTasks();
  }

  initTasks(): void{
    this.loadTasksTodo();
    this.loadTasksDoing();
    this.loadTasksDone();
    this.validList();
  }

  loadTasksTodo() {
    return this.restApi.getTaskList(this.id_board,"ToDo").subscribe((data: {}) => {
      this.todos = data;
    })
  }  

  loadTasksDoing() {
    return this.restApi.getTaskList(this.id_board,"Doing").subscribe((data: {}) => {
      this.doings = data;
    })
  }  
  
  loadTasksDone() {
    return this.restApi.getTaskList(this.id_board,"Done").subscribe((data: {}) => {
      this.completed = data;
    })
  } 

  ngOnChanges(changes: SimpleChanges) {
    FlexLayoutModule;
    this.initTasks();
  }

  
}
