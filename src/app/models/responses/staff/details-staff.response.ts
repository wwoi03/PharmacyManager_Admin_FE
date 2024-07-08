export class DetailsStaffResponse {
    id: string; // TypeScript sử dụng string cho UUID
    fullName: string;
    userName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    birthday: Date = new Date();
    address: string;
    image?: string;
    branchId: string; // TypeScript sử dụng string cho UUID
    roles: string[];
}
