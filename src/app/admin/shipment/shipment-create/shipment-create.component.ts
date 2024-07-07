import { Component, ViewChild } from "@angular/core";
import { CreateShipmentRequest } from "../../../models/requests/shipment/create-shipment-request";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { NbDialogRef } from "@nebular/theme";
import { ShipmentService } from "../../../services/shipment/shipment.service";
import { Toast } from "../../../helpers/toast";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-shipment-create",
  templateUrl: "./shipment-create.component.html",
  styleUrls: ["./shipment-create.component.scss"],
})
export class ShipmentCreateComponent {
  // Variable
  showParentCategoryField: boolean = false;
  parentCategoryCode: string;
  parentCategoryName: string;
  createShipmentRequest: CreateShipmentRequest = new CreateShipmentRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("shipmentForm") shipmentForm: NgForm;
  validationNotify: ValidationNotify;

  constructor(
    protected ref: NbDialogRef<ShipmentCreateComponent>,
    private shipmentService: ShipmentService,
    private toast: Toast,
    private router: Router
  ) {}

  // InitData
  ngOnInit(): void {
    this.validationMessages = this.createShipmentRequest.validationMessages;
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.shipmentForm
    );
  }

  // Create
  createShipment() {
    // Valid
    if (this.shipmentForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    // Create
    this.shipmentService.create(this.createShipmentRequest).subscribe((res) => {
      if (res.code === 200) {
        this.toast.successToast("Thành công", res.message);
        this.router.navigate(['/admin/shipment-details/shipment-details-list'])
      } else if (res.code >= 400 && res.code < 500) {
        this.toast.warningToast("Thất bại", res.validationNotify.message);
        this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
      } 
    });
  }

  // // Xử lý khi nhấn xong code category
  // onInputCategoryParentFinish(event: any): void {
  //   this.parentCategoryCode = event.target.value;

  //   if (this.parentCategoryCode === "" || this.parentCategoryCode === null) {
  //     this.validationNotify.formErrors['parentCategoryId'] = null;
  //     this.showParentCategoryField = false;
  //   }

  //   this.shipmentService.getCategoryByCode(this.parentCategoryCode).subscribe(
  //     (res) => {
  //       if (res.code === 200) {
  //         this.parentCategoryName = res.obj.name;
  //         this.createCategoryRequest.parentCategoryId = res.obj.id;
  //         this.validationNotify.formErrors['parentCategoryId'] = null;
  //         this.showParentCategoryField = true;
  //       } else if (res.code === 409) {
  //         this.createCategoryRequest.parentCategoryId = null;
  //         this.validationNotify.formErrors['parentCategoryId'] = "Loại sản phẩm không tồn tại.";
  //         this.showParentCategoryField = false;
  //       }
  //     },
  //   )
  // }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
