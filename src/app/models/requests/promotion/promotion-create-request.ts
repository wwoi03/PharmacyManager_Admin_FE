export class PromotionRequest{
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    discountType: string;
    discountValue: number;
    codePromotion: string;
    // Chọn product được giảm giá
    productPromotionRequest?: ProductPromotionRequest | null = null;

    validationMessages = {
        name: {
          required: 'Tên khuyến mãi là bắt buộc.'
        },
        startDate: {
          required: 'Ngày bắt đầu khuyến mãi là bắt buộc.'
        },
        endDate: {
            required: 'Ngày kết thúc khuyến mãi là bắt buộc.'
          },
          discountType: {
            required: 'Loại khuyến mãi là bắt buộc.'
          },
          discountValue: {
            required: 'Giá trị khuyến mãi là bắt buộc.'
          },
          codePromotion: {
            required: 'Mã khuyến mãi là bắt buộc.'
          },
        description:{required: 'Yêu cầu mô tả về khuyến mãi'},
      };
}

export class ProductPromotionRequest{
    productId?: string[]; // Assuming GUIDs are represented as strings
    additionalInfo: string;
    quantity: number;
    promotionProgramRequest?: PromotionProgramRequest | null;
}

export class PromotionProgramRequest{
    productId?: string[]; // Assuming GUIDs are represented as strings
    quantity: number;
}