import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Active HttpClient à l’échelle globale
    // Permet d’injecter HttpClient dans les services (ex: Weather service)
    provideHttpClient(),
  ],
};
