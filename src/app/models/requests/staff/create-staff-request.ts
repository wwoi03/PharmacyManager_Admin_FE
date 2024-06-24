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
    image: string = '';
    branchId: string = '';
    roles: string[] = [];
}