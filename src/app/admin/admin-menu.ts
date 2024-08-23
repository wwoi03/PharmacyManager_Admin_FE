import { Injectable } from '@angular/core';
import { NbMenuItem } from "@nebular/theme";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AdminMenu {
  public menuItems: NbMenuItem[] = [];

  constructor(private authService: AuthService) {
    this.loadMenu();
  }

  loadMenu(): void {
    const roles = this.authService.getRoles();

    this.menuItems = [
      {
        title: "Bảng quản trị",
        icon: "home-outline",
        link: "/admin/dashboard",
        home: true,
      },
      {
        title: "Chức năng",
        group: true,
      },
      // Sản phẩm
      {
        title: "Sản phẩm",
        icon: "cube-outline",
        children: [
          {
            title: "Danh sách sản phẩm",
            link: "/admin/product/product-list",
          },
          {
            title: "Thêm sản phẩm",
            link: "/admin/product/product-create",
          },
          // {
          //   title: "Danh sách hỗ trợ",
          //   link: "/admin/support/support-list",
          // },
        ],
        hidden: !roles.includes('PM_PRODUCT_MANAGER'),
      },
      // Loại sản phẩm
      {
        title: "Loại sản phẩm",
        icon: "grid-outline",
        children: [
          {
            title: "Danh sách loại sản phẩm",
            link: "/admin/category/category-list",
          },
        ],
        hidden: !roles.includes('PM_PRODUCT_MANAGER'),
      },
      // Quản lý khuyến mãi
      {
        title: "Quản lý khuyến mãi",
        icon: "flash-outline",
        children: [
          {
            title: "Danh sách khuyến mãi",
            link: "/admin/promotion/promotion-list",
          },
        ],
        hidden: !roles.includes('PM_ORDER') && !roles.includes('PM_PRODUCT_MANAGER'),
      },
      // Quản lý đơn hàng
      {
        title: "Quản lý đơn hàng",
        icon: "car-outline",
        children: [
          {
            title: "Danh sách đơn hàng",
            link: "/admin/order/order-list",
          },
        ],
        hidden: !roles.includes('PM_ORDER') && !roles.includes('PM_PRODUCT_MANAGER'),
      },
      // Quản lý bệnh
      {
        title: "Loại bệnh",
        icon: "shield-off-outline",
        children: [
          {
            title: "Danh sách bệnh",
            link: "/admin/disease/disease-list",
          },
          {
            title: "Danh sách triệu chứng",
            link: "/admin/symptom/symptom-list",
          },

        ],
        hidden: !roles.includes('PM_DISEASE'),
      },
      // Kho
      {
        title: "Kho",
        icon: "archive-outline",
        children: [
          {
            title: "Danh sách nhập kho",
            link: "/admin/shipment/shipment-list",
          },
          {
            title: "Nhập kho",
            link: "/admin/shipment/shipment-create",
          },
          // {
          //   title: "Thống kê nhập kho",
          //   link: "/admin/shipment/shipment-report",
          // },
        ],
        hidden: !roles.includes('PM_WAREHOUSE_MANAGER'),
      },
      // Nhân viên
      {
        title: "Nhân viên",
        icon: "people-outline",
        children: [
          {
            title: "Danh sách nhân viên",
            link: "/admin/staff/staff-list",
          },
          {
            title: "Thêm nhân viên",
            link: "/admin/staff/staff-create",
          },
        ],
        hidden: !roles.includes('PM_STAFF_MANAGER'),
      },
    ];
  }
}
