import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductPromotionResponse } from '../../../models/responses/promotion/promotion-response';
import { PromotionService } from '../../../services/promotion/promotion.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-list-promotion-product',
  templateUrl: './list-promotion-product.component.html',
  styleUrls: ['./list-promotion-product.component.scss']
})
export class ListPromotionProductComponent implements OnInit{

  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: false,
      delete:true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      productName:{
        title: 'Tên sản phẩm khuyến mãi',
        type: 'string',
      },
      codeProduct:{
        title: 'Mã khuyến mãi',
        type:'string',
      },
      quantity:{
        title: 'Số lượng',
        type:'number',
      }
    }
  };

  source: LocalDataSource;
  @Input() listPromotionProduct: ProductPromotionResponse[] = [];

  //Gọi hàm hiển thị
  showCreatePromotionProduct: boolean = false; 

  constructor(private promotionService: PromotionService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  


  ngOnInit(){
    this.source.load(this.listPromotionProduct);
  }

  //child PromotionProduct hehe
  onCreate(): void {
    // this.router.navigate(['/admin/promotion/promotion-create']);
    this.showCreatePromotionProduct = !this.showCreatePromotionProduct
  }

  onEdit(event): void{
    this.router.navigate(['/admin/promotion/promotion-edit', event.data.id]);
  }
  

  onViewDetails(event): void{
    this.router.navigate(['/admin/promotion/promotion-details', event.data.id]);
  }

  onDelete(event): void {
    // const promotion: PromotionResponse = event.data;
    
    // this.dialogService
    //   .open(DeletePromotionComponent, {
    //     context: {
    //       promotion: promotion
    //     }
    //   })
    //   .onClose.subscribe((isSubmit: boolean) => {
    //     if (isSubmit) {
    //       this.loadPromotionData();
    //     }
    //   });
  }

  
}

