import { Component, Input, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CategoryService } from '../../../services/category/category.service';
import { Toast } from '../../../helpers/toast';
import { DetailsCategoryResponse } from '../../../models/responses/category/details-category-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})

export class CategoryDetailsComponent {
  // variables
  categoryId: string;
  detailsCategoryResponse: DetailsCategoryResponse = new DetailsCategoryResponse();

  @ViewChild('item', { static: true }) accordion;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Init Data
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.loadCategoryDetails();
    });
  }

  // Load Category Details
  loadCategoryDetails() {
    this.categoryService.details(this.categoryId).subscribe(
      (res) => {
        if (res.code === 200) {
          this.detailsCategoryResponse = res.obj
        }
      }
    )
  }

  // Xem chi tiết
  onViewDetails(item: DetailsCategoryResponse) {
    this.router.navigate(['/admin/category/category-details', item.id]);
  }

  // Xử lý sự kiển ẩn hiện product
  toggle() {
    this.accordion.toggle();
  }
}
