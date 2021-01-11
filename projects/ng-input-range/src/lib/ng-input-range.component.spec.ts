import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInputRangeComponent } from './ng-input-range.component';

describe('NgInputRangeComponent', () => {
  let component: NgInputRangeComponent;
  let fixture: ComponentFixture<NgInputRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgInputRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgInputRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
