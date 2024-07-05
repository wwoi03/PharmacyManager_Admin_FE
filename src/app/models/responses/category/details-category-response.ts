import { ListCategoryResponse } from "./list-category-response";

export class DetailsCategoryResponse {
    id: string = '';
    codeCategory: string = '';
    categoryName: string = '';
    parentCategoryId?: string;
    parentCategoryName?: string;
    numberChildren: number;
    childrenCategories?: ListCategoryResponse[];
}