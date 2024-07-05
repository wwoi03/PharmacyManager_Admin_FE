import { Component, Input } from "@angular/core";

import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";

import { CategoryService } from "../../../services/category/category.service";
import { Toast } from "../../../helpers/toast";
import { ListCategoryResponse } from "../../../models/responses/category/list-category-response";
import { CategoryCreateComponent } from "../category-create/category-create.component";
import { CategoryDeleteComponent } from "../category-delete/category-delete.component";
import { CategoryEditComponent } from "../category-edit/category-edit.component";
import { Router } from "@angular/router";

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: "ngx-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent {
  // Setup
  customColumn = "categoryName";
  defaultColumns = ["codeCategory", "numberChildren"];
  allColumns = [this.customColumn, ...this.defaultColumns, 'actions'];

  // Data
  dataSource: NbTreeGridDataSource<ListCategoryResponse>;
  treeNodes: TreeNode<ListCategoryResponse>[];  // Dữ liệu nguyên thủy cho tree

  // Actions
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<ListCategoryResponse>,
    private categoryService: CategoryService,
    private toast: Toast,
    private dialogService: NbDialogService,
    private router: Router
  ) {}

  // InitData
  ngOnInit() {
    this.loadCategoriesByLevel();
  }

  // Load Categories by level
  loadCategoriesByLevel() {
    this.categoryService.getCategoriesByLevel().subscribe(
      (res) => {
        if (res.code === 200) {
          this.treeNodes = this.mapToTreeNode(res.obj);
          this.dataSource = this.dataSourceBuilder.create(this.treeNodes);
        } else {
          this.toast.warningToast("Lỗi hệ thống", "Vui lòng thử lại sau.");
        }
      },
    );
  }

  // Map to Tree Node
  mapToTreeNode(categories: ListCategoryResponse[]): TreeNode<ListCategoryResponse>[] {
    return categories.map((category) => ({
      data: {
        id: category.id,
        categoryName: category.categoryName,
        codeCategory: category.codeCategory,
        numberChildren: category.children.length,
      },
      children: category.children ? this.mapToTreeNode(category.children) : [],
    }));
  }

  // Customer title
  getColumnTitle(column: string): string {
    if (column === "categoryName") {
      return "Tên loại sản phẩm";
    } else if (column === "codeCategory") {
      return "Code";
    } else if (column === "items") {
      return "Danh mục con";
    } 
  }

  // Create
  onCreate() {
    this.dialogService
      .open(CategoryCreateComponent)
      .onClose.subscribe((result: boolean) => {
        if (result) {
          this.loadCategoriesByLevel();
        }
      });
  }

  // Details
  onViewDetails(row: any) {
    const category: ListCategoryResponse = row.data;
    this.router.navigate(['/admin/category/category-details', category.id]);
  }

  // Edit
  onEdit(row: any): void {
    
  }

  // Delete
  onDelete(row: any): void {
    const category: ListCategoryResponse = row.data;
    
    this.dialogService
      .open(CategoryDeleteComponent, {
        context: {
          category: category
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadCategoriesByLevel();
        }
      });
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

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
}

@Component({
  selector: "ngx-fs-icon",
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded"></nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="pricetags-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() expanded: boolean;
}
