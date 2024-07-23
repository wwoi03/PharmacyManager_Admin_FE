export class CreateProductSupportRequest {
    supportId : string;
    productId : string;

    validationMessages = {
        supportId: {
          required: 'Vui lòng chọn hỗ trợ.'
        },
        productId: {
          required: 'Vui lòng chọn sản phẩm.'
        }
      };
}