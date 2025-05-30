import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationDetailsComponent } from './relation-details.component';

describe('RelationDetailsComponent', () => {
  let component: RelationDetailsComponent;
  let fixture: ComponentFixture<RelationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
