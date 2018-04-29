import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs/Subscription';
import * as _ from "lodash";
import { EventService } from '../../../shared/services/event.service';


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
    private eventService: EventService
  ) {
    // _.bindAll(this, 'getItems'); 
  }

  ngOnInit() {
    this.getItemSub = this.crudService.getItems()
    .subscribe(data => {
      this.items = this.onData(data.result);    
      console.log(this.items);
    });
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  // getItems() {
  //   return this.getItemSub = this.crudService.getItems()
  //     .subscribe(data => {
  //       this.items = this.onData(data.result);    
  //       console.log(this.items);
  //     });
  // }

  onData(result: any): Array<any> {
    let taskList = [];
    _.forEach(result, (task) => {
      let taskProcessed: {[key: string]: any} = {};
      _.forEach(task, (value, key) => {
       // console.log(task);
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
    console.log(taskList);
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
    let title = isNew ? 'Add new member' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(res);
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addItem(res)
            .subscribe(data => {
              console.log(data);
              //this.items = data;
              this.loader.close();
              this.snack.open('Member Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member deleted!', 'OK', { duration: 4000 })
            })
        }
      })
  }
}