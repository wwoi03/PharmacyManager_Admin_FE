import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { Toast } from '../../../helpers/toast';
import { ShipmentService } from '../../../services/shipment/shipment.service';
import { CreateShipmentRequest } from '../../../models/requests/shipment/create-shipment-request';
import { SupplierService } from '../../../services/supplier/supplier.service';

@Component({
  selector: 'ngx-shipment-create',
  templateUrl: './shipment-create.component.html',
  styleUrls: ['./shipment-create.component.scss']
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
  @ViewChild('shipmentForm') shipmentForm: NgForm;
  validationNotify: ValidationNotify;

  // Constructor
  constructor(
    private shipmentService: ShipmentService,
    private supplierService: SupplierService,
    private toast: Toast,
  ) {
  }

  // InitData
  ngOnInit(): void {
    this.validationMessages = this.createShipmentRequest.validationMessages;
    this.createShipmentRequest.status = 'PM_Shipment_Pending'
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.shipmentForm);
  }

  // Xử lý thêm nhân viên
  createShipment() {
    // Valid
    if (this.shipmentForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }

    // Call API Create Staff
    this.shipmentService.create(this.createShipmentRequest).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.validationNotify.message);
          this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
        }
      }
    );
  }

  // Xử lý sự kiện khi nhập nhà cung cấp
  onInputSupplierFinish(event: any) {
    this.codeSupplier = event.target.value;

    if (this.codeSupplier === "" || this.codeSupplier === null) {
      this.showSupplierNameField = false;
    }

    this.supplierService.getSupplierByCode(this.codeSupplier).subscribe(
      (res) => {
        if (res.code === 200) {
          this.supplierName = res.obj.name;
          this.createShipmentRequest.supplierId = res.obj.id;
          this.validationNotify.formErrors['codeSupplier'] = null;
          this.showSupplierNameField = true;
        } else if (res.code === 409) {
          this.createShipmentRequest.supplierId = null;
          this.validationNotify.formErrors['codeSupplier'] = "Nhà cung cấp không tồn tại.";
          this.showSupplierNameField = false;
        } 
      }
    )
  }
}
