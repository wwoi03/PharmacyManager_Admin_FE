import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-symptom-delete',
  templateUrl: './symptom-delete.component.html',
  styleUrls: ['./symptom-delete.component.scss']
})
export class SymptomDeleteComponent {
  symptom: any;

  constructor(
    protected ref: NbDialogRef<SymptomDeleteComponent>,
    private symptomService: SymptomService,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    
    this.symptomService.delete(this.symptom.id).subscribe(
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
