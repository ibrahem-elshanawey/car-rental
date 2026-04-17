import { ChangeDetectorRef, Component } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { FilterComponent } from "../../../admin/components/cars/filter/filter.component";
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cars-list',
  imports: [NgIf, NgFor, PaginationComponent, FilterComponent,RouterLink,CurrencyPipe,TranslateModule],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss',
})
export class CarsListComponent {
cars: any[] = [];
loading = false;
 currentPage = 1;
  lastPage    = 1;
  total       = 0;
  perPage     = 10;
  filters: any = {
  per_page: 10
};
  constructor(private carsService: CarsService,private ctr:ChangeDetectorRef) {}

  ngOnInit() {
    this.getCars({ per_page: 10 });
  }

  getCars(filters?: any) {
    if (filters !== undefined) {
      this.filters = {
      per_page: this.perPage,
      ...filters
    };

    this.currentPage = 1;
    }

   

    const params = {
      ...this.filters,
      page:     this.currentPage,
      per_page: this.perPage
    };
    this.loading = true;

    this.carsService.getCars(params).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.cars = res.data ?? [];
         this.total       = res?.total       ?? 0;
        this.lastPage    = res?.last_page   ?? 1;
        this.currentPage = res?.current_page ?? 1;
          this.ctr.detectChanges();
      },
      error: () => this.loading = false
    });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getCars();
  }
}
