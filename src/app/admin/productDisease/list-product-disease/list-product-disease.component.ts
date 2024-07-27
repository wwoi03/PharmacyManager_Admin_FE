import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductDiseaseResponse } from '../../../models/responses/productDisease/productDisease-response';
import { ProductDiseaseService } from '../../../services/productDisease/product-disease.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { DeleteProductDiseaseComponent } from '../delete-product-disease/delete-product-disease.component';
import { CreateProductDiseaseComponent } from '../create-product-disease/create-product-disease.component';
import { DetailsDiseaseRequest } from '../../../models/requests/disease/get-details-disease-request';
import { DiseaseService } from '../../../services/disease/disease.service';

@Component({
  selector: 'ngx-list-product-disease',
  templateUrl: './list-product-disease.component.html',
  styleUrls: ['./list-product-disease.component.scss']
})
export class ListProductDiseaseComponent {

  //trả danh sách cho component cha
  @Output() listCreate = new EventEmitter<string[]>() ;
  //Kiểm tra khởi tạo
  @Input() isCreate: boolean = false;
  
  @Input() listName: string = 'quan hệ';
  @Input() id: string | undefined;
  @Input() link: number = 1;

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  p: number = 1;
  pageSize: number = 4;
  totalItems: number;
  countItem = [];

  size: string = 'medium';

  defaultColumns = ["name1" ,"code1"];
  allColumns = [...this.defaultColumns, 'actions'];

  source: LocalDataSource;
  filteredList: ProductDiseaseResponse[] = [] ;

  productDisease: ProductDiseaseResponse = new  ProductDiseaseResponse();
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

  constructor(private productDiseaseService: ProductDiseaseService, 
    private diseaseService: DiseaseService,
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


  loadProductDiseaseData(){
    if(this.isCreate == false){
          this.productDiseaseService.getLink(this.link);

          this.productDiseaseService.getProductDiseases(this.id).subscribe((data: ResponseApi<ProductDiseaseResponse[]>)=>{
            if(data.code === 200){
            this.filteredList = data.obj;

          //Kiểm tra đường dẫn
          if(this.link == 1){
            this.Data = this.filteredList.map(item => ({
              id1: item.disease.id,
              name1: item.disease.name,
              code1: item.disease.codeDisease,
        
              id2: item.product.id,

              disease: item.disease,
              product: item.product,
        
            }));
          }
          
          else if(this.link == 2){
            this.Data = this.filteredList.map(item => ({

              id1: item.product.id,
              name1: item.product.name,
              code1: item.product.codeMedicine,
        
              id2: item.disease.id,

              disease: item.disease,
              product: item.product,
        
            }));
          }
          this.filterList();
          //Số lượng phần tử
          this.countItem = Array.from({ length: this.Data.length }, (_, index) => index + 1);
          
          }else {
            this.toast.warningToast("Lỗi hệ thống", data.message);}
        },(error) => {
          this.toast.warningToast('Lấy thông tin thất bại', error);
        });
      }
      else
      this.onIsCreate();
  }


  checkSize(){
    if(this.link == 1){
      this.size = 'medium';
      this.pageSize = 10;
    }
    else if (this.link == 2){
      this.pageSize = 4;
      this.size = 'small';
    }
  }

  ngOnInit(){
    this.checkSize();
    this.loadProductDiseaseData();
  }

  onCreate(): void {
    
    this.dialogService
      .open(CreateProductDiseaseComponent, {
        context: {
          link: this.link,
          id: this.id,
          listName: this.listName,
          isCreate: this.isCreate,
        }
      })
      .onClose.subscribe((result: any) => {
        if (result) {
          if(this.isCreate)
            this.onIsCreate(result);
          this.loadProductDiseaseData();
        }
      });
  }

  onViewDetails(event): void{
    if(this.link == 1){
      this.router.navigate(['/admin/product/product-details', event.id1]);
    }
    else if(this.link == 2){
      this.router.navigate(['/admin/disease/disease-details', event.id1]);
    }
  }

  onDelete(event): void {

    if(this.isCreate == false){
      this.productDisease.diseaseId = event.disease.id;
      this.productDisease.disease = event.disease;
      this.productDisease.productId = event.product.id;
      this.productDisease.product = event.product;
      
      this.dialogService
        .open(DeleteProductDiseaseComponent, {
          context: {
            link: this.link,
            productDisease: this.productDisease,
            listName: this.listName
          }
        })
        .onClose.subscribe((isSubmit: boolean) => {
          if (isSubmit) {
            this.loadProductDiseaseData();
          }
        });
      }
      else{
        this.Data = this.Data.filter(item => item !== event);
        this.onIsCreate();
      }
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
      let detailsRequest: string | DetailsDiseaseRequest;
  
      //Thêm quan hệ phía product -> disease
      if (this.link == 1) {
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
               // Phát sự kiện cập nhật danh sách
              const createId = this.Data.map(item => item.id1);
              this.listCreate.emit(createId);
              this.filterList(); 
  
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
        this.loadProductDiseaseData();
      }
      
      // Cập nhật số lượng phần tử và lọc danh sách sau khi dữ liệu được cập nhật
      this.countItem = Array.from({ length: this.Data.length }, (_, index) => index + 1);
      this.filterList();  
    }
  }
}
