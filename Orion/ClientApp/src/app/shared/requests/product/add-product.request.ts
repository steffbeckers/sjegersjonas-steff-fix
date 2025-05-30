export class AddProductRequest {
  name: string;
  code: string;
  description: string | null;
  productCategoryId: string;

  constructor(name: string, code: string, description: string | null, productCategoryId: string) {
    this.name = name;
    this.code = code;
    this.description = description;
    this.productCategoryId = productCategoryId;
  }
}
