export class ProductDiseaseResponse{
    productId: string;
    product: Product;
    diseaseId: string;
    disease: Disease;
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

export class Disease{
    id: string;
    name: string;
    description?: string; 
    codeDisease: string;
}