import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OrderResponse } from '../../../models/responses/order/list-order-response';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { ActivatedRoute, Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { OrderStatus, OrderStatusDescriptions } from '../../../models/requests/order/edit-order-request';
import { OrderService } from '../../../services/order/order.service';
import { Util } from '../../../helpers/util';

@Component({
  selector: 'ngx-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent  implements OnDestroy, OnInit {

  @ViewChild('item', { static: true }) accordion;
  
  id: string;
  currentTheme: string;
  themeSubscription: any;
  order: OrderResponse;



  orderStatus: OrderStatus[] = [];
  orderStatusDescription: { [key: string]: string } = OrderStatusDescriptions;

  paymentName: string = '';

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
    private route: ActivatedRoute,
    private themeService: NbThemeService,
    private orderService: OrderService,
    private toast: Toast,
    public util: Util,
  ) {

    this.themeSubscription = this.themeService
      .getJsTheme()
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit(): void {
    this.loadData();
  }



  loadData(){
    //Lấy  id
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // Gọi service để lấy thông tin chi tiết bệnh
      this.orderService.details(this.id).subscribe(
        (response) =>  {
          if (response.code === 200){
            //Gán chi tiết đơn hàng
            this.order = response.obj;
            console.log(this.order)

            //Tên phương thức thanh toán
            this.paymentName = this.order.paymentMethod.name;
          } else {
            this.toast.warningToast('Lấy thông tin thất bại', response.message);
          }
        },
        (error) => {
          this.toast.warningToast('Lấy thông tin thất bại', error);
        }
      );
    }
    
    
    //Lấy danh sách trạng thái
    this.orderService.getStatuses().subscribe(
      (response) =>  {
        this.orderStatus = response.filter(status=> status !== OrderStatus.GetAll);
        this.orderStatusDescription[this.order.status];
      },
      (error) => {
        this.toast.warningToast('Lấy thông tin thất bại', error);
      }
    );
  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  // Xử lý thay 
  edit() {

    // Call API update 
    this.orderService.edit(this.id, this.stringToOrderStatus(this.order.status)).subscribe(
      (res) => {
        console.log('Response from server:', res);
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.message);
          this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
        }
      },
      (err) => {
        console.error('Error:', err);
        //console.error("Lỗi khi thêm", error);
        this.toast.warningToast("Lỗi hệ thống", "Lỗi hệ thống, vui lòng thử lại sau.");
      }
    );
  }

  stringToOrderStatus(status: string): OrderStatus | undefined {
    
    if (Object.values(OrderStatus).includes(status as OrderStatus)) {
      return status as OrderStatus;
    }
    return undefined;

  }

  // Xử lý sự kiển ẩn hiện 
  toggle() {
    this.accordion.toggle();
  }
}
