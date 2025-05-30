import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuotationModalComponent } from './add-quotation-modal.component';

describe('AddQuotationModalComponent', () => {
  let component: AddQuotationModalComponent;
  let fixture: ComponentFixture<AddQuotationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuotationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuotationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
