import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductPromotionResponse } from '../../../models/responses/promotion/promotion-response';
import { PromotionService } from '../../../services/promotion/promotion.service';
import { Router } from '@angular/router';
import { Toast } from '../../../helpers/toast';
import { NbDialogService } from '@nebular/theme';
import { ProductPromotionRequest, PromotionProgramRequest } from '../../../models/requests/promotion/promotion-create-request';
import { Product } from '../../../models/responses/productDisease/productDisease-response';
import { DeletePromotionProductComponent } from '../delete-promotion-product/delete-promotion-product.component';

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
  @Input() listPromotionProduct: ProductPromotionResponse[];

  //isEdit
  isEdit: boolean = false;

  //listProductRequest
  @Output() productPromotions = new EventEmitter<ProductPromotionRequest[]>(); 

  //Danh sách hiển thị
  createPromotionProducts: {
    products: { id: string; productName: string; codeProduct: string }[] ,
    additionalInfo: string;
    quantity: number;
    promotionProgramRequest?: PromotionProgramRequest[] | null;
  }[] = [];

  allProducts: {
    id: string;
    productName: string; 
    codeProduct: string;
    quantity:number;
  }[] = [];

  //Gọi hàm hiển thị
  showCreatePromotionProduct: boolean = false; 



  constructor(private promotionService: PromotionService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  ngOnInit(){
    this.loadData();
  }

  check(){
    if(this.listPromotionProduct)
      this.isEdit = true;
  }

  loadData(){
    if(this.isEdit)
      this.source.load(this.listPromotionProduct);
    else{
      this.allProducts = this.createPromotionProducts.reduce((acc, mapProduct) => {
        // Tạo danh sách sản phẩm từ chương trình khuyến mãi hiện tại
        const productsWithQuantity = mapProduct.products.map(product => ({
          ...product,
          quantity: mapProduct.quantity
        }));
        // Gộp danh sách sản phẩm vào danh sách tích lũy
        return acc.concat(productsWithQuantity);
      }, []);

      this.source.load(this.allProducts);
    }
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

    //Gán giá trị cho biểu mẫu
    const productRequest: {
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
      .open(DeletePromotionProductComponent, {
        context: {
          product: productRequest
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          //Xử lý cập nhật
          this.createPromotionProducts.forEach(promotion => {
            promotion.products = promotion.products.filter(product => product.id !== productRequest.id);
          });          

          //load dữ liệu
          this.loadData();
        }
      });
  }

  handleProductCreate(promotionRequest: any) {
    promotionRequest.products = promotionRequest.products.filter(newProduct => {
      const existingProduct = this.createPromotionProducts.some(item =>
        item.products.some(product => product.id === newProduct.id)
      );
      
      if (existingProduct) {
        this.toast.warningToast("Thất bại", "Trong danh sách đã có sản phẩm khuyến mãi: " + newProduct.productName);
        return false; // Lọc sản phẩm trùng ra khỏi danh sách
      }
      
      return true; // Giữ lại các sản phẩm không trùng
    });

    // Nếu vẫn còn sản phẩm sau khi lọc, thêm chương trình vào danh sách
    if (promotionRequest.products.length > 0) {
      this.createPromotionProducts.push(promotionRequest);
    } else {
      this.toast.warningToast("Thất bại", "Trong danh sách đã có sản phẩm tặng kèm" );
    }

    //load source
    this.loadData();

     // Chuyển đổi `createPromotionProducts` thành mảng `PromotionProductRequest[]`
     const promotionRequests: ProductPromotionRequest[] = this.createPromotionProducts.map(Product => ({
      productId: Product.products.map(product => product.id),
      additionalInfo : Product.additionalInfo,
      quantity: Product.quantity,
      promotionProgramRequest: Product.promotionProgramRequest,
    }));

    // Truyền mảng `PromotionProgramRequest[]` qua component cha
    this.productPromotions.emit(promotionRequests);

    this.showCreatePromotionProduct = false;
  }
}

