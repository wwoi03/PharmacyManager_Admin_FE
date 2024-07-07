import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { Toast } from "../../../helpers/toast";
import { ShipmentService } from "../../../services/shipment/shipment.service";
import { CreateShipmentRequest } from "../../../models/requests/shipment/create-shipment-request";
import { SupplierService } from "../../../services/supplier/supplier.service";
import { LoadingService } from "../../../helpers/loading-service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-shipment-create",
  templateUrl: "./shipment-create.component.html",
  styleUrls: ["./shipment-create.component.scss"],
})
export class ShipmentCreateComponent {
  // Variable
  codeSupplier: string;
  supplierName: string;
  showSupplierNameField = false;
  createShipmentRequest: CreateShipmentRequest = new CreateShipmentRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("shipmentForm") shipmentForm: NgForm;
  validationNotify: ValidationNotify;

  // Constructor
  constructor(
    private shipmentService: ShipmentService,
    private supplierService: SupplierService,
    private toast: Toast,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  // InitData
  ngOnInit(): void {
    this.validationMessages = this.createShipmentRequest.validationMessages;
    this.createShipmentRequest.status = "PM_Shipment_Pending";
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.shipmentForm
    );
  }

  // Xử lý thêm nhân viên
  createShipment() {
    // Valid
    if (this.shipmentForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    this.loadingService.show();

    // Call API Create Staff
    this.shipmentService.create(this.createShipmentRequest).subscribe((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.successToast("Thành công", res.message);
          this.router.navigate(['/admin/shipment/shipment-list']);
        }, 1000);
      } else if (res.code >= 400 && res.code < 500) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.warningToast("Thất bại", res.validationNotify.message);
          this.validationNotify.formErrors[res.validationNotify.obj] =
            res.validationNotify.message;
        }, 1000);
      }
    });
  }

  // Xử lý sự kiện khi nhập nhà cung cấp
  onInputSupplierFinish(event: any) {
    this.codeSupplier = event.target.value;

    if (this.codeSupplier === "" || this.codeSupplier === null) {
      this.showSupplierNameField = false;
    }

    this.supplierService
      .getSupplierByCode(this.codeSupplier)
      .subscribe((res) => {
        if (res.code === 200) {
          this.supplierName = res.obj.name;
          this.createShipmentRequest.supplierId = res.obj.id;
          this.validationNotify.formErrors["codeSupplier"] = null;
          this.showSupplierNameField = true;
        } else if (res.code === 409) {
          this.createShipmentRequest.supplierId = null;
          this.validationNotify.formErrors["codeSupplier"] =
            "Nhà cung cấp không tồn tại.";
          this.showSupplierNameField = false;
        }
      });
  }
}
