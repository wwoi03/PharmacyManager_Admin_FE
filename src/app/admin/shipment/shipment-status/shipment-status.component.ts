import { Component, Input } from "@angular/core";

@Component({
  selector: "ngx-shipment-status",
  template: `
    <div
      [ngStyle]="{
        color: color,
        'background-color': backgroundColor,
        'border-radius': '10px',
        padding: '5px',
        'text-align': 'center',
      }"
    >
      {{ statusText }}
    </div>
  `,
  styleUrls: ["./shipment-status.component.scss"],
})
export class ShipmentStatusComponent {
  @Input() value: string; // Giá trị trạng thái từ bảng
  statusText: string;
  color: string;
  backgroundColor: string;

  ngOnInit() {
    this.setStatusProperties();
  }

  setStatusProperties() {
    switch (this.value) {
      case "PM_Shipment_Pending":
        this.statusText = "Chờ Xử Lý";
        this.color = "white";
        this.backgroundColor = "#61AFFE";
        break;
      case "PM_Shipment_Shipped":
        this.statusText = "Đã thanh toán";
        this.color = "white";
        this.backgroundColor = "green";
        break;
      default:
        this.statusText = "Chờ Xử Lý";
        this.color = "white";
        this.backgroundColor = "#61AFFE";
    }
  }
}
