import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // private key = 'theme';
private themeKey = 'theme';

  private themeSubject = new BehaviorSubject<string>(this.getTheme());
  theme$ = this.themeSubject.asObservable();
  // init() {
  //   const saved = localStorage.getItem(this.key) || 'light';
  //   this.setTheme(saved);
  // }

  // toggle() {
  //   const current = localStorage.getItem(this.key) || 'light';
  //   const newTheme = current === 'light' ? 'dark' : 'light';

  //   this.setTheme(newTheme);
  // }

  // setTheme(theme: string) {
  //   document.body.classList.remove('light-theme', 'dark-theme');
  //   document.body.classList.add(`${theme}-theme`);
  //   localStorage.setItem(this.key, theme);
  // }

  // getTheme() {
  //   return localStorage.getItem(this.key) || 'light';
  // }
  toggle() {
  const newTheme = this.getTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem(this.themeKey, newTheme);
    this.themeSubject.next(newTheme); // 🔥 notify subscribers
  }

  getTheme() {
    return localStorage.getItem(this.themeKey) || 'light';
  }
}
