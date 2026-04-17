import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/pages/auth/services/auth.service';
import { User } from '../../../features/pages/auth/models/auth.model';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbarcustomer',
  imports: [NgIf,RouterLink,NgClass,RouterLinkActive,TranslateModule],
  templateUrl: './navbarcustomer.component.html',
  styleUrl: './navbarcustomer.component.scss',
})
export class NavbarcustomerComponent implements OnInit {
 user: User | null = null;
currentTheme: string = 'light';
currentLang: string = 'en';

  constructor(private authService: AuthService,private theme: ThemeService,private langService: LanguageService) {}

  ngOnInit(): void {
    // Step 1 — show stored user instantly (no loading flash)
    this.user = this.authService.getCurrentUser();
    this.currentLang = this.langService.getCurrentLang();

    // Step 2 — refresh from API in background
    this.authService.getMe().subscribe({
      next: (res) => {
        this.user = res; // update with fresh data
      }, 
      error: () => {
        // token may be expired — keep showing stored user
      }
    });
    this.currentTheme = this.theme.getTheme();

  }

logout(): void {
  this.authService.logout();
}
  toggleTheme() {
    this.theme.toggle();
    this.currentTheme = this.theme.getTheme(); // 🔥 تحديث الأيقونة
  }
  toggleLang() {
  const newLang = this.currentLang === 'en' ? 'ar' : 'en';
  this.langService.switchLang(newLang);
  this.currentLang = newLang;
}
}
