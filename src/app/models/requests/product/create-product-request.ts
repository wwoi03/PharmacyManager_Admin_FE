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
  image?: string;
  images?: string[] = [];
  productIngredients?: string[];
  productSupports?: string[];
  productDiseases?: string[];

  validationMessages = {
    "name": {
      required: "Tên sản phẩm là bắt buộc.",
    },
    "codeMedicine": {
      required: "Mã sản phẩm là bắt buộc.",
    },
    "specifications": {
      required: "Quy cách là bắt buộc.",
    },
    "dosage": {
      required: "Liều lượng là bắt buộc.",
    },
    "contraindication": {
      required: "Chống chỉ định là bắt buộc.",
    },
    "dosageForms": {
      required: "Dạng bào chế là bắt buộc.",
    },
    "registrationNumber": {
      required: "Số đăng ký là bắt buộc.",
    },
    "brandOrigin": {
      required: "Thương hiệu là bắt buộc.",
    },
    "ageOfUse": {
      required: "Độ tuổi sử dụng là bắt buộc.",
    },
    "shortDescription": {
      required: "Mô tả ngắn là bắt buộc.",
    },
  };
}
