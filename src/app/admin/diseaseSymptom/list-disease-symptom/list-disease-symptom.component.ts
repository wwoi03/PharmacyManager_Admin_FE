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

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name1" ,"code1"];
  allColumns = [...this.defaultColumns, 'actions'];

  source: LocalDataSource;
  filteredList: DiseaseSymptomResponse[] = [] ;

  diseaseSymptom: DiseaseSymptomResponse = new  DiseaseSymptomResponse();
  Data: any;
  
  
  getColumnTitle(column: string): string {
    switch (column) {
      case 'name1':
        return `Tên ${this.listName}`;
      case 'code1':
        return `Mã ${this.listName}`;
      case 'actions':
        return 'Quản lý';
      default:
        return '';
    }
  }

  constructor(private diseaseSymptomService: DiseaseSymptomService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
      this.source = new LocalDataSource();
  }

  filterList() {
    if (!this.searchTerm) {
      this.loadDiseaseSymptomData();
    } else {
      this.Data = this.Data.filter(item =>
        item.name1.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.code1.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.sortColumn("name");
  }

  sortColumn(column: string) {
    if (this.sortSelected === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortSelected = column;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }

  applySort() {
    if (this.sortDirection === 'asc') {
      this.Data.sort((a, b) => (a[this.sortSelected] > b[this.sortSelected]) ? 1 : ((b[this.sortSelected] > a[this.sortSelected]) ? -1 : 0));
    } else {
      this.Data.sort((a, b) => (a[this.sortSelected] < b[this.sortSelected]) ? 1 : ((b[this.sortSelected] < a[this.sortSelected]) ? -1 : 0));
    }
    this.source.load(this.Data);
  }


  loadDiseaseSymptomData(){
    this.diseaseSymptomService.getLink(this.link);

    this.diseaseSymptomService.getDiseaseSymptoms(this.id).subscribe((data: ResponseApi<DiseaseSymptomResponse[]>)=>{
      if(data.code === 200){
      this.filteredList = data.obj;

    //Kiểm tra đường dẫn
    if(this.link == 1){
      this.Data = this.filteredList.map(item => ({
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
      this.Data = this.filteredList.map(item => ({
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
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });
  }

  ngOnInit(){
    this.filterList();
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

  onViewDetails(event): void{
    if(this.link == 1){
      this.router.navigate(['/admin/symptom/symptom-details', event.id1]);
    }
    else if(this.link == 2){
      this.router.navigate(['/admin/disease/disease-details', event.id1]);
    }
  }

  onDelete(event): void {
    this.diseaseSymptom.diseaseId = event.disease.id;
    this.diseaseSymptom.disease = event.disease;
    this.diseaseSymptom.symptomId = event.symptom.id;
    this.diseaseSymptom.symptom = event.symptom;
    
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
