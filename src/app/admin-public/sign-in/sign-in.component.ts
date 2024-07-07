import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../helpers/validation-notify";
import { SignInRequest } from "../../models/requests/account/sign-in-request";
import { AccountService } from "../../services/account/account.service";
import { Toast } from "../../helpers/toast";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: [
    "./sign-in.component.scss",
    "../../../assets/assets-login/css/main.css",
    "../../../assets/assets-login/css/util.css",
    "../../../assets/assets-login/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
    "../../../assets/assets-login/vendor/animate/animate.css",
    "../../../assets/assets-login/vendor/bootstrap/css/bootstrap.min.css",
    "../../../assets/assets-login/vendor/css-hamburgers/hamburgers.min.css",
    "../../../assets/assets-login/vendor/select2/select2.min.css",
  ],
})
export class SignInComponent {
  // Variables
  signInRequest: SignInRequest = new SignInRequest();
  loading = false;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("signInForm") signInForm: NgForm;
  validationNotify: ValidationNotify;

  // Constructor
  constructor(
    private accountService: AccountService,
    private toast: Toast,
    private authService: AuthService,
    private router: Router
  ) {}

  // InitData
  ngOnInit() {
    this.validationMessages = this.signInRequest.validationMessages;
  }

  // After View Init
  ngAfterViewInit() {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.signInForm
    );
  }

  // SignIn
  signIn() {
    this.loading = true;

    this.accountService.signIn(this.signInRequest).subscribe((res) => {
      if (res.code === 200) {
        this.authService.setToken(res.obj.token);
        this.authService.setRoles(res.obj.roles);
        this.authService.setName(res.obj.name);
        this.toast.successToast("Thành Công", res.message);

        setTimeout(() => {
          this.loading = false;
          window.location.href = "/admin/dashboard";
        }, 1000);
      } else if (res.code === 401) {
        this.toast.warningToast("Thất bại", res.message);
      } else if (res.code === 403) {
        this.toast.dangerToast("Thất bại", res.message);
      }
    });
  }
}
