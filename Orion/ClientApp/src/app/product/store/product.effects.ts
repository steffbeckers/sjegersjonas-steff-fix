import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductService} from '../../shared/services/product.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as actions from './product.actions';
import {Router} from '@angular/router';
import {RoutesConfig} from "../../shared/routes-config";
import {ProductFacade} from "./product.facade";
import {PagedResponse} from "../../shared/infrastructure/queries/pagination/paged-response.interface";
import {ProductList} from "../../shared/models/product/product-list";
import {ProductDetails} from "../../shared/models/product/product-details";
import {ProductDetailsResponse} from "../../shared/responses/product/product-details.response";
import {ProductPriceList} from "../../shared/models/product/product-price-list";

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productFacade: ProductFacade,
    private route: Router
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProducts),
      switchMap(({filterParams, sortParam, pagingParams}) =>
        this.productService.getProductList(filterParams, sortParam, pagingParams).pipe(
          map(( pagedResponse: PagedResponse<ProductList[]>) => actions.loadProductsSuccess({ pagedResponse })),
          catchError(error =>
            of(actions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  loadProductVm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProductVm),
      switchMap(({ id }) =>
        this.productService.getProductDetailsVm(id).pipe(
          switchMap((productDetailsResponse: ProductDetailsResponse) => [
            actions.loadProductVmSuccess({ productDetailsResponse })
          ]),
          catchError(error =>
            of(actions.loadProductVmFailure({ error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addProduct),
      switchMap(({ request }) =>
        this.productService.addProduct(request).pipe(
          map((res: ProductDetails) => {
            this.productFacade.loadProducts();
            return actions.addProductSuccess();
          }),
          catchError(error =>
            of(actions.addProductFailure({ error }))
          )
        )
      )
    )
  );

  addProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addProductPrice),
      switchMap(({ request }) =>
        this.productService.addProductPrice(request).pipe(
          map((res: ProductPriceList) => actions.addProductPriceSuccess({ res })),
          catchError(error =>
            of(actions.addProductPriceFailure({ error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateProduct),
      switchMap(({ request }) =>
        this.productService.updateProduct(request).pipe(
          map((product: ProductDetails) => actions.updateProductSuccess({ product })),
          catchError(error =>
            of(actions.updateProductFailure({ error }))
          )
        )
      )
    )
  );

  updateProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateProductPrice),
      switchMap(({ request }) =>
        this.productService.updateProductPrice(request).pipe(
          map((res: ProductPriceList) => actions.updateProductPriceSuccess({ res })),
          catchError(error =>
            of(actions.updateProductPriceFailure({ error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteProduct),
      switchMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map((res: boolean) => {
            this.route.navigate([RoutesConfig.product.productList.fullPath]);
            return actions.deleteProductSuccess({ id });
          }),
          catchError(error =>
            of(actions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  deleteProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteProductPrice),
      switchMap(({ id }) =>
        this.productService.deleteProductPrice(id).pipe(
          map((res: boolean) => actions.deleteProductPriceSuccess({ id })),
          catchError(error =>
            of(actions.deleteProductPriceFailure({ error }))
          )
        )
      )
    )
  );

}
