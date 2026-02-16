import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, ButtonModule],
    template: `
        <div class="relative min-h-screen w-full overflow-hidden bg-yellow-50 text-yellow-950">
            <div class="pointer-events-none absolute inset-0">
                <div class="absolute -top-12 left-6 h-72 w-72 rounded-full bg-yellow-200 opacity-70 blur-3xl"></div>
                <div class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-300 opacity-60 blur-[120px]"></div>
            </div>

            <div class="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
                <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    <div class="space-y-6">
                        <p class="text-sm font-semibold tracking-[0.4em] text-surface-800 ">PAGINA NO ENCONTRADA</p>
                        <div>
                            <p class="text-6xl font-black leading-tight text-surface-800  sm:text-7xl">Oops! 404</p>
                            <p class="mt-4 max-w-xl text-lg text-surface-800">
                                La página que buscas se desvaneció entre nuestras vitrinas. Comprueba la dirección o
                                regresa a la tienda web para seguir explorando.
                            </p>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <a routerLink="/" class="inline-flex items-center justify-center rounded-full border bg-surface-800  px-8 py-3 text-sm font-semibold uppercase tracking-wide text-yellow-50 transition hover:-translate-y-0.5 hover:bg-surface-900">
                                Volver al sitio web
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})
export class Notfound { }
