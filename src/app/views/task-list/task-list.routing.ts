import { Routes } from '@angular/router';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';

export const TaskListRoutes: Routes = [
  {
    path: '',
    component: CrudNgxTableComponent,
  }
];