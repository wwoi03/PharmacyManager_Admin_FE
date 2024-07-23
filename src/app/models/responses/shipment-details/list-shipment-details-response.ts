export class ListShipmentDetailsResponse {
  shipmentDetailsId: string;
  productName: string;
  productImage: string = "";
  manufactureDate: Date = new Date();
  expirationDate: Date = new Date();
  importPrice: number;
  quantity: number;
  sold: number;
}