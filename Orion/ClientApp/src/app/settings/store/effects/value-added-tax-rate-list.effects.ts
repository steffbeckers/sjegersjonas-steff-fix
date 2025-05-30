import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as valueAddedTaxRateListActions from '../actions/value-added-tax-rate-list.actions';
import {ValueAddedTaxRateService} from "../../../shared/services/value-added-tax-rate.service";
import {PagedResponse} from "../../../shared/infrastructure/queries/pagination/paged-response.interface";
import {ValueAddedTaxRateList} from "../../../shared/models/value-added-tax-rate/value-added-tax-rate-list";
import {ValueAddedTaxRateListFacade} from "../facades/value-added-tax-rate-list.facade";

@Injectable()
export class ValueAddedTaxRateListEffects {

  constructor(
    private actions$: Actions,
    private valueAddedTaxRateService: ValueAddedTaxRateService,
    private valueAddedTaxRateListFacade: ValueAddedTaxRateListFacade
  ) {}

  loadValueAddedTaxRateList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(valueAddedTaxRateListActions.loadValueAddedTaxRateList),
      switchMap(({filterParams, sortParam, pagingParams}) =>
        this.valueAddedTaxRateService.getValueAddedTaxRateList(filterParams, sortParam, pagingParams).pipe(
          map(( pagedResponse: PagedResponse<ValueAddedTaxRateList[]>) => valueAddedTaxRateListActions.loadValueAddedTaxRateListSuccess({ pagedResponse })),
          catchError(error =>
            of(valueAddedTaxRateListActions.loadValueAddedTaxRateListFailure({ error }))
          )
        )
      )
    )
  );

  addValueAddedTaxRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(valueAddedTaxRateListActions.addValueAddedTaxRate),
      switchMap(({ request }) =>
        this.valueAddedTaxRateService.addValueAddedTaxRate(request).pipe(
          map((response: ValueAddedTaxRateList) => valueAddedTaxRateListActions.addValueAddedTaxRateSuccess()),
          tap(() => {
            this.valueAddedTaxRateListFacade.loadValueAddedTaxRates();
          }),
          catchError(error =>
            of(valueAddedTaxRateListActions.addValueAddedTaxRateFailure({ error }))
          )
        )
      )
    )
  );

  deleteValueAddedTaxRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(valueAddedTaxRateListActions.deleteValueAddedTaxRate),
      switchMap(({ id }) =>
        this.valueAddedTaxRateService.deleteValueAddedTaxRate(id).pipe(
          map((res: boolean) => valueAddedTaxRateListActions.deleteValueAddedTaxRateSuccess({ id })),
          tap(() => {
            this.valueAddedTaxRateListFacade.loadValueAddedTaxRates();
          }),
          catchError(error =>
            of(valueAddedTaxRateListActions.deleteValueAddedTaxRateFailure({ error }))
          )
        )
      )
    )
  );

}
