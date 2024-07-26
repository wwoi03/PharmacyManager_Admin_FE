export class CreateDiseaseRequest {
    name : string;
    description? :string;
    codeDisease : string;
    symptomId: string[];
    productId: string[];

    validationMessages = {
        name: {
          required: 'Tên bệnh là bắt buộc.'
        },
        codeDisease: {
          required: 'Mã bệnh là bắt buộc.'
        },
        description:{required: 'Yêu cầu mô tả về bệnh'},
      };
}