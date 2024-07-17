export class ProductSupportResponse{
    productId: string;
    product: Product;
    supportId: string;
    support: Support;
}

export class Product{
    id: string;
    name: string;
    codeMedicine: string;
    specifications?: string;
    shortDescription?: string;
    description?: string;
    uses?: string;
    howToUse?: string;
    sideEffects?: string;
    warning?: string;
    preserve?: string;
    dosage?: string;
    contraindication?: string;
    dosageForms?: string;
    registrationNumber?: string;
    brandOrigin?: string;
    ageOfUse?: string;
    view: number;
    cartView: number;
    categoryId?: string;
    //category: Category;
    image: string;
}

export class Support{
    id: string;
    name: string;
    description?: string; 
    codeSupport: string;
}