import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as searchProductCategoryActions from '../actions/product-category-search.actions';
import {ProductCategoryService} from "../../shared/services/product-category.service";
import {ProductCategoryList} from "../../shared/models/product-category/product-category-list";
import {SearchParam} from "../../shared/infrastructure/queries/filter/search-param";

@Injectable()
export class ProductCategorySearchEffects {

  constructor(
    private actions$: Actions,
    private productCategoryService: ProductCategoryService
  ) {}

  searchProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProductCategoryActions.searchProductCategory),
      switchMap(({ searchParams }) =>
        this.productCategoryService.searchProductCategory(searchParams).pipe(
          map(( res: ProductCategoryList[]) => searchProductCategoryActions.searchProductCategorySuccess({ res })),
          catchError(error =>
            of(searchProductCategoryActions.searchProductCategoryFailure({ error }))
          )
        )
      )
    )
  );

}
