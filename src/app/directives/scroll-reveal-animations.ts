import { RevealOptions } from '@/interfaces/scroll-reveal';
import { Directive, ElementRef, Input, OnInit, OnDestroy, HostBinding, Renderer2 } from '@angular/core';
import ScrollReveal from 'scrollreveal'; // 👈 Importamos ScrollReveal

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealAnimations {

  @Input() config: RevealOptions = {};
  private srInstance: any;


  constructor(
    private el: ElementRef,
  ) {
    this.srInstance = ScrollReveal();
  }

  ngOnInit(): void {
    const element = this.el.nativeElement;

    // Define las opciones por defecto
    const defaultOptions: RevealOptions = {
      delay: 200,
      duration: 600,
      distance: '50px',
      origin: 'bottom',
      reset: false
    };

    // Combina y usa la instancia para revelar el elemento
    const config = { ...defaultOptions, ...this.config };
    this.srInstance.reveal(element, config);
  }
}
