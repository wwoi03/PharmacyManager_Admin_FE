export class CreateProductDiseaseRequest {
    diseaseId : string;
    productId : string;

    validationMessages = {
        diseaseId: {
          required: 'Vui lòng chọn bệnh.'
        },
        productId: {
          required: 'Vui lòng chọn sản phẩm.'
        }
      };
}