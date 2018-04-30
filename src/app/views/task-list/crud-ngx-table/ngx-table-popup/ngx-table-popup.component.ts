import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html'
})
export class NgxTablePopupComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      description: [item.description || ''],
      taskStatusString: [item.taskStatusString || '', Validators.required],
      timeEstimatedFinish: [item.timeEstimatedFinish || '', Validators.required],
      assignedStaffIdSet: [item.assignees || '', Validators.required],
      managerIdSet: [item.reporters || '', Validators.required],
      taskPriorityString: [item.taskPriorityString || ''],
      feedback: [item.feedback || ''],
      note: [item.note || ''],
      isRecurring: [item.isRecurring || ''],
      recurringPeriodCronExpression: [item.recurringPeriodCronExpression || '']
    })
  }

  parseUsersId() {
    _.forEach(this.itemForm.value, (value, key) => {
      if (key == 'managerIdSet' || key == 'assignedStaffIdSet') {
        this.itemForm.value[key] = this.itemForm.value[key].split(' ')
        .map((item) => {
          return parseInt(item, 10);
        });
      }
    });
  }

  submit() {
    this.parseUsersId();
    this.dialogRef.close(this.itemForm.value)
  }
}
