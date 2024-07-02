import { ValidationNotify } from "../validation-notify/validation-notify";

export interface ResponseApi<T> {
    code: number;
    isSuccessed: boolean;
    message: string;
    obj: T;
    validationNotify: ValidationNotify<T>
}
  