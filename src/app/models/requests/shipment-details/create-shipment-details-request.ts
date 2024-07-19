export class CreateShipmentDetailsRequest {
  productId: string;
  shipmentId: string;
  manufactureDate: Date = new Date();
  expirationDate: Date = new Date();
  importPrice: number;
  quantity: number;
  additionalInfo?: string; 
  note?: string;
  productionBatch: string;

  validationMessages = {
    
  }
}
