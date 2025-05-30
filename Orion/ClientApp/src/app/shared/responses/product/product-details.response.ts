import {PagedResponse} from "../../infrastructure/queries/pagination/paged-response.interface";
import {ProductDetails} from "../../models/product/product-details";
import {ProductPriceList} from "../../models/product/product-price-list";

export interface ProductDetailsResponse {
  productDetails: ProductDetails;
  productPrices: PagedResponse<ProductPriceList[]>;
}
