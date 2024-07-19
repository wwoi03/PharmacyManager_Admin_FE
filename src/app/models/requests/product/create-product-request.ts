export class CreateProductRequest {
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
  categoryId?: string;
  image: string;
  images?: string[];
  productIngredients?: string[];
  productSupports?: string[];
  productDiseases?: string[];

  validationMessages = {
    
  }
}
