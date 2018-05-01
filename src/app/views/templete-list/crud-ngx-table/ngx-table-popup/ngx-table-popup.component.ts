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
      assignedStaffIdSet: [item.assignees || '', Validators.required],
      managerIdSet: [item.reporters || '', Validators.required],
      estimatedDuration: [item.estimatedDuration || '', Validators.required],
      taskPriorityString: [item.taskPriorityString || ''],
      feedback: [item.feedback || ''],
      note: [item.note || ''],
      isRecurring: [item.isRecurring || ''],
      recurringPeriodCronExpression: [item.recurringPeriodCronExpression || '']
    })
  }

  parseInput() {
    _.forEach(this.itemForm.value, (value, key) => {
      if (key == 'managerIdSet' || key == 'assignedStaffIdSet') {
        this.itemForm.value[key] = this.itemForm.value[key].split(' ')
        .map((item) => {
          return parseInt(item, 10);
        });
      } 
      if (key == 'estimatedDuration') {
        this.itemForm.value[key] = this.itemForm.value[key] * 1000 * 60 * 60 * 24;
      }
    });
  }

  submit() {
    this.parseInput();
    this.dialogRef.close(this.itemForm.value)
  }
}
