import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [NgIf,DatePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
order: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private cdr: ChangeDetectorRef
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
        this.order = res;
          this.cdr.detectChanges();
      },
      error: () => this.loading = false
    });
  }
}
