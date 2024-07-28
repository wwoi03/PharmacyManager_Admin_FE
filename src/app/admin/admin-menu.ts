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
        icon: "shopping-cart-outline",
        children: [
          {
            title: "Danh sách sản phẩm",
            link: "/admin/product/product-list",
          },
          {
            title: "Thêm sản phẩm",
            link: "/admin/product/product-create",
          },
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

      // Quản lý đơn hàng
      {
        title: "Quản lý đơn hàng",
        icon: "shake-outline",
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
        icon: "shake-outline",
        children: [
          {
            title: "Danh sách bệnh",
            link: "/admin/disease/disease-list",
          },
          {
            title: "Thêm bệnh mới",
            link: "/admin/disease/disease-create",
          },
        ],
        hidden: !roles.includes('PM_DISEASE'),
      },
      // Quản lý hỗ trợ
      {
        title: "Hỗ trợ sản phẩm",
        icon: "heart-outline",
        children: [
          {
            title: "Danh sách hỗ trợ",
            link: "/admin/support/support-list",
          },
          {
            title: "Thêm hỗ trợ mới",
            link: "/admin/support/support-create",
          },
        ],
        hidden: !roles.includes('PM_STAFF_MANAGER'),
      },
      // Quản lý triệu chứng
      {
        title: "Triệu chứng bệnh",
        icon: "shield-off-outline",
        children: [
          {
            title: "Danh sách triệu chứng",
            link: "/admin/symptom/symptom-list",
          },
          {
            title: "Thêm triệu chứng",
            link: "/admin/symptom/symptom-create",
          },
        ],
        hidden: !roles.includes('PM_SYMPTOMS'),
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
          {
            title: "Thống kê nhập kho",
            link: "/admin/shipment/shipment-report",
          },
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
      // Quyền hạn
      {
        title: "Quyền hạn",
        icon: "eye-off-2-outline",
        children: [
          {
            title: "Danh sách quyền hạn",
            link: "/admin/permissions/permissions-list",
          },
          {
            title: "Cấp quyền mới",
            link: "/admin/permissions/permissions-create",
          },
        ],
        hidden: !roles.includes('PM_ADMIN'),
      },
      // Tài khoản
      {
        title: "Tài khoản",
        icon: "lock-outline",
        children: [
          {
            title: "Thông tin tài khoản",
            link: "/admin/account/account-info",
          },
          {
            title: "Đổi mật khẩu",
            link: "/auth/change-password",
          },
        ],
      },
    ];
  }
}
