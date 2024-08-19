import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ListSupportResponse } from '../../../models/responses/support/list-support-response';
import { Subscription } from 'rxjs';
import { CreateProductSupportRequest } from '../../../models/requests/productSupport/create-product-support-request';
import { NbDialogRef } from '@nebular/theme';
import { ProductSupportService } from '../../../services/productSupport/product-support.service';
import { SupportService } from '../../../services/support/support.service';
import { Toast } from '../../../helpers/toast';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { ProductService } from '../../../services/product/product.service';
import { ListProductResponse } from '../../../models/responses/product/list-product-response';

class Data{
  id:string;
  name:string;
  code:string;
}

@Component({
  selector: 'ngx-create-product-support',
  templateUrl: './create-product-support.component.html',
  styleUrls: ['./create-product-support.component.scss']
})

export class CreateProductSupportComponent implements OnInit, OnDestroy{

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
  listSupport: ListSupportResponse[]= [];
  Data: Data[] = [];
  
  private subscription: Subscription;
  productSupport = new CreateProductSupportRequest();

  
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
    protected ref: NbDialogRef<CreateProductSupportComponent>,
    private productSupportService: ProductSupportService,
    private productService: ProductService,
    private supportService: SupportService,
    private toast: Toast
  ) {
    this.source = new LocalDataSource();
  }

  getLink(){
    if(this.link == 1){
      this.loadSupportData();
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
  if(this.supportService || this.productService){
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
          name: item.productName,
          code: item.codeMedicine,
        }));
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }
  
  loadSupportData() {
    this.subscription = this.supportService.getSupports().subscribe((data: ResponseApi<ListSupportResponse[]>)=>{
      if(data.code === 200){
        this.listSupport = data.obj;

        this.Data = this.listSupport.map(item => ({
          id: item.id,
          name: item.name,
          code: item.codeSupport,
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
      this.productSupportService.getLink(this.link);

      this.productSupportService.create(this.productSupport).subscribe(
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
      this.productSupport.supportId = this.id;
      this.productSupport.productId = event.id;
    }
    else if(this.link == 2){
      this.productSupport.productId = this.id;
      this.productSupport.supportId = event.id;
    }
    if(this.isCreate == true){
      this.createId = event.id;
    }
  }
}
