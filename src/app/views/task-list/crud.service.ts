import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/delay';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class CrudService {
  private uri = 'http://127.0.0.1:8080/task';

  constructor(private httpService: HttpService) { }

  //******* Implement your APIs ********
  getItems(): Observable<any> {
    return this.httpService.get(this.uri);
  }
  getItemsSortedByRank(): Observable<any> {
    return this.httpService.get(this.uri + '/sort/rank')
  }
  addItem(item): Observable<any> {
    item.timeInput = new Date();
    item.corporationId = 1;
    return this.httpService.post(this.uri, item);
  }
  updateItem(id, item): Observable<any> {
    item.timeInput = new Date();
    item.corporationId = 1;
    item.taskId = id; 
    return this.httpService.put(this.uri, item);
  }
  removeItem(id) {
    return this.httpService.delete(this.uri, id);
  }
}
