import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {QuotationService} from '../../shared/services/quotation.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as actions from './quotation.actions';
import {Router} from '@angular/router';
import {RoutesConfig} from "../../shared/routes-config";
import {QuotationFacade} from "./quotation.facade";
import {PagedResponse} from "../../shared/infrastructure/queries/pagination/paged-response.interface";
import {QuotationList} from "../../shared/models/quotation/quotation-list";
import {QuotationDetails} from "../../shared/models/quotation/quotation-details";

@Injectable()
export class QuotationEffects {

  constructor(
    private actions$: Actions,
    private quotationService: QuotationService,
    private quotationFacade: QuotationFacade,
    private route: Router
  ) {}

  loadQuotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadQuotations),
      switchMap(({filterParams, sortParam, pagingParams}) =>
        this.quotationService.getQuotationList(filterParams, sortParam, pagingParams).pipe(
          map(( pagedResponse: PagedResponse<QuotationList[]>) => actions.loadQuotationsSuccess({ pagedResponse })),
          catchError(error =>
            of(actions.loadQuotationsFailure({ error }))
          )
        )
      )
    )
  );

  addQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addQuotation),
      switchMap(({ request }) =>
        this.quotationService.addQuotation(request).pipe(
          map((res: QuotationDetails) => {
            this.quotationFacade.loadQuotations();
            return actions.addQuotationSuccess();
          }),
          catchError(error =>
            of(actions.addQuotationFailure({ error }))
          )
        )
      )
    )
  );

  updateQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateQuotation),
      switchMap(({ request }) =>
        this.quotationService.updateQuotation(request).pipe(
          map((quotation: QuotationDetails) => actions.updateQuotationSuccess({ quotation })),
          catchError(error =>
            of(actions.updateQuotationFailure({ error }))
          )
        )
      )
    )
  );

  deleteQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteQuotation),
      switchMap(({ id }) =>
        this.quotationService.deleteQuotation(id).pipe(
          map((res: boolean) => {
            this.route.navigate([RoutesConfig.quotation.quotationList.fullPath]);
            return actions.deleteQuotationSuccess({ id });
          }),
          catchError(error =>
            of(actions.deleteQuotationFailure({ error }))
          )
        )
      )
    )
  );

}
