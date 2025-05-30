import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromSearchProductUnitActions from '../actions/product-unit-search.actions';
import {ProductUnitService} from "../../shared/services/product-unit.service";
import {ProductUnitList} from "../../shared/models/product-unit/product-unit-list";


@Injectable()
export class ProductUnitSearchEffects {

  constructor(private actions$: Actions,
              private productUnitService: ProductUnitService) {
  }

  searchProductUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSearchProductUnitActions.searchProductUnit),
      switchMap(({ searchParams }) =>
        this.productUnitService.searchProductUnit(searchParams).pipe(
          map(( res: ProductUnitList[]) => fromSearchProductUnitActions.searchProductUnitSuccess({ res })),
          catchError(error =>
            of(fromSearchProductUnitActions.searchProductUnitFailure({ error }))
          )
        )
      )
    )
  );

}
