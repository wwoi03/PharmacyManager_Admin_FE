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

  @Input() listName: string = 'quan hệ';
  @Input() id: string | undefined;
  @Input() link: number = 1;

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
        name1:{
        title: `Tên ${this.listName}`,
        type: 'string',},
        code1:{
          title: `Mã ${this.listName}`,
          type:'string',
        }
      
    }
    };

  source: LocalDataSource;
  listDiseaseSymptom: DiseaseSymptomResponse[] = [] ;
  diseaseSymptom: DiseaseSymptomResponse = new  DiseaseSymptomResponse();
  Data: any;
  
  

  constructor(private diseaseSymptomService: DiseaseSymptomService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
      this.source = new LocalDataSource();
  }

  loadDiseaseSymptomData(){
    this.diseaseSymptomService.getLink(this.link);

    this.diseaseSymptomService.getDiseaseSymptoms(this.id).subscribe((data: ResponseApi<DiseaseSymptomResponse[]>)=>{
      if(data.code === 200){
      this.listDiseaseSymptom = data.obj;

    //Kiểm tra đường dẫn
    if(this.link == 1){
      this.Data = this.listDiseaseSymptom.map(item => ({
        id1: item.symptom.id,
        name1: item.symptom.name,
        code1: item.symptom.codeSymptom,
  
        id2: item.disease.id,

        disease: item.disease,
        symptom: item.symptom,
        // diseaseName: item.disease.name,
        // codeDisease: item.disease.codeDisease,
  
      }));
    }
    
    else if(this.link == 2){
      this.Data = this.listDiseaseSymptom.map(item => ({
        id1: item.disease.id,
        name1: item.disease.name,
        code1: item.disease.codeDisease,
  
        id2: item.symptom.id,

        disease: item.disease,
        symptom: item.symptom,
        // diseaseName: item.disease.name,
        // codeDisease: item.disease.codeDisease,
  
      }));
    }

      this.source.load(this.Data);

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
          link: this.link,
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
    if(this.link == 1){
      this.router.navigate(['/admin/symptom/symptom-details', event.data.id1]);
    }
    else if(this.link == 2){
      this.router.navigate(['/admin/disease/disease-details', event.data.id1]);
    }
  }

  onDelete(event): void {
    this.diseaseSymptom.diseaseId = event.data.disease.id;
    this.diseaseSymptom.disease = event.data.disease;
    this.diseaseSymptom.symptomId = event.data.symptom.id;
    this.diseaseSymptom.symptom = event.data.symptom;
    
    this.dialogService
      .open(DeleteDiseaseSymptomComponent, {
        context: {
          link: this.link,
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
