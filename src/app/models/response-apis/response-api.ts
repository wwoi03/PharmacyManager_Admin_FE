export interface ResponseApi<T> {
    code: number;
    isSuccessed: boolean;
    message: string;
    obj: T;
}
  