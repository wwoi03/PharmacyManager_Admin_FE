import { Component, OnInit, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { CreateStaffRequest } from "../../../models/requests/staff/create-staff-request";
import { StaffService } from "../../../services/staff/staff.service";
import { Toast } from "../../../helpers/toast";
import { RoleService } from "../../../services/role/role.service";
import { ListRoleResponse } from "../../../models/responses/role/list-role-response";

@Component({
  selector: "ngx-staff-create",
  templateUrl: "./staff-create.component.html",
  styleUrls: ["./staff-create.component.scss"],
})
export class StaffCreateComponent implements OnInit, OnDestroy {
  currentTheme: string;
  imageUrl: string | ArrayBuffer | null = "assets/images/kitten-default.png"; // Ảnh mặc định khi ban đầu
  themeSubscription: any;
  createStaffRequest: CreateStaffRequest;
  roles: ListRoleResponse[];

  constructor(
    private staffService: StaffService,
    private roleService: RoleService,
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
    this.loadRoles();
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
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Load roles
  loadRoles() {
    this.roleService.getRoles().subscribe(
      (res) => {
        if (res.code === 200) {
          this.roles = res.obj;
        } else {
          this.toast.warningToast("Lỗi hệ thống", "Vui lòng thử lại sau.");
        }
      },
      (error) => {
        this.toast.warningToast("Lỗi hệ thống", "Vui lòng thử lại sau.");
      }
    );
  }

  createStaff() {
    this.staffService.create(this.createStaffRequest).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thêm thành công", res.message);
        } else {
          this.toast.warningToast("Thêm thất bại", res.message);
        }
      },
      (error) => {
        console.error("Lỗi khi thêm nhân", error);
        this.toast.warningToast(
          "Thêm thất bại",
          "Thêm nhân viên không thành công."
        );
      }
    );
  }
}
