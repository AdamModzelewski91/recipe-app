import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { provideQuillConfig } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    provideQuillConfig({
      customOptions: [
        {
          import: 'formats/font',
          whitelist: [
            'mirza',
            'roboto',
            'aref',
            'serif',
            'sansserif',
            'monospace',
          ],
        },
      ],
    }),
  ],
};
