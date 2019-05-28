import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutPage } from './donut.page';

describe('DonutPage', () => {
  let component: DonutPage;
  let fixture: ComponentFixture<DonutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
