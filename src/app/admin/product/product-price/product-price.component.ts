import { Component } from "@angular/core";
import { ProductService } from "../../../services/product/product.service";
import { NbDialogRef } from "@nebular/theme";
import { ShipmentDetailsUnitService } from "../../../services/shipment-details-unit/shipment-details-unit.service";
import { LocalDataSource } from "ng2-smart-table";
import { ShipmentDetailsUnitResponse } from "../../../models/responses/shipment-details-unit/shipment-details-unit-response";
import { UtilMoney } from "../../../helpers/util-money";

@Component({
  selector: "ngx-product-price",
  templateUrl: "./product-price.component.html",
  styleUrls: ["./product-price.component.scss"],
})
export class ProductPriceComponent {
  // Variable
  product: any;
  source: LocalDataSource;
  shipmentDetailsUnitResponse: ShipmentDetailsUnitResponse[] = [];
  quantityInStock: number = 0;

  // Setup table
  settings = {
    actions: {
      add: false,    // Vô hiệu hóa nút thêm (Add)
      edit: false,   // Vô hiệu hóa nút sửa (Edit)
      delete: false  // Vô hiệu hóa nút xóa (Delete)
    },
    columns: {
      unitName: {
        title: "Tên đơn vị",
        type: "string",
      },
      salePrice: {
        title: "Giá bán",
        type: "string",
        valuePrepareFunction: (data) => {
          return this.utilMoney.formatCurrency(data);
        },
      },
      unitCount: {
        title: "Đơn vị con",
        type: "number",
      },
    },
  };

  // Constructor
  constructor(
    private shipmentDetailsUnit: ShipmentDetailsUnitService,
    private productService: ProductService,
    protected ref: NbDialogRef<ProductPriceComponent>,
    private utilMoney: UtilMoney,
  ) {
    this.source = new LocalDataSource();
  }

  // InitData
  ngOnInit(): void {
    console.log(this.product.id)
    this.loadShipmentDetailsUnits();
  }

  // Load shipment details unit
  loadShipmentDetailsUnits() {
    this.shipmentDetailsUnit
      .getShipmentDetailsUnitBestest(this.product.id)
      .subscribe((res) => {
        if (res.code === 200) {
          this.shipmentDetailsUnitResponse = res.obj;

          if (this.shipmentDetailsUnitResponse.length != 0) {
            this.quantityInStock = this.shipmentDetailsUnitResponse[0].quantityInStock;
          }

          this.source.load(this.shipmentDetailsUnitResponse);
        }
      });
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
