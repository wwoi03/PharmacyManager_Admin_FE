import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PromotionProgramRequest } from '../../../models/requests/promotion/promotion-create-request';
import { PromotionService } from '../../../services/promotion/promotion.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import {  allProducts, PromotionPrograms } from '../../../models/responses/promotion/promotion-response';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreatePromotionProgramComponent } from '../create-promotion-program/create-promotion-program.component';
import { DeletePromotionProgramComponent } from '../delete-promotion-program/delete-promotion-program.component';

@Component({
  selector: 'ngx-list-promotion-program',
  templateUrl: './list-promotion-program.component.html',
  styleUrls: ['./list-promotion-program.component.scss'],
  animations: [
    trigger('listProgram', [
      state('void', style({ transform: 'translateX(-30%)', opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in', style({transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({transform: 'translateX(-30%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ListPromotionProgramComponent implements OnInit{

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
        title: 'Tên sản phẩm',
        type: 'string',
      },
      codeProduct:{
        title: 'Mã sản phẩm',
        type:'string',
      },
      quantity:{
        title: 'Số lượng',
        type:'number',
      }
    }
  };

  source: LocalDataSource;

  //Edit promotionProgram
  listPromotionProgram: PromotionPrograms[] = [];

  //Create promotionProgram
  @Output() createPrograms = new EventEmitter<PromotionProgramRequest[]>(); 

  allProducts: allProducts[]= [];

  //checking
  isEdit: boolean = false;


  constructor(private promotionService: PromotionService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }


  ngOnInit(){
    this.loadData();
  }


  loadData(){
      this.allProducts = this.listPromotionProgram.reduce((acc, program) => {
        // Tạo danh sách sản phẩm từ chương trình khuyến mãi hiện tại
        const productsWithQuantity = program.products.map(product => ({
          ...product,
          quantity: program.quantity
        }));
        // Gộp danh sách sản phẩm vào danh sách tích lũy
        return acc.concat(productsWithQuantity);
      }, []);

      this.source.load(this.allProducts);
    
  }

  //child PromotionProduct hehe
  onCreate(): void {
    this.dialogService
      .open(CreatePromotionProgramComponent, {
        context: {
        }
      })
      .onClose.subscribe((isSubmit: any) => {
        if (isSubmit) {
        // Lọc ra các sản phẩm trùng lặp
        isSubmit.products = isSubmit.products.filter(newProduct => {
          const existingProduct = this.listPromotionProgram.some(program =>
            program.products.some(product => product.id === newProduct.id)
          );
          
          if (existingProduct) {
            this.toast.warningToast("Thất bại", "Trong danh sách đã có sản phẩm tặng kèm: " + newProduct.productName);
            return false; // Lọc sản phẩm trùng ra khỏi danh sách
          }
          
          return true; // Giữ lại các sản phẩm không trùng
        });

        // Nếu vẫn còn sản phẩm sau khi lọc, thêm chương trình vào danh sách
        if (isSubmit.products.length > 0) {
          this.listPromotionProgram.push(isSubmit);
        } else {
          this.toast.warningToast("Thất bại", "Trong danh sách đã có sản phẩm tặng kèm" );
        }

        //load source
          this.loadData();

          // Chuyển đổi `createPromotionPrograms` thành mảng `PromotionProgramRequest[]`
          const promotionRequests: PromotionProgramRequest[] = this.listPromotionProgram.map(program => ({
            productId: program.products.map(product => product.id),
            quantity: program.quantity,
          }));

          // Truyền mảng `PromotionProgramRequest[]` qua component cha
          this.createPrograms.emit(promotionRequests);
        }
      });
  }

  // onEdit(event): void{
  //   this.router.navigate(['/admin/promotion/promotion-edit', event.data.id]);
  // }
  

  // onViewDetails(event): void{
  //   this.router.navigate(['/admin/promotion/promotion-details', event.data.id]);
  // }

  onDelete(event): void {
    //Gán giá trị cho biểu mẫu
    const programRequest: {
      id: string;
      productName: string; 
      codeProduct: string;
      quantity:number;
    } = {
      id : event.data.id,
      productName: event.data.productName,
      codeProduct: event.data.codeProduct,
      quantity: event.data.quantity,
    }
    
    this.dialogService
      .open(DeletePromotionProgramComponent, {
        context: {
          program: programRequest
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          //Xử lý cập nhật, xóa sản phẩm product trong list
          this.listPromotionProgram.forEach(promotion => {
            promotion.products = promotion.products.filter(product => product.id !== programRequest.id);
          }); 
          
          //load dữ liệu
          this.loadData();
        }
      });
  }

  
}

