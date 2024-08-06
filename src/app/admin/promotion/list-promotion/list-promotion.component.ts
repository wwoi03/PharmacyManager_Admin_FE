import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PromotionResponse } from '../../../models/responses/promotion/promotion-response';
import { PromotionService } from '../../../services/promotion/promotion.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { DeletePromotionComponent } from '../delete-promotion/delete-promotion.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ngx-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss']
})
export class ListPromotionComponent implements OnInit{

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
      name:{
        title: 'Tên khuyến mãi',
        type: 'string',
      },
      startDate:{
        title: 'Ngày áp dụng',
        type: 'string', // or 'date' if you prefer
        valuePrepareFunction: (date) => {
          return formatDate(date, 'dd/MM/yyyy', 'en-US');
        }
      },
      endDate:{
        title: 'Ngày kết thúc',
        type: 'string', // or 'date' if you prefer
        valuePrepareFunction: (date) => {
          return formatDate(date, 'dd/MM/yyyy', 'en-US');
        }
      },
      codePromotion:{
        title: 'Mã khuyến mãi',
        type:'string',
      },
    }
  };

  source: LocalDataSource;
  listPromotion: PromotionResponse[] = [];

  constructor(private promotionService: PromotionService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  loadPromotionData(){
    this.promotionService.getPromotions().subscribe((data: ResponseApi<PromotionResponse[]>)=>{
      if(data.code === 200){
        this.listPromotion = data.obj;
        this.source.load(this.listPromotion);
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }

  ngOnInit(){
    this.loadPromotionData();
  }

  onCreate(): void {
    this.router.navigate(['/admin/promotion/promotion-create']);
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
