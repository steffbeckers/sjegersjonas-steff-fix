import {createAction, props} from '@ngrx/store';
import {Pagination} from "../../shared/infrastructure/queries/pagination/pagination.interface";
import {SortingParam} from "../../shared/infrastructure/queries/sorting/sorting-param";
import {PagedResponse} from "../../shared/infrastructure/queries/pagination/paged-response.interface";

import {ProductList} from "../../shared/models/product/product-list";
import {AddProductRequest} from "../../shared/requests/product/add-product.request";
import {ProductDetails} from "../../shared/models/product/product-details";
import {UpdateProductRequest} from "../../shared/requests/product/update-product.request";
import {ProductFilterParams} from "../../shared/requests/product/product-filter.params";
import {ProductDetailsResponse} from "../../shared/responses/product/product-details.response";
import {AddProductPriceRequest} from "../../shared/requests/product/add-product-price.request";
import {ProductPriceList} from "../../shared/models/product/product-price-list";
import {UpdateProductPriceRequest} from "../../shared/requests/product/update-product-price.request";

export const loadProducts = createAction('[Product/API] Load Products', props<{
  filterParams: ProductFilterParams,
  sortParam: SortingParam | null,
  pagingParams: Pagination
}>());
export const loadProductsSuccess = createAction('[Product/API] Load Products Success', props<{
  pagedResponse: PagedResponse<ProductList[]>
}>());
export const loadProductsFailure = createAction('[Product/API] Load Products Failure', props<{ error: any }>());

export const addProduct = createAction('[Product/API] Add Product', props<{ request: AddProductRequest }>());
export const addProductSuccess = createAction('[Product/API] Add Product Success');
export const addProductFailure = createAction('[Product/API] Add Product Failure', props<{ error: any }>());

export const addProductPrice = createAction('[ProductPrice/API] Add Product Price', props<{ request: AddProductPriceRequest }>());
export const addProductPriceSuccess = createAction('[ProductPrice/API] Add Product Price Success', props<{ res: ProductPriceList }>());
export const addProductPriceFailure = createAction('[ProductPrice/API] Add Product Price Failure', props<{ error: any }>());

export const updateProduct = createAction('[Product/API] Update Product', props<{ request: UpdateProductRequest }>());
export const updateProductSuccess = createAction('[Product/API] Update Product Success', props<{ product: ProductDetails }>());
export const updateProductFailure = createAction('[Product/API] Update Product Failure', props<{ error: any }>());

export const updateProductPrice = createAction('[ProductPrice/API] Update Product Price', props<{ request: UpdateProductPriceRequest }>());
export const updateProductPriceSuccess = createAction('[ProductPrice/API] Update Product Price Success', props<{ res: ProductPriceList }>());
export const updateProductPriceFailure = createAction('[ProductPrice/API] Update Product Price Failure', props<{ error: any }>());

export const deleteProduct = createAction('[Product/API] Delete Product', props<{ id: string }>());
export const deleteProductSuccess = createAction('[Product/API] Delete Product Success', props<{ id: string }>());
export const deleteProductFailure = createAction('[Product/API] Delete Product Failure', props<{ error: any }>());

export const deleteProductPrice = createAction('[ProductPrice/API] Delete Product Price', props<{ id: string }>());
export const deleteProductPriceSuccess = createAction('[ProductPrice/API] Delete Product Price Success', props<{ id: string }>());
export const deleteProductPriceFailure = createAction('[ProductPrice/API] Delete Product Price Failure', props<{ error: any }>());

export const loadProductVm = createAction('[Product/API] Load Product VM', props<{ id: string }>());
export const loadProductVmSuccess = createAction('[Product/API] Load Product VM Success', props<{ productDetailsResponse: ProductDetailsResponse | null }>());
export const loadProductVmFailure = createAction('[Product/API] Load Product VM Failure', props<{ error: any }>());

export const updateFilters = createAction('Update Product Filters', props<{ filterParams: ProductFilterParams }>());
export const changePage = createAction('Product Change Page', props<{ page: number }>());
export const sortChange = createAction('Product Table Sort', props<{ sortingParam: SortingParam | null }>());
export const clearDetails = createAction('Clear Product Details');
