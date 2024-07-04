import { Component } from '@angular/core';

@Component({
  selector: 'ngx-zero-column-layout',
  styleUrls: ['./zero-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-column style="margin: 0; padding: 0">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class ZeroColumnLayoutComponent {}
