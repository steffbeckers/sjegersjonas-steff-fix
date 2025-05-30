export class UpdateProductRequest {
  id: string;
  name: string;
  code: string;
  description: string | null;
  productCategoryId: string;

  constructor(id: string, name: string, code: string, description: string | null, productCategoryId: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.description = description;
    this.productCategoryId = productCategoryId;
  }
}
