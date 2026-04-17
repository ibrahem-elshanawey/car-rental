import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { TableComponent } from "../../../../../../shared/components/table/table.component";
import { OrderFilterComponent } from "../order-filter/order-filter.component";

@Component({
  selector: 'app-order-list',
  imports: [TableComponent, OrderFilterComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
 orders: any[] = [];
  loading = false;

  currentPage = 1;
  lastPage = 1;
  total = 0;
  perPage = 10;

  filters: any = { per_page: 10 };

  columns = [
    { key: 'id', label: '#' },
    { key: 'user_id', label: 'User' },
    { key: 'car_id', label: 'Car' },
    { key: 'payment_type', label: 'Payment Type' },
    { key: 'payment_status', label: 'Status' },
    { key: 'order_type', label: 'Order Type' },
    { actions: ['view', 'status'] } 
  ];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadOrders(
      { per_page: 10 }
    );
  }

  loadOrders(filters?: any) {

    if (filters !== undefined) {
      this.filters = { per_page: this.perPage, ...filters };
      this.currentPage = 1;
    }

    this.loading = true;

    this.ordersService.getOrders({
      ...this.filters,
      page: this.currentPage
    }).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.orders = res?.data ?? [];
        this.currentPage = res?.current_page;
        this.lastPage = res?.last_page || 1;
        this.total = res?.total;
        
        this.cdr.detectChanges();

      },
      error: () => this.loading = false
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadOrders();
  }

  handleAction(event: any) {
    if (event.type === 'view') {
      this.router.navigate(['/admin/orders/details', event.row.id]);
    }

    if (event.type === 'status') {
      this.updateStatus(event.row, event.value);
    }
  }

  updateStatus(order: any, newStatus: string) {
    const oldStatus = order.payment_status ;
order.payment_status = newStatus;
    this.ordersService.updateOrder(order.id, {
      payment_status: newStatus
    }).subscribe(() => {
      this.loadOrders();
    });
  }
}
