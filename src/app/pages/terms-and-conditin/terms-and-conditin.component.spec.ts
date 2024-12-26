import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditinComponent } from './terms-and-conditin.component';

describe('TermsAndConditinComponent', () => {
  let component: TermsAndConditinComponent;
  let fixture: ComponentFixture<TermsAndConditinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConditinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsAndConditinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
