import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
import { NavbaradminComponent } from "../../../../../shared/components/navbaradmin/navbaradmin.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [SidebarComponent, NavbaradminComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

}
