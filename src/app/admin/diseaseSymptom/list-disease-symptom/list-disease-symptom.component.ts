import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DiseaseSymptomService } from '../../../services/diseaseSymptom/disease-symptom.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { DeleteDiseaseSymptomComponent } from '../delete-disease-symptom/delete-disease-symptom.component';
import { DiseaseSymptomResponse, Symptom } from '../../../models/responses/diseaseSymptom/diseaseSympton-response';
import { CreateDiseaseSymptomComponent } from '../create-disease-symptom/create-disease-symptom.component';
import { Subject, Subscription } from 'rxjs';
import { DiseaseService } from '../../../services/disease/disease.service';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { DetailsSymptomRequest } from '../../../models/requests/symptom/get-details-symptom-request';
import { DetailsDiseaseRequest } from '../../../models/requests/disease/get-details-disease-request';

@Component({
  selector: 'ngx-list-disease-symptom',
  templateUrl: './list-disease-symptom.component.html',
  styleUrls: ['./list-disease-symptom.component.scss']
})
export class ListDiseaseSymptomComponent implements OnInit, AfterViewInit {
  //Tham chiếu ngược
  @ViewChild(CreateDiseaseSymptomComponent) childComponent!: CreateDiseaseSymptomComponent;

  //trả danh sách
  @Output() listCreate = new EventEmitter<string[]>() ;

  @Input() listName: string = 'quan hệ';
  @Input() id: string | undefined;
  @Input() link: number = 1;

  //Kiểm tra khởi tạo
  @Input() isCreate: boolean = false;

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name1" ,"code1"];
  allColumns = [...this.defaultColumns, 'actions'];
  
  size: string = 'medium';
  
  countItem = [];
  p: number = 1;
  pageSize: number = 4;
  totalItems: number;

  filteredList: DiseaseSymptomResponse[] = [] ;

  diseaseSymptom: DiseaseSymptomResponse = new  DiseaseSymptomResponse();
  Data: any[];
  source: LocalDataSource;
  
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
    private diseaseService: DiseaseService,
    private symptomService: SymptomService,
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
      this.source = new LocalDataSource();
    }
 

  filterList() {
    if (this.searchTerm) {
      this.Data = this.Data.filter(item =>
        item.name1.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.code1.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.applySort();
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
    this.updateDataSource();
  }



 loadDiseaseSymptomData(){
      if(this.isCreate == false){
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
      
          }));
        }
        
        //Số lượng phần tử
        this.countItem = Array.from({ length: this.Data.length }, (_, index) => index + 1);
        this.filterList();
        }else {
          this.toast.warningToast("Lỗi hệ thống", data.message);}
      },(error) => {
        this.toast.warningToast('Lấy thông tin thất bại', error);
      });
    }
    else 
      this.ngAfterViewInit();

  }

  checkSize(){
    if(this.link == 1){
      this.size = 'small';
      this.pageSize = 4;
    }
    else if (this.link == 2){
      this.pageSize = 10;
      this.size = 'medium';
    }
  }

  ngAfterViewInit(): void {
    if (this.childComponent && this.isCreate == true) {
      // Đăng ký sự kiện từ component con
      this.childComponent.dataOutput.subscribe(data => {
        this.onIsCreate(data);
      });
    }
    
  }

  ngOnInit(){
    this.checkSize();
    this.loadDiseaseSymptomData();
  }

  onCreate(): void {
    
    this.dialogService
      .open(CreateDiseaseSymptomComponent, {
        context: {
          link: this.link,
          id: this.id,
          listName: this.listName,
          isCreate: this.isCreate,
        }
      })
      .onClose.subscribe((result: any) => {
        if (result) {
          this.onIsCreate(result);
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
  

  changePage(page: number) {
    this.p = page;
    this.updateDataSource();
  }

  updateDataSource() {
    const startIndex = ((this.p-1) * this.pageSize);
    const endIndex = startIndex + this.pageSize;
    const page = this.Data.slice(startIndex, endIndex);
    this.source.load(page);
  }
  
  // Hàm xử lý sự kiện và dữ liệu từ component con
  onIsCreate(data?: string) {
    if (data) {
      let detailsRequest: DetailsSymptomRequest | DetailsDiseaseRequest;
  
      if (this.link == 1) {
        detailsRequest = { id: data } as DetailsSymptomRequest;
        
        this.symptomService.details(detailsRequest).subscribe(
          (response) => {
            if (response.code == 200) {
              const newRes = {
                id1: response.obj.id,
                name1: response.obj.name,
                code1: response.obj.codeSymptom,
              };
              this.Data.push(newRes);
  
              this.updateDataSource(); // Cập nhật dữ liệu nguồn cho bảng nếu cần
  
            } else if (response.code >= 400 && response.code < 500) {
              this.toast.warningToast("Thất bại", response.message);
            } else if (response.code === 500) {
              this.toast.dangerToast("Lỗi hệ thống", response.message);
            }
          },
          (error) => {
            this.toast.warningToast('Lấy thông tin thất bại', error);
          }
        );
      } else if (this.link == 2) {
        detailsRequest = { id: data } as DetailsDiseaseRequest;
  
        this.diseaseService.details(detailsRequest).subscribe(
          (response) => {
            if (response.code === 200) {
              const newRes = {
                id1: response.obj.id,
                name1: response.obj.name,
                code1: response.obj.codeDisease,
              };
              this.Data.push(newRes);
  
              this.updateDataSource(); // Cập nhật dữ liệu nguồn cho bảng nếu cần
  
            } else if (response.code >= 400 && response.code < 500) {
              this.toast.warningToast("Thất bại", response.message);
            } else if (response.code === 500) {
              this.toast.dangerToast("Lỗi hệ thống", response.message);
            }
          },
          (error) => {
            this.toast.warningToast('Lấy thông tin thất bại', error);
          }
        );
      }
  
      // Cập nhật số lượng phần tử và lọc danh sách sau khi dữ liệu được cập nhật
      this.countItem = Array.from({ length: this.Data.length }, (_, index) => index + 1);
      this.filterList();
  
      // Phát sự kiện cập nhật danh sách
      const createId = this.Data.map(item => item.id1);
      this.listCreate.emit(createId);
    }
  }
  
}
