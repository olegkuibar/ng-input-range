import { Component, Provider, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlatformModule } from '@angular/cdk/platform';
import { NgInputRangeModule } from 'ng-input-range';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('NgInputRange', () => {
  function createComponent<T>(component: Type<T>, providers: Provider[] = []): ComponentFixture<T> {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        PlatformModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgInputRangeModule,
      ],
      declarations: [component],
      providers,
    }).compileComponents();

    return TestBed.createComponent<T>(component);
  }

  describe('NgInputRange with appearance', () => {
    const nonLegacyAppearances: MatFormFieldAppearance[] = ['standard', 'fill'];
    let fixture: ComponentFixture<NgInputRangeWithAppearance>;
    let testComponent: NgInputRangeWithAppearance;
    let containerEl: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = createComponent(NgInputRangeWithAppearance);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      containerEl = fixture.debugElement.query(By.css('mat-form-field'))!.nativeElement;
    }));

    it('legacy appearance should promote placeholder to label', fakeAsync(() => {
      testComponent.appearance = 'legacy';
      fixture.detectChanges();

      expect(containerEl.classList).toContain('mat-form-field-appearance-legacy');
      expect(testComponent.formField._hasFloatingLabel()).toBe(false);
      expect(testComponent.formField._hideControlPlaceholder()).toBe(true);
    }));

    it('non-legacy appearances should not promote placeholder to label', fakeAsync(() => {
      for (let appearance of nonLegacyAppearances) {
        testComponent.appearance = appearance;
        fixture.detectChanges();

        expect(containerEl.classList).toContain(`mat-form-field-appearance-${appearance}`);
        expect(testComponent.formField._hasFloatingLabel()).toBe(false);
        expect(testComponent.formField._hideControlPlaceholder()).toBe(false);
      }
    }));
  });

  @Component({
    template: `
      <mat-form-field [appearance]="appearance" floatLabel="never">
        <ng-input-range></ng-input-range>
      </mat-form-field>
    `,
  })
  class NgInputRangeWithAppearance {
    @ViewChild(MatFormField) formField: MatFormField;
    appearance: MatFormFieldAppearance;
  }
});
