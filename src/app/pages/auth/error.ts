import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-error',
    imports: [ButtonModule, RippleModule, RouterModule, ButtonModule],
    standalone: true,
    template: `
        <div class="relative min-h-screen w-full overflow-hidden bg-yellow-50 text-yellow-950">
            <div class="pointer-events-none absolute inset-0">
                <div class="absolute -top-12 left-6 h-72 w-72 rounded-full bg-yellow-200 opacity-70 blur-3xl"></div>
                <div class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-300 opacity-60 blur-[120px]"></div>
            </div>

            <div class="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
                <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    <div class="space-y-6">
                        <p class="text-sm font-semibold tracking-[0.4em] text-yellow-600">NOT FOUND</p>
                        <div>
                            <p class="text-6xl font-black leading-tight text-yellow-900 sm:text-7xl">Oops! 404</p>
                            <p class="mt-4 max-w-xl text-lg text-yellow-900/80">
                                La página que buscas se desvaneció entre nuestras vitrinas. Comprueba la dirección o
                                regresa al panel para seguir explorando.
                            </p>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <a
                                routerLink="/"
                                class="inline-flex items-center justify-center rounded-full border border-yellow-900/20 bg-yellow-900 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-yellow-50 transition hover:-translate-y-0.5 hover:bg-yellow-800"
                            >
                                Volver al dashboard
                            </a>
                            <button
                                type="button"
                                class="inline-flex items-center justify-center rounded-full border border-yellow-900/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-yellow-900 transition hover:-translate-y-0.5 hover:border-yellow-900"
                                (click)="handleBack()"
                            >
                                Ir atrás
                            </button>
                        </div>
                    </div>

                    <div class="relative">
                        <div class="rounded-[2.5rem] border border-yellow-900/10 bg-white/90 p-10 shadow-[0_40px_120px_rgba(255,193,7,0.35)] backdrop-blur">
                            <div class="flex items-center justify-between text-xs font-semibold text-yellow-500">
                                <span>STATUS</span>
                                <span class="text-yellow-900">CODE 404</span>
                            </div>
                            <div class="mt-8 space-y-4">
                                <div class="rounded-2xl border border-yellow-900/10 bg-yellow-100/80 p-5">
                                    <p class="text-sm font-semibold text-yellow-900">Revisa la URL</p>
                                    <p class="text-sm text-yellow-900/70">Asegúrate de que el enlace esté bien escrito.</p>
                                </div>
                                <div class="rounded-2xl border border-yellow-900/10 bg-yellow-100/80 p-5">
                                    <p class="text-sm font-semibold text-yellow-900">Contacta soporte</p>
                                    <p class="text-sm text-yellow-900/70">Si deberías ver esta página, avísanos.</p>
                                </div>
                            </div>
                        </div>
                        <div class="absolute -bottom-10 left-1/2 w-[160%] -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-200 to-transparent px-10 py-6 text-center text-xs font-medium uppercase tracking-[0.35em] text-yellow-600 opacity-70">
                            tienda j3m
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
})
export class Error {
    protected handleBack(): void {
        history.back();
    }
}
