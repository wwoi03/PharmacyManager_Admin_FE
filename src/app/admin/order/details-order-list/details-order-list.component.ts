import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { OrderStatus } from '../../../models/requests/order/edit-order-request';
import { OrderDetailsDTO } from '../../../models/responses/order/list-order-response';
import { LocalDataSource } from 'ng2-smart-table';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-details-order-list',
  templateUrl: './details-order-list.component.html',
  styleUrls: ['./details-order-list.component.scss']
})
export class DetailsOrderListComponent implements OnInit,  OnChanges {

  
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
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
      codeMedicine: {
        title: 'Mã sản phẩm',
        type: 'string',
      },
      productName: {
        title: 'Tên sản phẩm',
        type: 'string',
      },
      pricePerUnit:{
        title: 'Giá sản phẩm',
        type: 'string',
      },
      quantity:{
        title: 'Số lượng',
        type: 'string',
      },
      totalPrice:{
        title: 'Tổng tiền',
        type:'string',
      },
    }
  };

  @Input() listOrderDetails: OrderDetailsDTO[] =[];

  source: LocalDataSource;
  

  constructor(private orderService: OrderService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listOrderDetails && this.listOrderDetails) {
      console.log('Data received from parent:', this.listOrderDetails);
      this.source.load(this.listOrderDetails);
    }
  }

  loadOrderData(){
    const tmp = this.listOrderDetails.map(orderDetails => {
      return {
        codeMedicine: orderDetails.shipmentDetails?.product?.codeMedicine || 'N/A',
        productName: orderDetails.shipmentDetails?.product?.name || 'N/A',
        pricePerUnit: orderDetails.pricePerUnit,
        quantity: orderDetails.quantity,
        totalPrice: orderDetails.totalPrice,
      };
    });

    this.source.load(tmp);

    console.log('hehe',tmp)
  }

  ngOnInit(){
    this.loadOrderData();
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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

