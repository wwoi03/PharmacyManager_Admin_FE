import { Component } from "@angular/core";
import { StaffService } from "../../../services/staff/staff.service";
import { Toast } from "../../../helpers/toast";
import { NbDialogRef } from "@nebular/theme";
import { DetailsStaffResponse } from "../../../models/responses/staff/details-staff.response";
import { AccountService } from "../../../services/account/account.service";

@Component({
  selector: "ngx-revoke-token",
  templateUrl: "./revoke-token.component.html",
  styleUrls: ["./revoke-token.component.scss"],
})
export class RevokeTokenComponent {
  detailsStaffResponse: DetailsStaffResponse; 

  constructor(
    protected ref: NbDialogRef<RevokeTokenComponent>,
    private accountService: AccountService,
    private toast: Toast,
  ) {}

  onSubmit() {
    this.accountService.revokeToken(this.detailsStaffResponse.id).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
          this.ref.close(true);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.message);
        } else if (res.code === 500) {
          this.toast.dangerToast("Lỗi hệ thống", res.message);
        }
      },
    )
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
