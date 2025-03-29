import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallbackImageDirective } from '@core/directives/fallback-image.directive';

@NgModule({
  declarations: [FallbackImageDirective],
  imports: [CommonModule],
  exports: [FallbackImageDirective],
})
export class SharedModule {}
