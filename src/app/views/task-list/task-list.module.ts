import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSelectModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppConfirmModule } from '../../shared/services/app-confirm/app-confirm.module';
import { AppLoaderModule } from '../../shared/services/app-loader/app-loader.module';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';

import { TaskListRoutes } from './task-list.routing';
import { CrudService } from './crud.service';
import { NgxTablePopupComponent } from './crud-ngx-table/ngx-table-popup/ngx-table-popup.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatNativeDateModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    AppConfirmModule,
    AppLoaderModule,
    RouterModule.forChild(TaskListRoutes)
  ],
  declarations: [CrudNgxTableComponent, NgxTablePopupComponent],
  providers: [CrudService],
  entryComponents: [NgxTablePopupComponent]
})
export class TaskListModule { }
