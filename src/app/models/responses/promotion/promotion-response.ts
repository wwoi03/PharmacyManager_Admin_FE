export class PromotionResponse {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    discountType: string;
    discountValue: number;
    codePromotion: string;

    productPromotions?: ProductPromotionResponse[];
}

export class ProductPromotionResponse{
    id: string;
    productId: string;
    promotionId: string;
    additionalInfo: string;
    quantity: number;
    
    //Khuyến mãi
    productName: string;
    codeProduct: string;
    promotionPrograms?: PromotionProgramResponse[];
}

export class PromotionProgramResponse{
    promotionProductId: string;
    productId: string;
    quantity: number;

    //Khuyến mãi
    productName: string;
    codeProduct: string;
}
