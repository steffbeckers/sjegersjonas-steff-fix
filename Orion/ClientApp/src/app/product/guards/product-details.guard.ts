import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ProductFacade} from "../store/product.facade";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsGuard implements CanActivate {

  constructor(private productFacade: ProductFacade) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.productFacade.clearDetails();
    this.productFacade.loadProduct(route.params['id']);
    return true;
  }

}
