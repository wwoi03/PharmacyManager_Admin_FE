import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DiseaseSymptomService } from '../../../services/diseaseSymptom/disease-symptom.service';
import { Toast } from '../../../helpers/toast';
import { DiseaseSymptomResponse } from '../../../models/responses/diseaseSymptom/diseaseSympton-response';

@Component({
  selector: 'ngx-delete-disease-symptom',
  templateUrl: './delete-disease-symptom.component.html',
  styleUrls: ['./delete-disease-symptom.component.scss']
})
export class DeleteDiseaseSymptomComponent {
  diseaseSymptom: DiseaseSymptomResponse;
  listName: string;
  link: number;
  
  constructor(
    protected ref: NbDialogRef<DeleteDiseaseSymptomComponent>,
    private diseaseSymptomService: DiseaseSymptomService,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    this.diseaseSymptomService.getLink(this.link);

    this.diseaseSymptomService.delete(this.diseaseSymptom.diseaseId, this.diseaseSymptom.symptomId).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
          this.ref.close(true);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.message);
        } else if (res.code === 500) {
          this.toast.dangerToast("Lỗi hệ thống", res.message);
        }
      },
    )
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
