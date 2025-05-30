import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductFacade} from "../store/product.facade";
import {Action, ActionsSubject} from "@ngrx/store";
import {SubSink} from "subsink";
import {idValidator} from "../../shared/validators/id.validator";
import {ofType} from "@ngrx/effects";
import {addProductFailure, addProductSuccess} from "../store/product.actions";
import {ProductCategorySearchFacade} from "../../app-store/facades/product-category-search.facade";
import {EmptyStringValidator} from "../../shared/validators/empty-string.validator";
import {AddProductRequest} from "../../shared/requests/product/add-product.request";
import {StringHelper} from "../../shared/helpers/string.helper";

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  addFrom = this.fb.group({
    name: ['', [EmptyStringValidator(), Validators.maxLength(50)]],
    code: ['', [EmptyStringValidator(), Validators.maxLength(30)]],
    category: [null, [idValidator()]],
    description: ['', [Validators.maxLength(100)]],
  });

  isFormSubmit: boolean = false;
  disableSubmit: boolean = false;

  constructor(public modalRef: BsModalRef,
              private fb: FormBuilder,
              private productFacade: ProductFacade,
              public productCategorySearchFacade: ProductCategorySearchFacade,
              private actionListener$: ActionsSubject) { }

  ngOnInit(): void {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     return this.outsideSurveyService.getSurveyInfo(params.get('id'));
    //   })
    // ).subscribe(data => {
    //     this.survey = data;
    //     if (this.survey.surveyStatus === SurveyStatus.OutsideDone) {
    //       this.enableAllTabs();
    //     }
    //     this.setAuth();
    //   },
    //   error => {
    //     console.log('redirect to building table', error);
    //     this.router.navigateByUrl('/building-table');
    //   });
  }

  onSubmit(): void {
    this.isFormSubmit = true;
    if(!this.addFrom.valid) { return; }
    this.disableSubmit = true;
    const request = new AddProductRequest(
      StringHelper.trim(this.addFrom.get('name')?.value),
      StringHelper.trim(this.addFrom.get('code')?.value),
      StringHelper.trimOrSetNull(this.addFrom.get('description')?.value),
      this.addFrom.get('category')?.value
    )
    this.subscribeToActions();
    this.productFacade.addProduct(request);
  }

  private subscribeToActions() {
    this.subs.sink = this.actionListener$.pipe(
      ofType(addProductSuccess, addProductFailure),
    ).subscribe((action: Action) => {
      if(action.type === addProductSuccess.type) {
        this.modalRef.hide();
      } else {
        this.disableSubmit = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
