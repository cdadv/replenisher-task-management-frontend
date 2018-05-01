import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';
import { SecuredHttpService } from '../../shared/services/http.service';

@Injectable()
export class CrudService {
  private uri = '/task/template';

  constructor(private httpService: SecuredHttpService) { }

  //******* Implement your APIs ********
  getItems(): Observable<any> {
    return this.httpService.get(this.uri);
  }

  addItem(item): Observable<any> {
    item.timeInput = new Date();
    item.corporationId = 1;
    return this.httpService.post(this.uri, item);
  }
  updateItem(id, item): Observable<any> {
    item.corporationId = 1;
    item.taskTemplateId = id; 
    return this.httpService.put(this.uri, item);
  }
  removeItem(id) {
    return this.httpService.delete(this.uri, id, 'taskTemplateId');
  }
}
