import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DiseaseSymptomService } from '../../../services/diseaseSymptom/disease-symptom.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { DeleteDiseaseSymptomComponent } from '../delete-disease-symptom/delete-disease-symptom.component';
import { DiseaseSymptomResponse, Symptom } from '../../../models/responses/diseaseSymptom/diseaseSympton-response';
import { CreateDiseaseSymptomComponent } from '../create-disease-symptom/create-disease-symptom.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-list-disease-symptom',
  templateUrl: './list-disease-symptom.component.html',
  styleUrls: ['./list-disease-symptom.component.scss']
})
export class ListDiseaseSymptomComponent {
  @ViewChild('dialog', { static: true }) dialog: TemplateRef<any>;


  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Phương thức',
      add: true,
      edit: false,
      delete:true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
        symptomName:{
        title: 'Tên triệu chứng',
        type: 'string',},
        codeSymptom:{
          title: 'Mã triệu chứng',
          type:'string',
        }
      
    }
    };

  source: LocalDataSource;
  listDisease: DiseaseSymptomResponse[] = [] ;
  diseaseSymptom: DiseaseSymptomResponse = new  DiseaseSymptomResponse();
  
  @Input() listName: string = '';
  @Input() id: string | undefined;

  constructor(private diseaseSymptomService: DiseaseSymptomService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
      this.source = new LocalDataSource();
  }

  loadDiseaseSymptomData(){
    this.diseaseSymptomService.getDiseaseSymptoms(this.id).subscribe((data: ResponseApi<DiseaseSymptomResponse[]>)=>{
      if(data.code === 200){
      this.listDisease = data.obj;

    let symptomData = this.listDisease.map(item => ({
      symptomId: item.symptom.id,
      symptomName: item.symptom.name,
      codeSymptom: item.symptom.codeSymptom,
      symptom: item.symptom,

      diseaseId: item.disease.id,
      disease: item.disease,
      // diseaseName: item.disease.name,
      // codeDisease: item.disease.codeDisease,

    }));

      this.source.load(symptomData);
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });
  }

  ngOnInit(){
    this.loadDiseaseSymptomData();
  }

  onCreate(): void {
    
    this.dialogService
      .open(CreateDiseaseSymptomComponent, {
        context: {
          id: this.id,
          listName: this.listName
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadDiseaseSymptomData();
        }
      });
  
  }

  onRowSelect(event): void{
    this.router.navigate(['/admin/symptom/symptom-details', event.data.symptomId]);
  }

  onDelete(event): void {
    this.diseaseSymptom.diseaseId = event.data.diseaseId;
    this.diseaseSymptom.disease = event.data.disease;
    this.diseaseSymptom.symptomId = event.data.symptomId;
    this.diseaseSymptom.symptom = event.data.symptom;
    
    this.dialogService
      .open(DeleteDiseaseSymptomComponent, {
        context: {
          diseaseSymptom: this.diseaseSymptom,
          listName: this.listName
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadDiseaseSymptomData();
        }
      });
  }
  
}
