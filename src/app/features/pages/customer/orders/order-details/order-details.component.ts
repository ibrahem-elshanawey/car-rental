import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-details',
  imports: [NgIf,NgFor,NgClass,DatePipe,TitleCasePipe,RouterLink,CurrencyPipe,TranslateModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {

  order: any;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private ctr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getOrder(id);
  }

  getOrder(id: number) {
    this.loading = true;

    this.ordersService.getOrder(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.order = res; // 🔥 مهم (مش res.data)
        this.ctr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load order';
        this.ctr.detectChanges();

      }
    });
  }

  // 🔥 status badge
  getStatusClass(status: string) {
    return {
      'bg-warning': status === 'pending',
      'bg-success': status === 'success',
      'bg-danger': status === 'failed'
    };
  }
}
