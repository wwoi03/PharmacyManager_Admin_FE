import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DiseaseService } from '../../../services/disease/disease.service';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-disease-delete',
  templateUrl: './disease-delete.component.html',
  styleUrls: ['./disease-delete.component.scss']
})
export class DiseaseDeleteComponent {
  disease: any;

  constructor(
    protected ref: NbDialogRef<DiseaseDeleteComponent>,
    private diseaseService: DiseaseService,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    
    this.diseaseService.delete(this.disease.id).subscribe(
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
