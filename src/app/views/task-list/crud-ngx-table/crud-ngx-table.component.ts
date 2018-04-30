import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs/Subscription';
import * as _ from "lodash";
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-crud-ngx-table',
  templateUrl: './crud-ngx-table.component.html'
})
export class CrudNgxTableComponent implements OnInit, OnDestroy {
  public items = [];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
  ) {
  }

  ngOnInit() {
    this.getItemSub = this.crudService.getItemsSortedByRank()
    .subscribe(data => {
      this.items = this.onData(data.result);    
    }, err => {
      this.onError(err);
    });
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

  onData(result: any): Array<any> {
    let taskList = [];
    _.forEach(result, (task) => {
      let taskProcessed: {[key: string]: any} = {};
      _.forEach(task, (value, key) => {
        if (key == 'managerUserDTOSet') {
          taskProcessed.reporter = this.generateNames(task[key]);
        } else if (key == 'assignedStaffUserDTOSet') {
          taskProcessed.assignee = this.generateNames(task[key]);
        } else {
          taskProcessed[key] = task[key];
        }
      });
      taskList.push(taskProcessed);
    });
    return taskList;
  }

  generateNames(userSet: Array<any>): string {
    let nameList = '';
    _.forEach(userSet, (user) => {
      nameList = nameList + ' ' + user.fullName;
    });
    return nameList;
  }

  openPopUp(data: any = {}, isNew?) {
    console.log(data);
    let title = isNew ? 'Add new Task' : 'Update Task';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addItem(res)
            .subscribe(data => {
              this.getItemSub = this.crudService.getItemsSortedByRank()
              .subscribe(newdata => {
                this.items = this.onData(newdata.result);    
              }, err => {
                this.onError(err);
              });

              this.loader.close();
              this.snack.open('Task Added!', 'OK', { duration: 4000 })
            }, err => {
              this.onError(err);
            })
        } else {
          this.crudService.updateItem(data.taskId, res)
            .subscribe(data => {
              this.getItemSub = this.crudService.getItemsSortedByRank()
              .subscribe(newdata => {
                this.items = this.onData(newdata.result);    
              }, err => {
                this.onError(err);
              });
              this.loader.close();
              this.snack.open('Task Updated!', 'OK', { duration: 4000 })
            }, err => {
              this.onError(err);
            })
        }
      })
  }

  onError(data: HttpErrorResponse) {
    this.loader.close();
    this.snack.open(data.error.message, 'ERROR', { duration: 7000 })
  }

  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.removeItem(row.taskId)
            .subscribe(data => {
              this.getItemSub = this.crudService.getItemsSortedByRank()
              .subscribe(newdata => {
                this.items = this.onData(newdata.result);    
              }, err => {
                this.onError(err);
              });
              this.loader.close();
              this.snack.open('Task deleted!', 'OK', { duration: 4000 })
            }, err => {
              this.onError(err);
            })
        }
      })
  }
}