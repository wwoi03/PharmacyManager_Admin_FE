import { Product } from "../productDisease/productDisease-response";

class Customer{
    id: string;
    fullName?: string;
    gender?: string;
    birthday?: Date = new Date();
    image?: string;
    status?: string;
}

class PaymentMethod{
    id: string;
    name: string;
    provider: string;
}

export class OrderResponse{
  id: string;
  orderDetails: OrderDetailsDTO[];
  customerId: string;
  ordererName: string;
  receiverName: string;
  recipientPhone: string;
  email: string;
  provinceOrCity: string;
  district: string;
  ward: string;
  addressDetails: string;
  totalDiscount: number;
  transportFee: number;
  totalAmount: number;
  finalAmount: number;
  note: string;
  orderDate: Date = new Date();
  status: string;
  paymentAmount: number;
  paymentDate: Date = new Date();
  paymentStatus: string;
  accountNumber: string;
  bankName: string;
  paymentMethodId: string;
  paymentMethod: PaymentMethod; 
  staffId: string;
  branchId: string;
  codeOrder: string;
  receiptDate: Date = new Date();
}

export class OrderDetailsDTO{
    orderId: string;
  shipmentDetailsId: string;
  shipmentDetails?: ShipmentDetailsDTO;
  unitId: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  status?: string;
}

export class ShipmentDetailsDTO{
    id: string;
    productId: string;
    product?: Product;
    unitId: string;
}