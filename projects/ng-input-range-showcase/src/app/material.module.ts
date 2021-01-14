import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [A11yModule, MatCardModule, MatInputModule, MatCheckboxModule, MatSelectModule],
})
export class DemoMaterialModule {}

/**  Copyright 2021 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
