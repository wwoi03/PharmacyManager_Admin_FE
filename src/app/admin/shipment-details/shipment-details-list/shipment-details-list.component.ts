import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { ShipmentDetailsService } from "../../../services/shipment-details/shipment-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ListShipmentDetailsResponse } from "../../../models/responses/shipment-details/list-shipment-details-response";
import { Toast } from "../../../helpers/toast";
import { NbDialogService } from "@nebular/theme";

@Component({
  selector: "ngx-shipment-details-list",
  templateUrl: "./shipment-details-list.component.html",
  styleUrls: ["./shipment-details-list.component.scss"],
})
export class ShipmentDetailsListComponent {
  // Variable
  source: LocalDataSource;
  shipmentId: string;
  listShipmentDetailsResponse: ListShipmentDetailsResponse[] = [];

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
      productName: {
        title: "Tên sản phẩm",
        type: "string",
        width: "600px",
      },
      importPrice: {
        title: "Giá nhập",
        type: "string",
        width: "200px",
      },
      quantity: {
        title: "Số lượng",
        type: "number",
        width: "150px",
      },
      sold: {
        title: "Đã bán",
        type: "number",
        width: "150px",
      },
      manufactureDate: {
        title: "Ngày sản xuất",
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
        width: "250px",
      },
      expirationDate: {
        title: "Ngày hết hạn",
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
        width: "200px",
      },
    },
  };

  // constructor
  constructor(
    private shipmentDetailsService: ShipmentDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,
  ) {}

  // Init Data
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.shipmentId = params["id"];
      this.loadShipmentDetails();
    });
  }

  // Load Shipment By Branch
  loadShipmentDetails() {
    this.shipmentDetailsService
      .getShipmentDetailsByShipment(this.shipmentId)
      .subscribe((res) => {
        if (res.code === 200) {
          this.listShipmentDetailsResponse = res.obj;
          this.source.load(this.listShipmentDetailsResponse);
          console.log(this.source);
        } 
      });
  }

  // Create
  onCreate(event): void {
    this.router.navigate(['/admin/shipment-details/shipment-details-create', this.shipmentId]);
  }

  // Eidt
  onEdit(event): void {
    const shipmentId: string = event.data.id;
    this.router.navigate(['/admin/shipment-details/shipment-details-list', shipmentId]);
  }

  // Delete
  onDeleteConfirm(event): void {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
