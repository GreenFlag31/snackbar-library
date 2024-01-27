import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SnackbarModule } from '../../projects/ngx-snackbar-ease/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      SnackbarModule.forRoot({
        // maximum: 3,
        // closeOnNavigation: true,
      })
    ),
  ],
};
