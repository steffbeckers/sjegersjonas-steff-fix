export class AddProductPriceRequest {
  productId: string;
  productUnitId: string;
  price: number;

  constructor(productId: string, productUnitId: string, price: number) {
    this.productId = productId;
    this.productUnitId = productUnitId;
    this.price = price;
  }

}
