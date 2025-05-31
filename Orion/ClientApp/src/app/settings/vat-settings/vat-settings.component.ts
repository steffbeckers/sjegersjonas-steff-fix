import { Component, OnInit } from '@angular/core';
import {ValueAddedTaxRateList} from "../../shared/models/value-added-tax-rate/value-added-tax-rate-list";
import {Observable} from "rxjs";
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {AddValueAddedTaxRateRequest} from "../../shared/requests/value-added-tax-rate/add-value-added-tax-rate.request";
import {ValueAddedTaxRateListFacade} from "../store/facades/value-added-tax-rate-list.facade";

@Component({
  selector: 'app-vat-settings',
  templateUrl: './vat-settings.component.html',
  styleUrls: ['./vat-settings.component.scss']
})
export class VatSettingsComponent implements OnInit {
  addVatForm = this.fb.group({
    percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });
  valueAddedTaxRateList$: Observable<ValueAddedTaxRateList[]>;

  constructor(private fb: UntypedFormBuilder,
              private valueAddedTaxRateListFacade: ValueAddedTaxRateListFacade) {
    this.valueAddedTaxRateList$ = this.valueAddedTaxRateListFacade.selectList$;
  }

  ngOnInit(): void {
    this.valueAddedTaxRateListFacade.loadValueAddedTaxRates();
  }

  addValueAddedTaxRate() {
    const request = new AddValueAddedTaxRateRequest(
      this.addVatForm.get('percentage')?.value
    );
    this.valueAddedTaxRateListFacade.addValueAddedTaxRate(request);
    this.addVatForm.patchValue({ percentage: 0 })
  }

  removeValueAddedTaxRate(id: string) {
    this.valueAddedTaxRateListFacade.deleteValueAddedTaxRate(id.toString());
  }

}
