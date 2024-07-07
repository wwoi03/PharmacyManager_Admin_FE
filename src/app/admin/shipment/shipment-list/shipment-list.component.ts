import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { ShipmentService } from "../../../services/shipment/shipment.service";
import { Router } from "@angular/router";
import { ShipmentResponse } from "../../../models/responses/shipment/shipment-response";
import { Toast } from "../../../helpers/toast";
import { NbDialogService } from "@nebular/theme";
import { ShipmentCreateComponent } from "../shipment-create/shipment-create.component";

@Component({
  selector: "ngx-shipment-list",
  templateUrl: "./shipment-list.component.html",
  styleUrls: ["./shipment-list.component.scss"],
})
export class ShipmentListComponent {
  // Variable
  source: LocalDataSource;
  shipmentsResponse: ShipmentResponse[] = [];

  // Setup table
  settings = {
    mode: "external",
    actions: {
      columnTitle: "Actions",
      add: true,
      edit: true,
      delete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      create: true,
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
      importDate: {
        title: "Ngày nhập",
        type: "date",
        valuePrepareFunction: (date) => {
          if (date) {
            const raw = new Date(date);
            const day =
              raw.getDate() < 10 ? "0" + raw.getDate() : raw.getDate();
            const month =
              raw.getMonth() + 1 < 10
                ? "0" + (raw.getMonth() + 1)
                : raw.getMonth();
            const year = raw.getFullYear();

            return `
              ${day}-${month}-${year}
            `;
          }
          return "";
        },
      },
      note: {
        title: "Ghi chú",
        type: "string",
      },
      supplierName: {
        title: "Nhà cung cấp",
        type: "string",
      },
      totalProduct: {
        title: "Số sản phẩm",
        type: "number",
      },
      totalQuantity: {
        title: "Tổng số lượng",
        type: "number",
      },
      status: {
        title: "Trạng thái",
        type: "string",
      },
    },
  };

  // Constructor
  constructor(
    private shipmentService: ShipmentService,
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService
  ) {
    this.source = new LocalDataSource();
  }

  // Init Data
  ngOnInit() {
    this.loadShipmentData();
  }

  // Load Shipment By Branch
  loadShipmentData() {
    this.shipmentService.getShipmentsByBranch().subscribe((res) => {
      if (res.code === 200) {
        this.shipmentsResponse = res.obj;
        this.source.load(this.shipmentsResponse);
      } else if (res.code === 404) {
        this.toast.dangerToast("Lỗi", res.validationNotify.message);
      }
    });
  }

  // Thêm đơn nhập kho
  onCreate(event): void {
    //this.router.navigate(['/admin/shipment/shipment-create']);
    this.dialogService
      .open(ShipmentCreateComponent)
      .onClose.subscribe((result: boolean) => {
        if (result) {
          this.loadShipmentData();
        }
      });
  }

  // Xóa đơn nhập kho
  onDeleteConfirm(event): void {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
