import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class EventService {
  private updateSubject: Subject<any> = new Subject();
  private alertSubject: Subject<any> = new Subject();
  private resizeSubject: Subject<any> = new Subject();
  private timer: Observable<any> = Observable.timer(30 * 1000, 30 * 1000);
//   private source: sse.IEventSourceStatic;
  constructor() {
    _.bindAll(this, 'onMessage', 'onConnectTime', 'onOpen', 'onKeepAlive', 'onAlert');
    // this.addEventSource();
  }

//   addEventSource() {
//     // SSE source
//     this.source = new EventSource('/event/register');
//     this.source.addEventListener('message', this.onMessage, false);
//     this.source.addEventListener('connecttime', this.onConnectTime, false);
//     this.source.addEventListener('open', this.onOpen, false);
//     this.source.addEventListener('error', this.onError, false);
//     this.source.addEventListener('keepalive', this.onKeepAlive, false);
//     this.source.addEventListener('alert', this.onAlert, false);
//   }

//   close() {
//     this.source.close();
//     this.source = null;
//   }

  sendUpdateEvent(data?: any) {
    return this.updateSubject.next(data);
  }

  getUpdateObservable() {
    return this.updateSubject.asObservable();
  }

  sendResizeEvent() {
    return this.resizeSubject.next();
  }

  getResizeObservable() {
    return this.resizeSubject.asObservable();
  }

  sendAlert(data: any) {
    return this.alertSubject.next(data);
  }

  getAlertObservable() {
    return this.alertSubject.asObservable();
  }

  getTimerObservable() {
    return this.timer;
  }

  // When message pushed, set it to the data buffer
  onMessage(msg: any) {
    // update subject type need to be defined more
    const data = msg.data ? JSON.parse(msg.data) : {};
    if (data.id === 'download') {
      this.updateSubject.next({type: 'table'});
      this.alertSubject.next({
        type: 'success',
        msg: 'Download completed'
      });
    } else if (data.id === 'clone') {
      this.updateSubject.next({type: 'table'});
      this.alertSubject.next({
        type: 'success',
        msg: 'Clone completed'
      });
    } else {
      this.updateSubject.next({type: 'table'});
    }
  }

  onConnectTime(event: any) {
    console.info('Connection was last established at: ' + event.data);
  }

  onKeepAlive(event: any) {
    console.info('keep alive');
  }

  onOpen(event: any) {
    console.info( 'Connection open!');
  }

//   onError(event: any) {
//     if (event.target.readyState === EventSource.CLOSED) {
//       this.source.close();
//       console.error('Connection closed!');
//     } else if (event.target.readyState === EventSource.CONNECTING) {
//       console.error('Connection closed! Attempting to reconnect!');
//     } else {
//       console.error('Connection closed. Unknown error!');
//     }
//   }

  onAlert(msg: any) {
    // need further modification, see onMessage
    this.updateSubject.next({
      type: 'alert',
      msg: msg
    });
  }
}