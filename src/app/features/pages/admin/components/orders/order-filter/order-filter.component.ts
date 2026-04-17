import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-filter',
  imports: [FormsModule],
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.scss',
})
export class OrderFilterComponent {
filters: any = {
   search: '',
  user_id: '',
  car_id: '',
  payment_status: '',
  payment_type: '',
  order_type: ''
};

  @Output() filterChange = new EventEmitter<any>();

 

  apply() {

  const clean: any = {};

  Object.keys(this.filters).forEach(key => {
    if (this.filters[key]) {
      clean[key] = this.filters[key];
    }
  });

  this.filterChange.emit(clean);
}
}
