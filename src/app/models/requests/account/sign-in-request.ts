export class SignInRequest {
    userName: string;
    password: string;

    validationMessages = {
        userName: {
            required: "Vui lòng nhập tên đăng nhập."
        },
        password: {
            required: "Vui lòng nhập mật khẩu."
        }
    }
}