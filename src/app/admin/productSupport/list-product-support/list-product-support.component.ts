import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductSupportResponse } from '../../../models/responses/productSupport/productSupport-response';
import { ProductSupportService } from '../../../services/productSupport/product-support.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { DeleteProductSupportComponent } from '../delete-product-support/delete-product-support.component';
import { CreateProductSupportComponent } from '../create-product-support/create-product-support.component';

@Component({
  selector: 'ngx-list-product-support',
  templateUrl: './list-product-support.component.html',
  styleUrls: ['./list-product-support.component.scss']
})
export class ListProductSupportComponent {

  @Input() listName: string = 'quan hệ';
  @Input() id: string | undefined;
  @Input() link: number = 1;

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name1" ,"code1"];
  allColumns = [...this.defaultColumns, 'actions'];

  source: LocalDataSource;
  filteredList: ProductSupportResponse[] = [] ;

  productSupport: ProductSupportResponse = new  ProductSupportResponse();
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

  constructor(private productSupportService: ProductSupportService, 
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
    this.source.load(this.Data);
  }


  loadProductSupportData(){
    this.productSupportService.getLink(this.link);

    this.productSupportService.getProductSupports(this.id).subscribe((data: ResponseApi<ProductSupportResponse[]>)=>{
      if(data.code === 200){
      this.filteredList = data.obj;

    //Kiểm tra đường dẫn
    if(this.link == 1){
      this.Data = this.filteredList.map(item => ({

        id1: item.product.id,
        name1: item.product.name,
        code1: item.product.codeMedicine,
  
        id2: item.support.id,

        support: item.support,
        product: item.product,
  
      }));
    }
    
    else if(this.link == 2){
      this.Data = this.filteredList.map(item => ({
        id1: item.support.id,
        name1: item.support.name,
        code1: item.support.codeSupport,
  
        id2: item.product.id,

        support: item.support,
        product: item.product,
  
      }));
    }

    this.filterList();
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });
  }

  ngOnInit(){
    this.loadProductSupportData();
  }

  onCreate(): void {
    
    this.dialogService
      .open(CreateProductSupportComponent, {
        context: {
          link: this.link,
          id: this.id,
          listName: this.listName
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadProductSupportData();
        }
      });
  }

  onViewDetails(event): void{
    if(this.link == 1){
      this.router.navigate(['/admin/product/product-details', event.id1]);
    }
    else if(this.link == 2){
      this.router.navigate(['/admin/support/support-details', event.id1]);
    }
  }

  onDelete(event): void {
    this.productSupport.supportId = event.support.id;
    this.productSupport.support = event.support;
    this.productSupport.productId = event.product.id;
    this.productSupport.product = event.product;
    
    this.dialogService
      .open(DeleteProductSupportComponent, {
        context: {
          link: this.link,
          productSupport: this.productSupport,
          listName: this.listName
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadProductSupportData();
        }
      });
  }
  
}
