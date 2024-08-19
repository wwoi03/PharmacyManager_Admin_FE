import { Component, Input } from '@angular/core';
import { OrderStatus, OrderStatusDescriptions } from '../../../models/requests/order/edit-order-request';

@Component({
  selector: 'ngx-order-status',
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
})
export class OrderStatusComponent {
  @Input() value: string; // Giá trị trạng thái từ bảng
  statusText: string;
  color: string;
  backgroundColor: string;

  ngOnInit() {
    this.setStatusProperties();
  }

  setStatusProperties() {
    switch (this.value) {
      case OrderStatusDescriptions[OrderStatus.OrderWaitingConfirmation]:
        this.statusText = OrderStatusDescriptions[OrderStatus.OrderWaitingConfirmation];
        this.color = "white";
        this.backgroundColor = "#FFC107"; // Màu vàng
        break;
      case OrderStatusDescriptions[OrderStatus.OrderBeingPrepared]:
        this.statusText = OrderStatusDescriptions[OrderStatus.OrderBeingPrepared];
        this.color = "white";
        this.backgroundColor = "#FF9800"; // Màu cam
        break;
      case OrderStatusDescriptions[OrderStatus.OrderBeingDelivered]:
        this.statusText = OrderStatusDescriptions[OrderStatus.OrderBeingDelivered];
        this.color = "white";
        this.backgroundColor = "#2196F3"; // Màu xanh dương
        break;
      case OrderStatusDescriptions[OrderStatus.OrderDelivered]:
        this.statusText = OrderStatusDescriptions[OrderStatus.OrderDelivered];
        this.color = "white";
        this.backgroundColor = "green"; // Màu xanh lá cây
        break;
      case OrderStatusDescriptions[OrderStatus.CancellationOrderApproved]:
        this.statusText = OrderStatusDescriptions[OrderStatus.CancellationOrderApproved];
        this.color = "white";
        this.backgroundColor = "red"; // Màu đỏ
        break;
      case OrderStatusDescriptions[OrderStatus.StoreCanceledOrder]:
        this.statusText = OrderStatusDescriptions[OrderStatus.StoreCanceledOrder];
        this.color = "white";
        this.backgroundColor = "darkred"; // Màu đỏ đậm
        break;
      default:
        this.statusText = "Không xác định";
        this.color = "white";
        this.backgroundColor = "#9E9E9E"; // Màu xám
    }
  }
}