import { Component, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { ShipmentService } from "../../../services/shipment/shipment.service";
import { SupplierService } from "../../../services/supplier/supplier.service";
import { Toast } from "../../../helpers/toast";
import { LoadingService } from "../../../helpers/loading-service";
import { Router } from "@angular/router";
import { SelectSupplierResponse } from "../../../models/responses/supplier/select-supplier-response";
import { UpdateShipmentRequest } from "../../../models/requests/shipment/update-shipment-request";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { DetailsShipmentResponse } from "../../../models/responses/shipment/details-shipment-response";
import { Util } from "../../../helpers/util";
import { NbDialogService } from "@nebular/theme";

@Component({
  selector: "ngx-shipment-edit",
  templateUrl: "./shipment-edit.component.html",
  styleUrls: ["./shipment-edit.component.scss"],
})
export class ShipmentEditComponent {
  // Variable
  detailsShipmentResponse: DetailsShipmentResponse = new DetailsShipmentResponse();
  updateShipmentRequest: UpdateShipmentRequest = new UpdateShipmentRequest();
  suppliers$: Observable<SelectSupplierResponse[]> | undefined;
  strImportDate: string;

  // Input
  @Input() shipmentId: string;

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
    private router: Router,
    private util: Util,
    private dialogService: NbDialogService, 
  ) {}

  // InitData
  ngOnInit(): void {
    this.loadShipmentDetails();
    this.loadSupplier();
    this.validationMessages = this.updateShipmentRequest.validationMessages;
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.shipmentForm
    );
  }

  onImportDateChange(event: any): void {
    this.updateShipmentRequest.importDate = event.target.value;
  }

  // Load supplier
  loadSupplier() {
    this.supplierService.getSuppliersSelect().subscribe((res) => {
      if (res.code === 200) {
        this.suppliers$ = of(res.obj).pipe(delay(500));
      }
    });
  }

  // Load supplier
  loadShipmentDetails() {
    this.shipmentService.details(this.shipmentId).subscribe((res) => {
      if (res.code === 200) {
        this.detailsShipmentResponse = res.obj;
        this.updateShipmentRequest.supplierId = this.detailsShipmentResponse.supplierId;
        this.convertDetailsToUpdateShipment();
        this.strImportDate = this.util.convertISODateFormat(this.updateShipmentRequest.importDate + '');
      }
    });
  }

  // convert details to update
  convertDetailsToUpdateShipment() {
    this.updateShipmentRequest.shipmentId = this.detailsShipmentResponse.shipmentId;
    this.updateShipmentRequest.note = this.detailsShipmentResponse.note;
    this.updateShipmentRequest.importDate = this.detailsShipmentResponse.importDate;
    this.updateShipmentRequest.codeShipment = this.detailsShipmentResponse.codeShipment;
    this.updateShipmentRequest.status = this.detailsShipmentResponse.status;
    this.updateShipmentRequest.supplierId = this.detailsShipmentResponse.supplierId;
  }

  // Xử lý thêm nhân viên
  updateShipment() {
    // Valid
    if (this.shipmentForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    this.loadingService.show();
    
    // Call API Create Staff
    this.shipmentService.update(this.updateShipmentRequest).subscribe((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.successToast("Thành công", res.message);
        }, 1000);
      } else if (res.code >= 400 && res.code < 500) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.warningToast("Thất bại", res.validationNotify.message);
          this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
        }, 1000);
      }
    });
  }

  // Confirm Update
  confirmUpdateShipment() {
    // this.dialogService
    //   .open()
    //   .onClose.subscribe((result: boolean) => {
    //     if (result) {
    //       this.loadShipmentDetails();
    //     }
    //   });
  }

  // Custom search supplier select
  customSearchFn(term: string, item: any): boolean {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) || item.codeSupplier.toString().includes(term)
    );
  }
}
