import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav, MatDialog } from '@angular/material';
import { AppInboxService } from './app-inbox.service';
import { MailComposeComponent } from './mail-compose.component';
import { HttpService } from '../../shared/services/http.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-inbox',
  templateUrl: './app-inbox.component.html',
  styleUrls: ['./app-inbox.component.css'],
  providers: [AppInboxService]
})
export class AppInboxComponent implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  selectToggleFlag = false;
  @ViewChild(MatSidenav) private sideNave: MatSidenav;
  messages: Array<any>;

  constructor(private router: Router,
    private media: ObservableMedia,
    public composeDialog: MatDialog,
    private inboxService: AppInboxService,
    private httpservice: HttpService
  ) {
    _.bindAll(this, 'update', 'onData');
  }

  ngOnInit() {
    this.inboxSideNavInit();
    this.messages = this.inboxService.messages;
    this.update();
  }

  update() {
    this.httpservice.get('http://127.0.0.1:8080/task', 'da1cb0a0-dcc0-43ce-8042-109ac22d78ba').subscribe(this.onData);
  }

  onData(data: any) {
    console.log(data);
    //this.messages = data.result;
  }

  ngOnDestroy() {
    if(this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe();
    }
  }
  openComposeDialog() {
    let dialogRef = this.composeDialog.open(MailComposeComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }
  selectToggleAll() {
    this.selectToggleFlag = !this.selectToggleFlag;
    this.messages.forEach((msg) => { msg.selected = this.selectToggleFlag });
  }
  
  stopProp(e) {
    e.stopPropagation()
  }

  updateSidenav() {
    var self = this;
    setTimeout(() => {
      self.isSidenavOpen = !self.isMobile;
      self.sideNave.mode = self.isMobile ? 'over' : 'side';
    })
  }
  inboxSideNavInit() {
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.updateSidenav();
    this.screenSizeWatcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
      this.updateSidenav();
    });
  }
}
