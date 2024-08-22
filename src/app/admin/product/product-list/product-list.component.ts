import { Component, Input } from "@angular/core";

import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { ListProductResponse } from "../../../models/responses/product/list-product-response";
import { ProductService } from "../../../services/product/product.service";
import { Toast } from "../../../helpers/toast";
import { Router } from "@angular/router";
import { UploadFileService } from "../../../services/upload-file/upload-file.service";
import { ProductDeleteComponent } from "../product-delete/product-delete.component";

interface TreeNode<T> {
  data: T;
  expanded?: boolean;
}

@Component({
  selector: "ngx-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  // Setup
  customColumn = "codeMedicine";
  defaultColumns = [
    "codeMedicine",
    "productName",
    "image",
    "categoryName",
    "brandOrigin",
    "shortDescription",
  ];
  allColumns = ["actions", ...this.defaultColumns];

  // Data
  dataSource: NbTreeGridDataSource<ListProductResponse>;
  treeNodes: TreeNode<ListProductResponse>[];
  tempItems = [];
  p: number = 1;
  pageSize: number = 10;
  totalItems: number;

  // Actions
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<ListProductResponse>,
    private productService: ProductService,
    private toast: Toast,
    private dialogService: NbDialogService,
    private router: Router,
    public uploadFileService: UploadFileService,
  ) {}

  // InitData
  ngOnInit() {
    this.loadProducts();
  }

  // Load Categories by level
  loadProducts() {
    this.productService.getProducts().subscribe((res) => {
      if (res.code === 200) {
        this.treeNodes = this.mapToTreeNode(res.obj);
        this.dataSource = this.dataSourceBuilder.create(this.treeNodes);

        this.tempItems = Array.from({ length: this.treeNodes.length }, (_, index) => index + 1);
      }
    });
  }

  // Map to Tree Node
  mapToTreeNode(
    products: ListProductResponse[]
  ): TreeNode<ListProductResponse>[] {
    return products.map((product) => ({
      data: {
        id: product.id,
        codeMedicine: product.codeMedicine,
        productName: product.productName,
        categoryName: product.categoryName,
        brandOrigin: product.brandOrigin,
        shortDescription: product.shortDescription,
        image: product.image,
      },
    }));
  }

  // Customer title
  getColumnTitle(column: string): string {
    switch (column) {
      case "id":
        return "ID";
      case "codeMedicine":
        return "Mã Thuốc";
      case "productName":
        return "Tên Sản Phẩm";
      case "categoryName":
        return "Loại Sản Phẩm";
      case "brandOrigin":
        return "Nguồn Gốc";
      case "shortDescription":
        return "Mô Tả Ngắn";
      case "image":
        return "Hình Ảnh";
      default:
        return "Không xác định";
    }
  }

  getColumnClass(column: string): string {
    switch (column) {
      case "id":
        return "idColumn";
      case "codeMedicine":
        return "codeMedicineColumn";
      case "productName":
        return "productNameColumn";
      case "categoryName":
        return "categoryNameColumn";
      case "brandOrigin":
        return "brandOriginColumn";
      case "shortDescription":
        return "shortDescriptionColumn";
      case "image":
        return "imageColumn";
      default:
        return "";
    }
  }

  // Create
  onCreate() {}

  // Details
  onViewDetails(row: any) {}

  // Edit
  onEdit(row: any): void {}

  // Delete
  onDelete(row: any): void {
    console.log(row);

    this.dialogService
      .open(ProductDeleteComponent, {
        context: {
          product: row.data,
        },
      })
      .onClose.subscribe((result: boolean) => {
        if (result) {
          this.loadProducts();
        }
      });
  }

  updateSort(sortRequest: NbSortRequest): void {}

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  changePage(page: number) {
    this.p = page;
    this.updateDataSource();
  }

  updateDataSource() {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pagedData = this.treeNodes.slice(startIndex, endIndex);
    this.dataSource = this.dataSourceBuilder.create(pagedData);
  }
}

@Component({
  selector: "ngx-fs-icon",
  template: `
    <!-- <nb-tree-grid-row-toggle [expanded]="expanded"></nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="pricetags-outline"></nb-icon>
    </ng-template> -->
  `,
})
export class FsIconComponent {
  @Input() expanded: boolean;
}
