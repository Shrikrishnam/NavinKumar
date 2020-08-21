import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {

  //Directive for autofocus on input element
  constructor(private el: ElementRef) { }

  ngAfterViewInit(){
    this.el.nativeElement.focus();
  }
}
