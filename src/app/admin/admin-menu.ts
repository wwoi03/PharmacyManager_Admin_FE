import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Bảng quản trị',
    icon: 'home-outline',
    link: '/admin/dashboard',
    home: true,
  },
  {
    title: 'Chức năng hệ thống',
    group: true,
  },
  // Sản phẩm
  {
    title: 'Sản phẩm',
    icon: 'shopping-cart-outline',
    children: [
      {
        title: 'Danh sách sản phẩm',
        link: '',
      },
      {
        title: 'Thêm sản phẩm',
        link: '',
      },
    ],
  },
  // Loại sản phẩm
  {
    title: 'Loại sản phẩm',
    icon: 'pricetags-outline',
    children: [
      {
        title: 'Danh sách loại sản phẩm',
        link: '',
      },
      {
        title: 'Thêm loại sản phẩm',
        link: '',
      },
    ],
  },
];
