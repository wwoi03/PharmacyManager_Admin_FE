import { PromotionProgramRequest } from "../../requests/promotion/promotion-create-request";

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

//Class hiển thị
export class PromotionProducts{
    products: { id: string; productName: string; codeProduct: string }[];
    additionalInfo: string;
    quantity: number;
    promotionProgramRequest?: PromotionProgramRequest[] | null;
    // promotionProgram?: PromotionPrograms[] | null;
}
  
export class allProducts{
id: string;
productName: string; 
codeProduct: string;
quantity:number;
};

export class PromotionPrograms {
    products: { id: string; productName: string; codeProduct: string }[];
    quantity: number
}
