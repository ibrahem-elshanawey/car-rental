import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InstallmentsService } from '../services/installments.service';
import { TableComponent } from "../../../../shared/components/table/table.component";

@Component({
  selector: 'app-installments',
  imports: [TableComponent],
  templateUrl: './installments.component.html',
  styleUrl: './installments.component.scss',
})
export class InstallmentsComponent implements OnInit {

  data: any[] = [];
  loading = false;

  currentPage = 1;
  lastPage = 1;
  total = 0;
  perPage = 10;

  columns = [
    { key: 'id', label: '#' },
    { key: 'amount', label: 'INSTALLMENTS.AMOUNT' },
    { key: 'due_date', label: 'INSTALLMENTS.DUE_DATE' },
    { key: 'status', label: 'INSTALLMENTS.STATUS' },

    // 🔥 زر الدفع
    { actions: ['pay'] }
  ];

  constructor(private service: InstallmentsService,
    private ctr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }

  load(page: number = 1) {
    this.loading = true;

    this.service.getInstallments(page, this.perPage).subscribe({
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

  handleAction(event: any) {
    if (event.type === 'pay') {
      this.pay(event.row);
    }
  }

  pay(row: any) {

    if (row.status === 'paid') return;

    row.loading = true; // 🔥 UI loading

    this.service.payInstallment(row.id).subscribe({
      next: () => {

        // 🔥 تحديث فوري
        row.status = 'paid';
        row.loading = false;
        this.ctr.detectChanges();

      },
      error: () => {
        row.loading = false;
        alert('Payment failed');
        this.ctr.detectChanges();
      }
    });
  }

  onPageChange(page: number) {
    this.load(page);
  }
}
