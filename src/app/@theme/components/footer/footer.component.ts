import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Đường dây nóng: <b><a href="https://akveo.page.link/8V2f" target="_blank">0909900009</a></b>
    </span>
    <div class="socials">
      <!-- <a href="#" target="_blank" class="ion ion-social-github"></a> -->
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
