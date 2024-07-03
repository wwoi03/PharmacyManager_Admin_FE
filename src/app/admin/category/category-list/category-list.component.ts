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

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  categoryName: string;
  codeCategory: string;
  items?: number;
}

@Component({
  selector: "ngx-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent {
  customColumn = "categoryName";
  defaultColumns = ["codeCategory", "items"];
  allColumns = [this.customColumn, ...this.defaultColumns, 'actions'];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private categoryService: CategoryService,
    private toast: Toast,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.loadCategoriesByLevel();
  }

  // Load Categories by level
  loadCategoriesByLevel() {
    this.categoryService.getCategoriesByLevel().subscribe(
      (res) => {
        if (res.code === 200) {
          const treeNodes = this.mapToTreeNode(res.obj);
          this.dataSource = this.dataSourceBuilder.create(treeNodes);
        } else {
          this.toast.warningToast("Lỗi hệ thống", "Vui lòng thử lại sau.");
        }
      },
      (err) => {
        this.toast.warningToast("Lỗi hệ thống", "Vui lòng thử lại sau.");
      }
    );
  }

  // Map to Tree Node
  mapToTreeNode(categories: ListCategoryResponse[]): TreeNode<FSEntry>[] {
    return categories.map((category) => ({
      data: {
        categoryName: category.categoryName,
        codeCategory: category.codeCategory,
        items: category.children.length,
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
    } else {
      return column; // Fallback to column name if no custom title is defined
    }
  }

  // Create
  onCreate() {
    this.dialogService.open(CategoryCreateComponent)
      
  }

  // Details
  onViewDetails(row: any) {

  }

  // Edit
  onEdit(row: any): void {
    console.log("Editing:", row);
  }

  // Delete
  onDelete(row: any): void {
    console.log("Deleting:", row);
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
