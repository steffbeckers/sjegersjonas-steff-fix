export class AddProductCategoryRequest {
  name: string;
  description: string | null;

  constructor(name: string, description: string | null = null) {
    this.name = name;
    this.description = description;
  }
}
