import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { CreateShipmentDetailsRequest } from "../../../models/requests/shipment-details/create-shipment-details-request";
import { Observable, of } from "rxjs";
import { SelectProductResponse } from "../../../models/responses/product/select-product-response";
import { ProductService } from "../../../services/product/product.service";
import { delay } from "rxjs/operators";
import { NbRadioGroupComponent } from "@nebular/theme";

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

  @ViewChild('radioProduct') radioProduct: NbRadioGroupComponent;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("shipmentForm") shipmentForm: NgForm;
  validationNotify: ValidationNotify;

  // constructor
  constructor(private productService: ProductService) {}

  // InitData
  ngOnInit(): void {
    this.loadProducts();
    this.validationMessages =
      this.createShipmentDetailsRequest.validationMessages;
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

  createShipmentDetails() {}

  // Custom search supplier select
  customSearchFn(term: string, item: any): boolean {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.codeMedicine.toString().includes(term)
    );
  }

  // Xử lý sự kiện từ component con
  onActionTriggered(newProductId: any): void {
    this.radioProduct.value = 'hideProduct';
    this.showCreateProduct = false;
    this.loadProducts();
    this.createShipmentDetailsRequest.productId = newProductId;
  }
}
