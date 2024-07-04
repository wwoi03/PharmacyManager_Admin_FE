import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { SignInRequest } from "../../../models/requests/account/sign-in-request";
import { AccountService } from "../../../services/account/account.service";
import { Toast } from "../../../helpers/toast";

@Component({
  selector: "ngx-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent {
  // Variables
  signInRequest: SignInRequest = new SignInRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("signInForm") signInForm: NgForm;
  validationNotify: ValidationNotify;

  // Constructor
  constructor(
    private accountService: AccountService,
    private toast: Toast
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
    this.accountService.signIn(this.signInRequest).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành Công", res.message);
        } else if (res.code === 401) {
          this.toast.warningToast("Thất bại", res.message);
        } else if (res.code === 403) {
          this.toast.dangerToast("Thất bại", res.message);
        }
      },
    )
  }
}
