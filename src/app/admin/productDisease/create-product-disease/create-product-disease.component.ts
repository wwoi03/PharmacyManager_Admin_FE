import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { listDiseaseResponse } from '../../../models/responses/disease/list-disease-response';
import { Subscription } from 'rxjs';
import { CreateProductDiseaseRequest } from '../../../models/requests/productDisease/create-product-disease-request';
import { NbDialogRef } from '@nebular/theme';
import { ProductDiseaseService } from '../../../services/productDisease/product-disease.service';
import { DiseaseService } from '../../../services/disease/disease.service';
import { Toast } from '../../../helpers/toast';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { ListProductResponse } from '../../../models/responses/product/list-product-response';
import { ProductService } from '../../../services/product/product.service';

class Data{
  id:string;
  name:string;
  code:string;
}

@Component({
  selector: 'ngx-create-product-disease',
  templateUrl: './create-product-disease.component.html',
  styleUrls: ['./create-product-disease.component.scss']
})

export class CreateProductDiseaseComponent implements OnInit, OnDestroy{

  id: any;
  listName: string = '';
  link: number;

  //Kiểm tra khởi tạo
  isCreate: boolean = false;
  //Id khởi tạo
  createId: string;

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name" ,"code"];
  allColumns = [...this.defaultColumns];

  source: LocalDataSource;

  listProduct: ListProductResponse[] = [];
  listDisease: listDiseaseResponse[]= [];
  Data: Data[] = [];
  
  private subscription: Subscription;
  productDisease = new CreateProductDiseaseRequest();

  
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
    protected ref: NbDialogRef<CreateProductDiseaseComponent>,
    private productDiseaseService: ProductDiseaseService,
    private productService: ProductService,
    private diseaseService: DiseaseService,
    private toast: Toast
  ) {
    this.source = new LocalDataSource();
  }

  getLink(){
    if(this.link == 1){
      this.loadDiseaseData();
    }
    else if(this.link == 2){
      this.loadProductData();
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
    if(this.diseaseService || this.productService ){
      this.subscription.unsubscribe;
    }
  }

  ngOnInit(): void {
    this.filterList();
  }

  loadProductData() {
    this.subscription = this.productService.getProducts().subscribe((data: ResponseApi<ListProductResponse[]>)=>{
      if(data.code === 200){
        this.listProduct = data.obj;
        
        this.Data = this.listProduct.map(item => ({
          id: item.id,
          name: item.codeMedicine,
          code: item.codeMedicine,
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
      this.ref.close(this.createId);
    }
    else{
      this.productDiseaseService.getLink(this.link);

      this.productDiseaseService.create(this.productDisease).subscribe(
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

  onRowSelect(event){
    if(this.link == 1){
      this.productDisease.diseaseId = this.id;
      this.productDisease.productId = event.id;
    }
    else if(this.link == 2){
      this.productDisease.productId = this.id;
      this.productDisease.diseaseId = event.id;
    }
    if(this.isCreate == true){
      this.createId = event.id;
    }
    
  }
}
