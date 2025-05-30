import {ProductCategoryList} from "../product-category/product-category-list";
import {ValueAddedTaxRateList} from "../value-added-tax-rate/value-added-tax-rate-list";

export interface ProductDetails {
  productId: string;
  name: string;
  code: string;
  description: string;
  productCategoryId: string;
  productCategory: ProductCategoryList;
  createdOn: Date;
}
