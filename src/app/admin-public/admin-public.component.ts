import { Component } from "@angular/core";

@Component({
  selector: "ngx-admin-public",
  styleUrls: ["./admin-public.component.scss"],
  template: `
    <ngx-zero-column-layout>
      <router-outlet></router-outlet>
    </ngx-zero-column-layout>
  `,
})
export class AdminPublicComponent {}
