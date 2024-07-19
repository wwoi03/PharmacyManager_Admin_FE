import { Component, Input } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { ShipmentDetailsUnitService } from "../../../services/shipment-details-unit/shipment-details-unit.service";
import { ShipmentDetailsUnitResponse } from "../../../models/responses/shipment-details-unit/shipment-details-unit-response";

@Component({
  selector: "ngx-shipment-details-unit-list",
  templateUrl: "./shipment-details-unit-list.component.html",
  styleUrls: ["./shipment-details-unit-list.component.scss"],
})
export class ShipmentDetailsUnitListComponent {
  // Variable
  source: LocalDataSource;
  @Input() productId: string;
  shipmentDetailsUnitResponse: ShipmentDetailsUnitResponse[] = [];

  // Setup table
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      codeUnit: {
        title: "Mã đơn vị",
        type: "string",
      },
      unitName: {
        title: "Tên đơn vị",
        type: "string",
      },
      salePrice: {
        title: "Giá bán",
        type: "number",
      },
      unitCount: {
        title: "Đơn vị con",
        type: "number",
      },
      level: {
        title: "Cấp",
        filter: {
          type: "list",
          config: {
            selectText: "chọn cấp...",
            list: [
              { value: "1", title: "1" },
              { value: "2", title: "2" },
              { value: "3", title: "3" },
              { value: "3", title: "4" },
              { value: "3", title: "5" },
            ],
          },
        },
      },
    },
  };

  // Constructor
  constructor(
    private shipmentDetailsUnit: ShipmentDetailsUnitService
  ) {
    this.source = new LocalDataSource();
  }

  // InitData
  ngOnInit(): void {
    this.loadShipmentDetailsUnits();
  }

  // Load shipment details unit
  loadShipmentDetailsUnits() {
    this.shipmentDetailsUnit
      .getShipmentDetailsUnitBestest(this.productId)
      .subscribe((res) => {
        if (res.code === 200) {
          this.shipmentDetailsUnitResponse = res.obj;
          if (this.shipmentDetailsUnitResponse.length > 0) {
            this.source.load(this.shipmentDetailsUnitResponse);
          }
        }
      });
  }
}
