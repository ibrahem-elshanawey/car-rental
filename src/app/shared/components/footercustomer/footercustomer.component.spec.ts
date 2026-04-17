import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercustomerComponent } from './footercustomer.component';

describe('FootercustomerComponent', () => {
  let component: FootercustomerComponent;
  let fixture: ComponentFixture<FootercustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootercustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootercustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
