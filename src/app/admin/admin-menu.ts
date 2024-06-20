import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // Dashboard
  {
    title: 'Bảng quản trị',
    icon: 'home-outline',
    link: '/admin/dashboard',
    home: true,
  },
  {
    title: 'Chức năng',
    group: true,
  },
  // Sản phẩm
  {
    title: 'Sản phẩm',
    icon: 'shopping-cart-outline',
    children: [
      {
        title: 'Danh sách sản phẩm',
        link: '/admin/product/product-list',
      },
      {
        title: 'Thêm sản phẩm',
        link: '',
      },
    ],
  },
  // Kho
  {
    title: 'Kho',
    icon: 'archive-outline',
    children: [
      {
        title: 'Danh sách nhập kho',
        link: '',
      },
      {
        title: 'Nhập kho',
        link: '',
      },
    ],
  },
  // Nhân viên
  {
    title: 'Nhân viên',
    icon: 'people-outline',
    children: [
      {
        title: 'Danh sách nhân viên',
        link: '/admin/staff/staff-list',
      },
      {
        title: 'Thêm nhân viên',
        link: '',
      },
    ],
  },
  // Quyền hạn
  {
    title: 'Quyền hạn',
    icon: 'eye-off-2-outline',
    children: [
      {
        title: 'Danh sách quyền hạn',
        link: '',
      },
      {
        title: 'Thêm nhân viên',
        link: '',
      },
    ],
  },
];
