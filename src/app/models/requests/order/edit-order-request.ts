export enum OrderStatus {
    OrderWaitingConfirmation = 'OrderWaitingConfirmation',
    OrderBeingPrepared = 'OrderBeingPrepared',
    OrderBeingDelivered = 'OrderBeingDelivered',
    OrderDelivered = 'OrderDelivered',
    RequestCancelOrder = 'RequestCancelOrder',
    CancellationOrderApproved = 'CancellationOrderApproved',
    StoreCanceledOrder = 'StoreCanceledOrder'
  }

export const OrderStatusDescriptions: { [key in OrderStatus]: string } = {
[OrderStatus.OrderWaitingConfirmation]: 'Đang chờ xác nhận',
[OrderStatus.OrderBeingPrepared]: 'Đang chuẩn bị',
[OrderStatus.OrderBeingDelivered]: 'Đang giao hàng',
[OrderStatus.OrderDelivered]: 'Đã giao hàng',
[OrderStatus.RequestCancelOrder]: 'Yêu cầu hủy đơn',
[OrderStatus.CancellationOrderApproved]: 'Đã hủy đơn',
[OrderStatus.StoreCanceledOrder]: 'Cửa hàng hủy đơn'
};

export enum OrderStatusNumber {
  OrderWaitingConfirmation = 0,
  OrderBeingPrepared = 1,
  OrderBeingDelivered = 2,
  OrderDelivered = 3,
  RequestCancelOrder = 4,
  CancellationOrderApproved = 5,
  StoreCanceledOrder = 6
}
