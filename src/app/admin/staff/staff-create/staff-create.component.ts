import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { CreateStaffRequest } from "../../../models/requests/staff/create-staff-request";
import { StaffService } from "../../../services/staff/staff.service";
import { Toast } from "../../../helpers/toast";
import { RoleService } from "../../../services/role/role.service";
import { ListRoleResponse } from "../../../models/responses/role/list-role-response";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";

@Component({
  selector: "ngx-staff-create",
  templateUrl: "./staff-create.component.html",
  styleUrls: ["./staff-create.component.scss"],
})
export class StaffCreateComponent implements OnInit, OnDestroy {
  currentTheme: string;
  imageUrl: string | ArrayBuffer | null = "assets/images/kitten-default.png"; // Ảnh mặc định khi ban đầu
  themeSubscription: any;

  // Variable
  createStaffRequest: CreateStaffRequest = new CreateStaffRequest();;
  roles: ListRoleResponse[];

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('staffForm') staffForm: NgForm;
  validationNotify: ValidationNotify;

  // Constructor
  constructor(
    private staffService: StaffService,
    private roleService: RoleService,
    private themeService: NbThemeService,
    private toast: Toast,
  ) {
    this.themeSubscription = this.themeService
      .getJsTheme()
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  // InitData
  ngOnInit(): void {
    this.loadRoles();
    this.validationMessages = this.createStaffRequest.validationMessages
    this.createStaffRequest.gender = 'Nam';
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.staffForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  // Xử lý khi thay đổi quyền
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

  // Xử lý khi thay đổi hình ảnh
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

  // Xử lý load roles
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

  // Xử lý thêm nhân viên
  createStaff() {
    // Valid
    if (this.staffForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }

    // Call API Create Staff
    this.staffService.create(this.createStaffRequest).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.validationNotify.message);
          this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
        }
      },
      (err) => {
        //console.error("Lỗi khi thêm nhân", error);
        this.toast.warningToast("Lỗi hệ thống", "Lỗi hệ thống, vui lòng thử lại sau.");
      }
    );
  }
}