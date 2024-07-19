export class ListShipmentDetailsResponse {
  shipmentDetailsId: string;
  productName: string;
  productImage: string = "";
  manufactureDate: Date;
  expirationDate: Date;
  importPrice: number;
  quantity: number;
  sold: number;
}