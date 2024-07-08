import { Component } from "@angular/core";

import { AdminMenu } from "./admin-menu";
import { NbMenuItem } from "@nebular/theme";
import { Subscription } from "rxjs";
import { LoadingService } from "../helpers/loading-service";

@Component({
  selector: "ngx-admin",
  styleUrls: ["./admin.component.scss"],
  template: `
    <div [nbSpinner]="loading" nbSpinnerSize="giant" nbSpinnerStatus="primary">
      <ngx-one-column-layout>
        <nb-menu [items]="menu"></nb-menu>
        <router-outlet></router-outlet>
      </ngx-one-column-layout>
    </div>
  `,
})
export class AdminComponent {
  loading = false;
  private subscription: Subscription;
  menu: NbMenuItem[] = [];

  constructor(private adminMenu: AdminMenu, private loadingService: LoadingService) {
    this.menu = this.adminMenu.menuItems;
  }

  ngOnInit() {
    this.subscription = this.loadingService.loading$.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
