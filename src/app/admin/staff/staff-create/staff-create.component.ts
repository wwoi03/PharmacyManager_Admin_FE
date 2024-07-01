import { Component, OnInit, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { CreateStaffRequest } from "../../../models/requests/staff/create-staff-request";
import { StaffService } from "../../../services/staff/staff.service";
import { Toast } from "../../../helpers/toast";

@Component({
  selector: "ngx-staff-create",
  templateUrl: "./staff-create.component.html",
  styleUrls: ["./staff-create.component.scss"],
})
export class StaffCreateComponent implements OnInit, OnDestroy {
  currentTheme: string;
  themeSubscription: any;
  createStaffRequest: CreateStaffRequest;

  constructor(
    private staffService: StaffService,
    private themeService: NbThemeService,
    private toast: Toast
  ) {
    this.themeSubscription = this.themeService
      .getJsTheme()
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit(): void {
    this.createStaffRequest = new CreateStaffRequest();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  onRoleChange(role: string, event: any) {
    if (event.target.checked) {
      this.createStaffRequest.roles.push(role);
    } else {
      const index = this.createStaffRequest.roles.indexOf(role);
      if (index > -1) {
        this.createStaffRequest.roles.splice(index, 1);
      }
    }

    console.log("Role:", this.createStaffRequest.roles);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.createStaffRequest.image = reader.result as string;
      };
    }
  }

  createStaff() {
    console.log("Dữ liệu gửi lên:", this.createStaffRequest);
    console.log("BD:", this.createStaffRequest.birthday);

    this.staffService.create(this.createStaffRequest).subscribe(
      (res) => {
        if (res.isSuccessed) {
          this.toast.successToast("Thêm thành công", res.message)
        } else {
          this.toast.warningToast("Thêm thất bại", res.message)
        }
      },
      (error) => {
        console.error("Lỗi khi thêm nhân", error);
        this.toast.warningToast("Thêm thất bại", "Thêm nhân viên không thành công.")
      }
    );
  }
}
