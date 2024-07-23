import { ShipmentDetailsUnitResponse } from "../../responses/shipment-details-unit/shipment-details-unit-response";

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
  unitId: string;
  shipmentDetailsUnits: ShipmentDetailsUnitResponse[] = [];

  validationMessages = {
    "manufactureDate": {
        required: "Ngày sản xuất là bắt buộc."
    },
    "expirationDate": {
        required: "Ngày hết hạn là bắt buộc."
    },
    "importPrice": {
        required: "Giá nhập là bắt buộc là bắt buộc."
    },
    "quantity": {
        required: "Số lượng là bắt buộc là bắt buộc."
    },
    "productionBatch": {
        required: "Mã lỗ nhập là bắt buộc."
    },
  }
}
