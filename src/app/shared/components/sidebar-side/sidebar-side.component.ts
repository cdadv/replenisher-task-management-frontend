import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from '../../services/theme.service';
import { Subscription } from "rxjs/Subscription";
import PerfectScrollbar from 'perfect-scrollbar';
import { SecuredHttpService } from '../../services/http.service';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  fullName: string;
  role: string
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private httpService: SecuredHttpService
  ) { }

  ngOnInit() {
    this.httpService.get('/user').subscribe(
      data => this.onData(data)
    );
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    // this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
    //   this.menuItems = menuItem;
    //   //Checks item list has any icon type.
    //   this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    // });
  }

  onData(data: any) {
    this.fullName = data.result.fullName;
    this.role = data.result.role;
    if (this.role == 'ROLE_USER_MANAGER' || this.role == 'ROLE_ADMIN') {
      this.menuItems = this.navService.advancedMenu;
    } 
    if (this.role == 'ROLE_USER_STAFF') {
      this.menuItems = this.navService.defaultMenu;
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.sidebarPS = new PerfectScrollbar('#scroll-area', {
        suppressScrollX: true
      })
    })
  }
  ngOnDestroy() {
    if(this.sidebarPS) {
      this.sidebarPS.destroy();
    }
    if(this.menuItemsSub) {
      this.menuItemsSub.unsubscribe()
    }
  }

}
