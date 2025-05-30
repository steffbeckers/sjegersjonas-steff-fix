export class UpdateProductPriceRequest {
  productProductUnitId: string;
  price: number;

  constructor(productProductUnitId: string, price: number) {
    this.productProductUnitId = productProductUnitId;
    this.price = price;
  }
}
