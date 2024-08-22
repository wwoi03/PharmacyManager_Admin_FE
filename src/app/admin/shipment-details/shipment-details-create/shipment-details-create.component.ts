import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { CreateShipmentDetailsRequest } from "../../../models/requests/shipment-details/create-shipment-details-request";
import { Observable, of } from "rxjs";
import { SelectProductResponse } from "../../../models/responses/product/select-product-response";
import { ProductService } from "../../../services/product/product.service";
import { delay } from "rxjs/operators";
import { NbRadioGroupComponent } from "@nebular/theme";
import { LoadingService } from "../../../helpers/loading-service";
import { ShipmentDetailsService } from "../../../services/shipment-details/shipment-details.service";
import { Toast } from "../../../helpers/toast";
import { ShipmentDetailsUnitResponse } from "../../../models/responses/shipment-details-unit/shipment-details-unit-response";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-shipment-details-create",
  templateUrl: "./shipment-details-create.component.html",
  styleUrls: ["./shipment-details-create.component.scss"],
})
export class ShipmentDetailsCreateComponent {
  // variables
  newProductId: string;
  showCreateProduct: boolean = false;
  createShipmentDetailsRequest: CreateShipmentDetailsRequest = new CreateShipmentDetailsRequest();
  products$: Observable<SelectProductResponse[]> | undefined;

  @ViewChild("radioProduct") radioProduct: NbRadioGroupComponent;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("shipmentForm") shipmentForm: NgForm;
  validationNotify: ValidationNotify;

  // constructor
  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private shipmentDetailsService: ShipmentDetailsService,
    private toast: Toast,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // InitData
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.createShipmentDetailsRequest.shipmentId = params["id"];
      this.loadProducts();
      this.validationMessages =
        this.createShipmentDetailsRequest.validationMessages;
    });
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.shipmentForm
    );
  }

  // Load products
  loadProducts() {
    this.productService.getProductsSelect().subscribe((res) => {
      if (res.code === 200) {
        this.products$ = of(res.obj).pipe(delay(500));
      }
    });
  }

  // xử lý chọn sản phẩm
  onProductChange(event: any) {
    if (event === "hideProduct") {
      this.showCreateProduct = false;
    } else if (event === "showProduct") {
      this.showCreateProduct = true;
    }
  }

  // xử lý chọn giá bán
  onSalePriceChange(event: any) {
    if (event === "hideProduct") {
      this.showCreateProduct = false;
    } else if (event === "showProduct") {
      this.showCreateProduct = true;
    }
  }

  createShipmentDetails() {
    console.log(this.createShipmentDetailsRequest);

    // Valid
    if (this.shipmentForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    this.loadingService.show();

    // Call API Create Staff
    this.shipmentDetailsService
      .create(this.createShipmentDetailsRequest)
      .subscribe((res) => {
        if (res.code === 200) {
          setTimeout(() => {
            this.loadingService.hide();
            this.toast.successToast("Thành công", res.message);
            this.router.navigate(['/admin/shipment-details/shipment-details-list', this.createShipmentDetailsRequest.shipmentId]);
          }, 1000);
        } else if (res.code >= 400 && res.code < 500) {
          setTimeout(() => {
            this.loadingService.hide();
            this.toast.warningToast("Thất bại", res.validationNotify.message);

            if (res.validationNotify.obj != 'default') {
              this.validationNotify.formErrors[res.validationNotify.obj] =
              res.validationNotify.message;
            }
          }, 1000);
        }
      });
  }

  // Custom search supplier select
  customSearchFn(term: string, item: any): boolean {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.codeMedicine.toString().includes(term)
    );
  }

  // Xử lý sự kiện từ component con
  onProductTriggered(newProductId: any): void {
    this.radioProduct.value = "hideProduct";
    this.showCreateProduct = false;
    this.loadProducts();
    this.createShipmentDetailsRequest.productId = newProductId;
  }

  // Xử lý sự kiện từ component con
  onShipmentDetailsUnitTriggered(
    shipmentDetailsUnitResponse: ShipmentDetailsUnitResponse[]
  ): void {
    this.createShipmentDetailsRequest.shipmentDetailsUnits =
      shipmentDetailsUnitResponse;
    console.log(this.createShipmentDetailsRequest.shipmentDetailsUnits);
  }
}
