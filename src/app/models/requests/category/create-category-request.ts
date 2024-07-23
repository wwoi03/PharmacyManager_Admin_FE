export class CreateCategoryRequest {
  name: string;
  codeCategory: string;
  parentCategoryId?: string;

  validationMessages = {
    name: {
      required: "Tên loại sản phẩm là bắt buộc.",
    },
    codeCategory: {
      required: "Mã loại sản phẩm là bắt buộc.",
    },
  };
}
