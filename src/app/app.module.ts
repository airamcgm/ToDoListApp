import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './task/task.component';
import { MatToolbarModule, 
         MatTooltipModule, 
         MatButtonModule, 
         MatSidenavModule, 
         MatIconModule, 
         MatListModule,
         MatCardModule,
         MatDialogModule,
         MatSelectModule,
         MatInputModule,
         MatCheckboxModule,
         MatChipsModule,
        } from '@angular/material';
import { ModalTaskComponent } from './modal-task/modal-task.component';
import { ModalAddBoardComponent } from './modal-add-board/modal-add-board.component';

import { FormsModule } from '@angular/forms';
// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DashboardComponent,
    TaskComponent,
    ModalTaskComponent,
    ModalAddBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    DragDropModule,
    MatInputModule,
    MatChipsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    ModalTaskComponent,
    ModalAddBoardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
