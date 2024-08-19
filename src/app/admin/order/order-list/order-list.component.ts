import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { OrderResponse } from '../../../models/responses/order/list-order-response';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { OrderStatus, OrderStatusDescriptions } from '../../../models/requests/order/edit-order-request';

@Component({
  selector: 'ngx-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  
  @ViewChild('dialog', { static: true }) dialog: TemplateRef<any>;

  listOrderStatus: OrderStatus[] = [];
  orderStatus: OrderStatus;
  orderStatusDescription: { [key: string]: string } = OrderStatusDescriptions;

  
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: true,
      delete:false,
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
  listOrder: OrderResponse[] = [];
  

  constructor(private orderService: OrderService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  loadOrderData(){
    this.orderStatus;
    this.orderService.getOrders(this.orderStatus).subscribe((data: ResponseApi<OrderResponse[]>)=>{
      if(data.code === 200){
        this.listOrder = data.obj;
        this.source.load(this.listOrder);
      }else {
        this.toast.warningToast("Lỗi hệ thống", data.message);}
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }
  a:any;

  ngOnInit(){
    //Lấy danh sách trạng thái
    this.orderService.getStatuses().subscribe(
      (response) =>  {
        this.listOrderStatus = response;
        //Mặc định getAll
        this.orderStatus = OrderStatus.GetAll;
        this.orderStatusDescription[OrderStatus.GetAll];
        //Lấy danh sách
        this.loadOrderData();

      },
      (error) => {
        this.toast.warningToast('Lấy thông tin thất bại', error);
      }
    );
  }

  onCreate(event): void {
    this.router.navigate(['/admin/order/order-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/order/order-edit', event.data.id]);
  }
  

  onViewDetails(event): void{
    this.router.navigate(['/admin/order/order-details', event.data.id]);
  }

  stringToOrderStatus(status: string): OrderStatus | undefined {
    
    if (Object.values(OrderStatus).includes(status as OrderStatus)) {
      return status as OrderStatus;
    }
    return undefined;

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
