import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
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
  @Output() actionTriggered = new EventEmitter<any>(); // Định nghĩa sự kiện
  shipmentDetailsUnitResponse: ShipmentDetailsUnitResponse[] = [];

  // Setup table
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      codeUnit: {
        title: "Mã đơn vị",
        type: "string",
        editor: {
          type: "text",
          required: true, // Yêu cầu nhập liệu
        },
      },
      unitName: {
        title: "Tên đơn vị",
        type: "string",
        editor: {
          type: "text",
          required: true, // Yêu cầu nhập liệu
        },
      },
      salePrice: {
        title: "Giá bán",
        type: "number",
        editor: {
          type: "text",
          required: true, // Yêu cầu nhập liệu
        },
      },
      unitCount: {
        title: "Đơn vị con",
        type: "number",
        editor: {
          type: "text",
          required: true, // Yêu cầu nhập liệu
        },
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
        editor: {
          type: "text",
          required: true, // Yêu cầu nhập liệu
        },
      },
    },
  };

  // Constructor
  constructor(private shipmentDetailsUnit: ShipmentDetailsUnitService) {
    this.source = new LocalDataSource();
  }

  // InitData
  ngOnInit(): void {
    this.loadShipmentDetailsUnits();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.productId && !changes.productId.firstChange) {
      this.loadShipmentDetailsUnits(); // Tải lại dữ liệu khi productId thay đổi
    }
  }

  // Load shipment details unit
  loadShipmentDetailsUnits() {
    this.shipmentDetailsUnit
      .getShipmentDetailsUnitBestest(this.productId)
      .subscribe((res) => {
        if (res.code === 200) {
          this.shipmentDetailsUnitResponse = res.obj;
          this.source.load(this.shipmentDetailsUnitResponse);
          this.triggerAction();
        }
      });
  }

  triggerAction(): void {
    this.actionTriggered.emit(this.shipmentDetailsUnitResponse);
  }

  onEditConfirm(event): void {
    if (this.isValid(event.newData)) {
      event.confirm.resolve(event.newData);
      this.triggerAction();
    } else {
      window.alert("Bạn phải điền đầy đủ các trường bắt buộc.");
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    this.shipmentDetailsUnitResponse = this.shipmentDetailsUnitResponse.filter(
      (unit) => unit !== event.data
    );
    event.confirm.resolve();
    this.triggerAction();
  }

  onCreateConfirm(event): void {
    if (this.isValid(event.newData)) {
      const newData = event.newData;
      this.shipmentDetailsUnitResponse.push(newData);
      event.confirm.resolve(newData);
      this.triggerAction();
    } else {
      window.alert("Bạn phải điền đầy đủ các trường bắt buộc.");
      event.confirm.reject();
    }
  }

  isValid(data: any): boolean {
    return (
      data.codeUnit &&
      data.unitName &&
      data.salePrice &&
      data.unitCount &&
      data.level
    ); // Kiểm tra liệu các trường bắt buộc có dữ liệu hay không
  }
}
