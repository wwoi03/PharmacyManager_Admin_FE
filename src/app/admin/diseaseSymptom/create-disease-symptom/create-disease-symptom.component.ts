import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DiseaseSymptomService } from '../../../services/diseaseSymptom/disease-symptom.service';
import { Toast } from '../../../helpers/toast';
import { LocalDataSource } from 'ng2-smart-table';
import { ListSymptomResponse } from '../../../models/responses/symptom/list-symptom-response';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { CreateDiseaseSymptomRequest } from '../../../models/requests/diseaseSymptom/create-disease-symptom-request';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { Subscription } from 'rxjs';
import { DiseaseService } from '../../../services/disease/disease.service';
import { listDiseaseResponse } from '../../../models/responses/disease/list-disease-response';

@Component({
  selector: 'ngx-create-disease-symptom',
  templateUrl: './create-disease-symptom.component.html',
  styleUrls: ['./create-disease-symptom.component.scss']
})
export class CreateDiseaseSymptomComponent implements OnInit, OnDestroy{

  id: any;
  listName: string = '';
  link: number;

  //Kiểm tra khởi tạo
  isCreate: boolean = false;
  //Id khởi tạo
  createId: string;

  //Truyền dữ liệu ra component cha
  @Output() dataOutput = new EventEmitter<string>();

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name" ,"code"];
  allColumns = [...this.defaultColumns];

  source: LocalDataSource;

  listSymptom: ListSymptomResponse[] = [];
  listDisease: listDiseaseResponse[]= [];
  Data: any;
  
  private subscription: Subscription;
  diseaseSymptom = new CreateDiseaseSymptomRequest();

  
  getColumnTitle(column: string): string {
    switch (column) {
      case 'name':
        return `Tên ${this.listName}`;
      case 'code':
        return `Mã ${this.listName}`;
      default:
        return '';
    }
  }

  constructor(
    protected ref: NbDialogRef<CreateDiseaseSymptomComponent>,
    private diseaseSymptomService: DiseaseSymptomService,
    private symptomService: SymptomService,
    private diseaseService: DiseaseService,
    private toast: Toast,
  ) {
    this.source = new LocalDataSource();
  }

  getLink(){
    if(this.link == 1){
      this.loadSymptomData();
    }
    else if(this.link == 2){
      this.loadDiseaseData();
    }
  }

  filterList() {
    if (!this.searchTerm) {
      this.getLink();
    } else {
      this.Data = this.Data.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  ngOnDestroy(): void {
    if(this.diseaseService || this.symptomService){
      this.subscription.unsubscribe;
    }
  }

  ngOnInit(): void {
    this.filterList();
  }

  loadSymptomData() {
    this.subscription = this.symptomService.getSymptom().subscribe((data: ResponseApi<ListSymptomResponse[]>)=>{
      if(data.code === 200){
        this.listSymptom = data.obj;
        
        this.Data = this.listSymptom.map(item => ({
          id: item.id,
          name: item.name,
          code: item.codeSymptom,
        }));
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }
  
  loadDiseaseData() {
    this.subscription = this.diseaseService.getDiseases().subscribe((data: ResponseApi<listDiseaseResponse[]>)=>{
      if(data.code === 200){
        this.listDisease = data.obj;

        this.Data = this.listDisease.map(item => ({
          id: item.id,
          name: item.name,
          code: item.codeDisease,
        }));
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }

  // Create
  create() {

    if(this.isCreate == true){
      this.dataOutput.emit(this.createId);
      this.ref.close(this.createId);
    }
    else{
      this.diseaseSymptomService.getLink(this.link);

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
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }

  onRowSelect(event?){
    if(this.link == 1){
      this.diseaseSymptom.diseaseId = this.id;
      this.diseaseSymptom.symptomId = event.id;
    }
    else if(this.link == 2){
      this.diseaseSymptom.symptomId = this.id;
      this.diseaseSymptom.diseaseId = event.id;
    }
    if(this.isCreate == true){
      this.createId = event.id;
    }
  }
}
