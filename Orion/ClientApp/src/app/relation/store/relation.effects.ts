import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RelationService} from '../../shared/services/relation.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as actions from './relation.actions';
import {Router} from '@angular/router';
import {RoutesConfig} from "../../shared/routes-config";
import {RelationFacade} from "./relation.facade";
import {PagedResponse} from "../../shared/infrastructure/queries/pagination/paged-response.interface";
import {RelationList} from "../../shared/models/relation/relation-list";
import {RelationDetails} from "../../shared/models/relation/relation-details";

@Injectable()
export class RelationEffects {

  constructor(
    private actions$: Actions,
    private relationService: RelationService,
    private relationFacade: RelationFacade,
    private route: Router
  ) {}

  loadRelations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadRelations),
      switchMap(({filterParams, sortParam, pagingParams}) =>
        this.relationService.getRelationList(filterParams, sortParam, pagingParams).pipe(
          map(( pagedResponse: PagedResponse<RelationList[]>) => actions.loadRelationsSuccess({ pagedResponse })),
          catchError(error =>
            of(actions.loadRelationsFailure({ error }))
          )
        )
      )
    )
  );

  addRelation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addRelation),
      switchMap(({ request }) =>
        this.relationService.addRelation(request).pipe(
          map((res: RelationDetails) => {
            this.relationFacade.loadRelations();
            return actions.addRelationSuccess();
          }),
          catchError(error =>
            of(actions.addRelationFailure({ error }))
          )
        )
      )
    )
  );

  updateRelation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateRelation),
      switchMap(({ request }) =>
        this.relationService.updateRelation(request).pipe(
          map((relation: RelationDetails) => actions.updateRelationSuccess({ relation })),
          catchError(error =>
            of(actions.updateRelationFailure({ error }))
          )
        )
      )
    )
  );

  deleteRelation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteRelation),
      switchMap(({ id }) =>
        this.relationService.deleteRelation(id).pipe(
          map((res: boolean) => {
            this.route.navigate([RoutesConfig.relation.relationList.fullPath]);
            return actions.deleteRelationSuccess({ id });
          }),
          catchError(error =>
            of(actions.deleteRelationFailure({ error }))
          )
        )
      )
    )
  );

}
