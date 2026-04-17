import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarcustomerComponent } from "../../../../shared/components/navbarcustomer/navbarcustomer.component";
import { FootercustomerComponent } from "../../../../shared/components/footercustomer/footercustomer.component";
import { ThemeService } from '../../../../core/services/theme.service';
import { NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout.component',
  imports: [RouterOutlet, NavbarcustomerComponent, FootercustomerComponent,NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
 currentTheme = 'light';

constructor(private theme: ThemeService, translate: TranslateService) {
   translate.setDefaultLang('en');
}

ngOnInit() {
  
   this.theme.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

}

toggleTheme() {
  this.theme.toggle();
}

}
