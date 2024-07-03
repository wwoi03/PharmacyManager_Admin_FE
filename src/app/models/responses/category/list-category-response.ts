export class ListCategoryResponse {
    id: string; 
    codeCategory: string;
    categoryName: string;
    numberChildren: number;
    children: ListCategoryResponse[];

    constructor() {
        this.children = [];
    }
}
