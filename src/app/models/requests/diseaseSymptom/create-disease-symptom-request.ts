export class CreateDiseaseSymptomRequest {
    diseaseId : string;
    symptomId : string;

    validationMessages = {
        diseaseId: {
          required: 'Vui lòng chọn bệnh.'
        },
        symptomId: {
          required: 'Vui lòng chọn triệu chứng.'
        }
      };
}