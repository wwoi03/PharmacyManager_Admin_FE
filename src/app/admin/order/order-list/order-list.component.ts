import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ListOrderResponse } from '../../../models/responses/order/list-order-response';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';

@Component({
  selector: 'ngx-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  
  @ViewChild('dialog', { static: true }) dialog: TemplateRef<any>;
  
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
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
      codeOrder:{
        title: 'Mã đơn hàng',
        type: 'string',
      },
      receiverName:{
        title: 'Tên người nhận',
        type: 'string',
      },
      addressDetails:{
        title: 'Địa chỉ',
        type:'string',
      },
      orderDate:{
        title: 'Ngày đặt',
        type:'date',
      },
      receiptDate:{
        title: 'Ngày giao',
        type:'date',
      },
      status:{
        title: 'Trạng thái đơn hàng',
        type:'string',
      },
      recipientPhone:{
        title: 'SDT người nhận',
        type:'string',
      }
    }
  };

  source: LocalDataSource;
  listOrder: ListOrderResponse[] = [];
  

  constructor(private orderService: OrderService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  loadOrderData(){
    this.orderService.getOrders().subscribe((data: ResponseApi<ListOrderResponse[]>)=>{
      if(data.code === 200){
        this.listOrder = data.obj;
        this.source.load(this.listOrder);
      }else {
        this.toast.warningToast("Lỗi hệ thống", data.message);}
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }

  ngOnInit(){
    this.loadOrderData();
  }

  onCreate(event): void {
    this.router.navigate(['/admin/order/order-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/order/order-edit', event.data.id]);
  }
  

  onRowSelect(event): void{
    this.router.navigate(['/admin/order/order-details', event.data.id]);
  }

  // onDelete(event): void {
  //   const order: ListOrderResponse = event.data;
    
  //   this.dialogService
  //     .open(OrderDeleteComponent, {
  //       context: {
  //         order: order
  //       }
  //     })
  //     .onClose.subscribe((isSubmit: boolean) => {
  //       if (isSubmit) {
  //         this.loadOrderData();
  //       }
  //     });
  // }

}
