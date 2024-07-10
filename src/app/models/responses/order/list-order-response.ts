class Customer{
    fullName?: string;
    gender?: string;
    birthday?: Date;
    image?: string;
    status?: string;
}

class PaymentMethod{
    name: string;
    provider: string;
}

export class ListOrderResponse{
    id: string;
    customerId: string;
    customer: Customer;
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
    orderDate: Date;
    status: string;
    paymentAmount: number;
    paymentDate: Date;
    paymentStatus: string;
    accountNumber: string;
    bankName: string;
    paymentMethodId: string;
    paymentMethod: PaymentMethod;
    staffId: string;
    branchId: string;
    codeOrder: string;
    receiptDate: Date;
}