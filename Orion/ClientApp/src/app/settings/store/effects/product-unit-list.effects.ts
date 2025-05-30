import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PagedResponse} from "../../../shared/infrastructure/queries/pagination/paged-response.interface";

import * as productUnitListActions from '../actions/product-unit-list.actions';
import {ProductUnitService} from "../../../shared/services/product-unit.service";
import {ProductUnitList} from "../../../shared/models/product-unit/product-unit-list";
import {ProductUnitListFacade} from "../facades/product-unit-list.facade";

@Injectable()
export class ProductUnitListEffects {

  constructor(
    private actions$: Actions,
    private productUnitService: ProductUnitService,
    private productUnitListFacade: ProductUnitListFacade
  ) {}

  loadProductUnitList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productUnitListActions.loadProductUnitList),
      switchMap(({filterParams, sortParam, pagingParams}) =>
        this.productUnitService.getProductUnitList(filterParams, sortParam, pagingParams).pipe(
          map(( pagedResponse: PagedResponse<ProductUnitList[]>) => productUnitListActions.loadProductUnitListSuccess({ pagedResponse })),
          catchError(error =>
            of(productUnitListActions.loadProductUnitListFailure({ error }))
          )
        )
      )
    )
  );

  addProductUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productUnitListActions.addProductUnit),
      switchMap(({ request }) =>
        this.productUnitService.addProductUnit(request).pipe(
          map((response: ProductUnitList) => productUnitListActions.addProductUnitSuccess()),
          tap(() => {
            this.productUnitListFacade.loadProductUnits();
          }),
          catchError(error =>
            of(productUnitListActions.addProductUnitFailure({ error }))
          )
        )
      )
    )
  );

  deleteProductUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productUnitListActions.deleteProductUnit),
      switchMap(({ id }) =>
        this.productUnitService.deleteProductUnit(id).pipe(
          map((res: boolean) => productUnitListActions.deleteProductUnitSuccess({ id })),
          tap(() => {
            this.productUnitListFacade.loadProductUnits();
          }),
          catchError(error =>
            of(productUnitListActions.deleteProductUnitFailure({ error }))
          )
        )
      )
    )
  );

}
