import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LayoutFacade} from "../facades/layout.facade";
import * as layoutActions from '../actions/layout.actions';

@Injectable()
export class LayoutEffects {

  private renderer: Renderer2

  constructor(private actions$: Actions,
              private layoutFacade: LayoutFacade,
              private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleThemeColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(layoutActions.toggleThemeColor),
      tap((c) => {
        this.layoutFacade.selectIsDarkMode$.subscribe((result: boolean) => {
          if(result) {
            this.renderer.addClass(document.body, 'dark');
          } else {
            this.renderer.removeClass(document.body, 'dark');
          }
        })
      })
    ), { dispatch: false }
  );

}
