import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { Toast } from "../../../helpers/toast";
import { ShipmentService } from "../../../services/shipment/shipment.service";
import { CreateShipmentRequest } from "../../../models/requests/shipment/create-shipment-request";
import { SupplierService } from "../../../services/supplier/supplier.service";
import { LoadingService } from "../../../helpers/loading-service";
import { Router } from "@angular/router";
import { SelectSupplierResponse } from "../../../models/responses/supplier/select-supplier-response";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: "ngx-shipment-create",
  templateUrl: "./shipment-create.component.html",
  styleUrls: ["./shipment-create.component.scss"],
})
export class ShipmentCreateComponent {
  // Variable
  createShipmentRequest: CreateShipmentRequest = new CreateShipmentRequest();
  suppliers$: Observable<SelectSupplierResponse[]> | undefined;

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
    this.loadSupplier();
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

  // Load supplier
  loadSupplier() {
    this.supplierService.getSuppliersSelect().subscribe((res) => {
      if (res.code === 200) {
        this.suppliers$ = of(res.obj).pipe(delay(500));
      }
    });
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
          const shipmentId = res.obj;
          this.toast.successToast("Thành công", res.message);
          this.router.navigate(['/admin/shipment-details/shipment-details-list', shipmentId]);
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

  // Custom search supplier select
  customSearchFn(term: string, item: any): boolean {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) || item.codeSupplier.toString().includes(term)
    );
  }
}
