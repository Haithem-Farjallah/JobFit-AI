import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFallbackImage]',
})
export class FallbackImageDirective {
  @Input() appFallbackImage: string = '/profilepic.webp';

  constructor(private el: ElementRef) {}
  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.appFallbackImage;
  }
}
