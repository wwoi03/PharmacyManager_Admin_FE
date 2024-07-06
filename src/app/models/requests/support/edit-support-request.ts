export class EditSupportRequest {
    id: string;
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