import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.use(lang);
    this.setDirection(lang);
  }

  switchLang(lang: 'en' | 'ar') {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.setDirection(lang);
  }

  getCurrentLang() {
    return this.translate.currentLang || 'en';
  }

  private setDirection(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
