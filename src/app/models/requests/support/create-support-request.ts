export class CreateSupportRequest {
    name : string;
    description? :string;
    codeSupport : string;
    productId: string[];

    validationMessages = {
        name: {
          required: 'Tên hỗ trợ là bắt buộc.'
        },
        codeSupport: {
          required: 'Mã hỗ trợ là bắt buộc.'
        },
        description:{required: 'Mô tả hỗ trợ là bắt buộc'},
      };
}