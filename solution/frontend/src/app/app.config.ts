import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LanguageService } from './services/language.service';
import { environment } from '../environments/environment';

export function initializeApplication(languageService: LanguageService) {
  return (): Promise<void> => {
    let language = localStorage.getItem('language');
    if (!language || !environment.languages.includes(language))
      language = 'en';
    return languageService.selectLanguage(language);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      multi: true,
      deps: [LanguageService],
    },
  ]
};
