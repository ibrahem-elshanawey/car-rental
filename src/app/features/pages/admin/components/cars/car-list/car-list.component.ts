import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { CarService } from '../../../services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-list',
  imports: [FilterComponent, TableComponent,RouterLink],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
cars: any[] = [];
  loading = false;
  currentPage = 1;
  lastPage    = 1;
  total       = 0;
  perPage     = 10;
  filters: any = {
  per_page: 10
};
  columns = [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'price_per_day', label: 'Price' },
    { key: 'kilometers', label: 'Kilometers' },
    { actions: ['edit', 'delete'] }
  ];

  constructor(private carService: CarService,private router: Router,private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
   this.loadCars({ per_page: 10 });
   
  }

loadCars(filters?: any) {

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

   this.carService.getCars(params).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.cars = res?.data ?? [];
        this.total       = res?.total       ?? 0;
        this.lastPage    = res?.last_page   ?? 1;
        this.currentPage = res?.current_page ?? 1;
         this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadCars();
  }
  handleAction(event: any) {
    if (event.type === 'delete') {
      this.deleteCar(event.row.id);
    }

     if (event.type === 'edit') {
    this.editCar(event.row.id);
  }
  
  }

  deleteCar(id: number) {
    if (!confirm('Are you sure you want to delete this car?')) return;
   this.carService.deleteCar(id).subscribe({
    next: () => {

      // 🔥 Toastr success
      this.toastr.success('Car deleted successfully', 'Success');

      // 🔥 مهم مع zoneless
      this.cdr.detectChanges();

      // 🔥 pagination fix
      if (this.cars.length === 1 && this.currentPage > 1) {
        this.currentPage--;
      }

      // 🔥 reload بعد frame
      requestAnimationFrame(() => {
        this.loadCars({
          page: this.currentPage,
          per_page: 10
        });
      });

    },

    error: () => {
      this.toastr.error('Failed to delete car', 'Error');
      this.cdr.detectChanges();
    }
  });
  }
  editCar(id: number) {
  this.router.navigate(['/admin/cars/edit', id]);
}
}
