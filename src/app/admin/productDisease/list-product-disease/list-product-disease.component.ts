import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductDiseaseResponse } from '../../../models/responses/productDisease/productDisease-response';
import { ProductDiseaseService } from '../../../services/productDisease/product-disease.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { DeleteProductDiseaseComponent } from '../delete-product-disease/delete-product-disease.component';
import { CreateProductDiseaseComponent } from '../create-product-disease/create-product-disease.component';

@Component({
  selector: 'ngx-list-product-disease',
  templateUrl: './list-product-disease.component.html',
  styleUrls: ['./list-product-disease.component.scss']
})
export class ListProductDiseaseComponent {

  @Input() listName: string = 'quan hệ';
  @Input() id: string | undefined;
  @Input() link: number = 1;

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

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
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
      this.source = new LocalDataSource();
  }

  filterList() {
    if (!this.searchTerm) {
      this.loadProductDiseaseData();
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


  loadProductDiseaseData(){
    this.productDiseaseService.getLink(this.link);

    this.productDiseaseService.getProductDiseases(this.id).subscribe((data: ResponseApi<ProductDiseaseResponse[]>)=>{
      if(data.code === 200){
      this.filteredList = data.obj;

    //Kiểm tra đường dẫn
    if(this.link == 1){
      this.Data = this.filteredList.map(item => ({

        id1: item.product.id,
        name1: item.product.name,
        code1: item.product.codeMedicine,
  
        id2: item.disease.id,

        disease: item.disease,
        product: item.product,
  
      }));
    }
    
    else if(this.link == 2){
      this.Data = this.filteredList.map(item => ({
        id1: item.disease.id,
        name1: item.disease.name,
        code1: item.disease.codeDisease,
  
        id2: item.product.id,

        disease: item.disease,
        product: item.product,
  
      }));
    }

    //Sắp xếp sau khi tải xong
    this.filterList();
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });
  }

  ngOnInit(){
    this.loadProductDiseaseData();
  }

  onCreate(): void {
    
    this.dialogService
      .open(CreateProductDiseaseComponent, {
        context: {
          link: this.link,
          id: this.id,
          listName: this.listName
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
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
  
}
