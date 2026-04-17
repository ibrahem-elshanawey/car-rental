import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  imports: [NgIf, NgFor,NgClass,TranslateModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
 @Input() currentPage = 1;
  @Input() lastPage    = 1;
  @Input() total       = 0;
  @Input() perPage     = 10;
   @Output() pageChange = new EventEmitter<number>();
  @Output() action = new EventEmitter<any>();
  hasActions = false;
protected Math = Math;
ngOnChanges() {
  this.hasActions = this.columns?.some(c => c.actions?.length);
}
 get pages(): number[] {
    // Build smart page number array e.g. [1, 2, 3, 4, 5]
    const total = this.lastPage;
    const current = this.currentPage;
    const delta = 2; // pages on each side of current
    const range: number[] = [];

    const start = Math.max(1, current - delta);
    const end   = Math.min(total, current + delta);

    if (start > 1) range.push(1);
    if (start > 2) range.push(-1); // -1 = ellipsis

    for (let i = start; i <= end; i++) range.push(i);

    if (end < total - 1) range.push(-1);
    if (end < total)     range.push(total);

    return range;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.lastPage || page === this.currentPage) return;
    this.pageChange.emit(page);
  }
  changeStatus(row: any, status: string) {
  this.action.emit({
    type: 'status',
    row,
    value: status
  });
}

getStatusClass(status: string) {
  switch (status) {
    case 'pending': return 'btn-warning';
    case 'success': return 'btn-success';
    case 'failed': return 'btn-danger';
    default: return 'btn-secondary';
  }
}
}
