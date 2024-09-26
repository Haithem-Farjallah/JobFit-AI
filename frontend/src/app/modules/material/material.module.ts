import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
const materialComponents = [MatSnackBarModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, materialComponents],
  exports: [materialComponents],
})
export class MaterialModule {}
