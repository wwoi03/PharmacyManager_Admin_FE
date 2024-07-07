import { Component } from '@angular/core';

import { AdminMenu } from './admin-menu';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-admin',
  styleUrls: ['./admin.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})

export class AdminComponent {
  menu: NbMenuItem[] = [];

  constructor(private adminMenu: AdminMenu) {
    this.menu = this.adminMenu.menuItems;
  }
}