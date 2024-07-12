import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DiseaseSymptomService } from '../../../services/diseaseSymptom/disease-symptom.service';
import { Toast } from '../../../helpers/toast';
import { LocalDataSource } from 'ng2-smart-table';
import { ListSymptomResponse } from '../../../models/responses/symptom/list-symptom-response';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { CreateDiseaseSymptomRequest } from '../../../models/requests/diseaseSymptom/create-disease-symptom-request';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-create-disease-symptom',
  templateUrl: './create-disease-symptom.component.html',
  styleUrls: ['./create-disease-symptom.component.scss']
})
export class CreateDiseaseSymptomComponent implements OnInit, OnDestroy{

  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete:false,
    },
    columns: {
      name:{
        title: 'Tên triệu chứng',
        type: 'string',
      },
      codeSymptom:{
        title: 'Mã triệu chứng',
        type:'string',
      }
    },
  };

  source: LocalDataSource;
  listSymptom: ListSymptomResponse[] = [];
  private symptomSubscription: Subscription;

  id: any;
  listName: string;

  diseaseSymptom = new CreateDiseaseSymptomRequest();

  constructor(
    protected ref: NbDialogRef<CreateDiseaseSymptomComponent>,
    private diseaseSymptomService: DiseaseSymptomService,
    private symptomService: SymptomService,
    private toast: Toast
  ) {
    this.source = new LocalDataSource();
  }

  ngOnDestroy(): void {
    if (this.symptomService) {
      this.symptomSubscription.unsubscribe;
    }
  }
  ngOnInit(): void {
    this.loadSymptomData();
  }

  loadSymptomData() {
    this.symptomSubscription = this.symptomService.getSymptom().subscribe((data: ResponseApi<ListSymptomResponse[]>)=>{
      if(data.code === 200){
        this.listSymptom = data.obj;
        this.source.load(this.listSymptom);
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }
  
  // Create
  create() {
    this.diseaseSymptomService.create(this.diseaseSymptom).subscribe(
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

  onRowSelect(event){
    this.diseaseSymptom.diseaseId = this.id;
    this.diseaseSymptom.symptomId = event.data.id;
  }
}
