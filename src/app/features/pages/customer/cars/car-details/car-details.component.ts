import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-car-details',
  imports: [NgIf,CurrencyPipe,TranslateModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent implements OnInit {
 car: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private router: Router,
    private ctr:ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getCar(id);
  }

  getCar(id: number) {
    this.loading = true;

    this.carsService.getCar(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.car = res;
          this.ctr.detectChanges();
      },
      error: () => this.loading = false
    });
  }

  bookNow() {
    this.router.navigate(['/customer/orders/create'], { queryParams: { car_id: this.car.id } });
  }
}
