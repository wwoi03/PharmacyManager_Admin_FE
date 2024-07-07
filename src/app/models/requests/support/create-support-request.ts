export class CreateSupportRequest {
    name : string;
    description? :string;
    codeSupport : string;

    validationMessages = {
        name: {
          required: 'Tên hỗ trợ là bắt buộc.'
        },
        codeSupport: {
          required: 'Mã hỗ trợ là bắt buộc.'
        },
        description:{required: ''},
      };
}