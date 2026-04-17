import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive,NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
 isOpen = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {

    this.sidebarService.sidebarOpen$.subscribe(val => {
      this.isOpen = val;
    });

    // 🔥 الحل هنا
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.sidebarService.close();
      });
  }

  close() {
    this.sidebarService.close();
  }
  
}
