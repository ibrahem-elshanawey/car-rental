import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../../shared/components/table/table.component";
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-list',
  imports: [TableComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {

  data: any[] = [];
  loading = false;

  // pagination
  currentPage = 1;
  lastPage = 1;
  total = 0;
  perPage = 10;

  // 🔥 columns config
  columns = [
    { key: 'id', label: '#' },
    { key: 'car_id', label: 'ORDER.CAR_ID' },
    { key: 'days', label: 'ORDER.DayS' },
    { key: 'total_price', label: 'ORDER.TOTAL_PRICE' },
    { key: 'payment_status', label: 'ORDER.PAYMENT_STATUS' },
    { key: 'order_type', label: 'ORDER.ORDER_TYPE' },

    // 🔥 actions (view only)
    { actions: ['view'] }
  ];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private ctr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(page: number = 1) {
    this.loading = true;

    this.ordersService.getOrders(page, this.perPage).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.data = res.data;

        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.total = res.total;
        this.perPage = res.per_page;
        this.ctr.detectChanges();
      },
      error: () => this.loading = false
    });
  }

  // 🔥 handle actions from table
  handleAction(event: any) {

    if (event.type === 'view') {
      this.router.navigate(['/customer/orders/details', event.row.id]);
    }

  }

  // 🔥 pagination from table
  onPageChange(page: number) {
    this.loadOrders(page);
  }
}
