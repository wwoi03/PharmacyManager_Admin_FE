export class CreateSymptomRequest {
    name : string;
    description? :string;
    codeSymptom : string;

    validationMessages = {
        name: {
          required: 'Tên triệu chứng là bắt buộc.'
        },
        codeSymptom: {
          required: 'Mã triệu chứng là bắt buộc.'
        },
        description:{required: ''},
      };
}