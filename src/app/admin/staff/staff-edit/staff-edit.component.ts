import { Component, ViewChild } from "@angular/core";
import { UpdateStaffRequest } from "../../../models/requests/staff/update-staff-request";
import { ListRoleResponse } from "../../../models/responses/role/list-role-response";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { StaffService } from "../../../services/staff/staff.service";
import { RoleService } from "../../../services/role/role.service";
import { NbThemeService } from "@nebular/theme";
import { Toast } from "../../../helpers/toast";
import { LoadingService } from "../../../helpers/loading-service";
import { ActivatedRoute, Router } from "@angular/router";
import { DetailsStaffResponse } from "../../../models/responses/staff/details-staff.response";
import { Util } from "../../../helpers/util";

@Component({
  selector: "ngx-staff-edit",
  templateUrl: "./staff-edit.component.html",
  styleUrls: ["./staff-edit.component.scss"],
})
export class StaffEditComponent {
  currentTheme: string;
  imageUrl: string | ArrayBuffer | null = "assets/images/kitten-default.png"; // Ảnh mặc định khi ban đầu
  themeSubscription: any;

  // Variable
  updateStaffRequest: UpdateStaffRequest = new UpdateStaffRequest();
  detailsStaffResponse: DetailsStaffResponse = new DetailsStaffResponse();
  roles: ListRoleResponse[];
  strBirthday: string;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("staffForm") staffForm: NgForm;
  validationNotify: ValidationNotify;

  // Constructor
  constructor(
    private staffService: StaffService,
    private roleService: RoleService,
    private themeService: NbThemeService,
    private toast: Toast,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private util: Util
  ) {
    this.themeSubscription = this.themeService
      .getJsTheme()
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  // InitData
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.updateStaffRequest.id = params["id"];
      this.loadRoles();
      this.loadStaff();
    });

    this.validationMessages = this.updateStaffRequest.validationMessages;
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.staffForm
    );
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  // checked role
  isRoleSelected(roleNormalizedName: string): boolean {
    var isSelected = this.detailsStaffResponse.roles.includes(roleNormalizedName);
    return isSelected;
  }

  // Xử lý khi thay đổi quyền
  onRoleChange(role: string, event: any) {
    if (event.target.checked) {
      this.updateStaffRequest.roles.push(role);
    } else {
      const index = this.updateStaffRequest.roles.indexOf(role);
      if (index > -1) {
        this.updateStaffRequest.roles.splice(index, 1);
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
    this.roleService.getRoles().subscribe((res) => {
      if (res.code === 200) {
        this.roles = res.obj;
      }
    });
  }

  // Load Staff
  loadStaff() {
    this.staffService.details(this.updateStaffRequest.id).subscribe((res) => {
      if (res.code === 200) {
        this.strBirthday = this.util.convertISODateFormat(res.obj.birthday + '');
        this.detailsStaffResponse = res.obj;
        this.mapDetailsToUpdate(this.detailsStaffResponse, this.updateStaffRequest);
      } else {
        this.router.navigate(["/admin/dashboard"]);
      }
    });
  }

  onBirthdayChange(newDate: string) {
    this.updateStaffRequest.birthday = new Date(newDate);
  }

  mapDetailsToUpdate(
    details: DetailsStaffResponse,
    update: UpdateStaffRequest
  ) {
    update.fullName = details.fullName;
    update.userName = details.userName;
    update.phoneNumber = details.phoneNumber;
    update.email = details.email;
    update.gender = details.gender;
    update.birthday = details.birthday;
    update.address = details.address;
    update.image = details.image;
    update.roles = details.roles;
  }

  // Xử lý thêm nhân viên
  updateStaff() {
    console.log(this.updateStaffRequest)
    // Valid
    if (this.staffForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    // loading
    this.loadingService.show();

    // Call API Create Staff
    this.staffService.update(this.updateStaffRequest).subscribe(
      (res) => {
        console.log(res);
        if (res.code === 200) {
          setTimeout(() => {
            this.loadingService.hide();
            this.toast.successToast("Thành công", res.message);
          }, 1000);
        } else if (res.code >= 400 && res.code < 500) {
          setTimeout(() => {
            this.loadingService.hide();
            this.toast.warningToast("Thất bại", res.validationNotify.message);
            this.validationNotify.formErrors[res.validationNotify.obj] =
              res.validationNotify.message;
          }, 1000);
        }
      },
      (err) => {
        console.error(err)
      }
    );
  }
}
