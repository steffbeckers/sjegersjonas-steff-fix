import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PagedResponse} from "../../../shared/infrastructure/queries/pagination/paged-response.interface";

import * as productCategoryListActions from '../actions/product-category-list.actions';
import {ProductCategoryService} from "../../../shared/services/product-category.service";
import {ProductCategoryList} from "../../../shared/models/product-category/product-category-list";
import {ProductCategoryListFacade} from "../facades/product-category-list.facade";

@Injectable()
export class ProductCategoryListEffects {

  constructor(
    private actions$: Actions,
    private productCategoryService: ProductCategoryService,
    private productCategoryListFacade: ProductCategoryListFacade
  ) {}

  loadProductCategoryList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productCategoryListActions.loadProductCategoryList),
      switchMap(({filterParams, sortParam, pagingParams}) =>
        this.productCategoryService.getProductCategoryList(filterParams, sortParam, pagingParams).pipe(
          map(( pagedResponse: PagedResponse<ProductCategoryList[]>) => productCategoryListActions.loadProductCategoryListSuccess({ pagedResponse })),
          catchError(error =>
            of(productCategoryListActions.loadProductCategoryListFailure({ error }))
          )
        )
      )
    )
  );

  addProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productCategoryListActions.addProductCategory),
      switchMap(({ request }) =>
        this.productCategoryService.addProductCategory(request).pipe(
          map((response: ProductCategoryList) => productCategoryListActions.addProductCategorySuccess()),
          tap(() => {
            this.productCategoryListFacade.loadProductCategories();
          }),
          catchError(error =>
            of(productCategoryListActions.addProductCategoryFailure({ error }))
          )
        )
      )
    )
  );

  deleteProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productCategoryListActions.deleteProductCategory),
      switchMap(({ id }) =>
        this.productCategoryService.deleteProductCategory(id).pipe(
          map((res: boolean) => productCategoryListActions.deleteProductCategorySuccess({ id })),
          tap(() => {
            this.productCategoryListFacade.loadProductCategories();
          }),
          catchError(error =>
            of(productCategoryListActions.deleteProductCategoryFailure({ error }))
          )
        )
      )
    )
  );

}
