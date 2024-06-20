export class ListStaffResponse {
    id: string;                  // Guid trong C# thường được biểu diễn dưới dạng string trong TypeScript
    fullName: string;
    userName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    birthday: Date;              // DateTime trong C# tương ứng với Date trong TypeScript
    address: string;
    image: string;
    branchId: string;            // Guid trong C# thường được biểu diễn dưới dạng string trong TypeScript
    roles: string[];             // List<string> trong C# tương ứng với string[] trong TypeScript
}