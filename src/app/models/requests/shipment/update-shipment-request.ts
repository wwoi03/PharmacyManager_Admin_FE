export class UpdateShipmentRequest {
    shipmentId: string
    codeShipment: string;
    importDate: Date = new Date();
    note: string;
    status: string;
    supplierId: string;  
    branchId?: string;  

    validationMessages = {
        "note": {
            required: "Ghi chú là bắt buộc."
        },
        "status": {
            required: "Trạng thái là bắt buộc."
        },
        "supplierId": {
            required: "Nhà cung cấp là bắt buộc."
        },
        "codeShipment": {
            required: "Mã nhập kho là bắt buộc."
        },
        "importDate": {
            required: "Ngày nhập kho là bắt buộc."
        },
        "codeSupplier": {
            required: "Nhà cung cấp là bắt buộc."
        },
    }
}