import { Component } from '@angular/core';
import { AuthService } from '../../../features/pages/auth/services/auth.service';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-navbaradmin',
  imports: [],
  templateUrl: './navbaradmin.component.html',
  styleUrl: './navbaradmin.component.scss',
})
export class NavbaradminComponent {
  constructor(private auths: AuthService,private sidebarService: SidebarService) { }
  logout() {
    this.auths.logout();
  }
  toggleSidebar() {
  this.sidebarService.toggle();
}
}
