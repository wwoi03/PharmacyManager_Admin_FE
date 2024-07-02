export class CreateStaffRequest {
    fullName: string = '';
    userName: string = '';
    password: string = '';
    confirmPassword: string = '';
    phoneNumber: string = '';
    email: string = '';
    gender: string = '';
    birthday: Date = new Date();
    address: string = '';
    image: string;
    branchId: string = null;
    roles: string[] = [];

    validationMessages = {
        fullName: {
          required: 'Họ và tên là bắt buộc.'
        },
        userName: {
          required: 'Tên đăng nhập là bắt buộc.'
        },
        email: {
          required: 'Email là bắt buộc.',
          email: 'Email không hợp lệ.'
        },
        password: {
          required: 'Mật khẩu là bắt buộc.'
        },
        confirmPassword: {
          required: 'Mật khẩu xác nhận là bắt buộc.'
        },
        gender: {
          required: 'Giới tính là bắt buộc.'
        },
        phoneNumber: {
          required: 'Số điện thoại là bắt buộc.'
        },
        birthday: {
          required: 'Ngày sinh là bắt buộc.'
        },
        address: {
          required: 'Địa chỉ là bắt buộc.'
        }
      };
}