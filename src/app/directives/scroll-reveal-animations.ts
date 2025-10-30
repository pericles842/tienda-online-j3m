import { RevealOptions } from '@/interfaces/scroll-reveal';
import { Directive, ElementRef, Input, OnInit, OnDestroy, HostBinding, Renderer2, input } from '@angular/core';
import ScrollReveal from 'scrollreveal'; // 👈 Importamos ScrollReveal

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealAnimations {
  /**
   *configuration de la animación
   *
   * @type {RevealOptions}
   * @memberof ScrollRevealAnimations
   */
  @Input() config: RevealOptions = {};

  @Input() delay: number = 200;
  @Input() duration: number = 600;
  @Input() distance: string = '200px';
  @Input() origin: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() rotate: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  @Input() scale: number = 1;

  // private srInstance: any;

  // constructor(private el: ElementRef) {
  //   this.srInstance = ScrollReveal();
  // }

  // ngOnInit(): void {
  //   const element = this.el.nativeElement;

  //   // Define las opciones por defecto
  //   const defaultOptions: RevealOptions = {
  //     delay: this.delay,
  //     duration: this.duration,
  //     distance: this.distance,
  //     origin: this.origin,
  //     rotate: this.rotate,
  //     scale: this.scale,
  //     reset: false
  //   };

  //   // Combina y usa la instancia para revelar el elemento
  //   const config = Object.keys(this.config).length === 0 ? defaultOptions : this.config;
  //   this.srInstance.reveal(element, config);
  // }
}
