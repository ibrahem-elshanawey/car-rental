import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-filter',
  imports: [FormsModule],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.scss',
})
export class UserFilterComponent {
filters: any = {
  search: '',
  role: '',
  country: ''
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
