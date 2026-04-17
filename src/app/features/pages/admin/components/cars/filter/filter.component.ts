import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent  {
filters: any = {};

  @Output() filterChange = new EventEmitter<any>();

 

  apply() {
    const cleanFilters: any = {};

  Object.keys(this.filters).forEach(key => {
    const value = this.filters[key];

    if (value !== null && value !== undefined && value !== '') {
      cleanFilters[key] = value;
    }
  });

  this.filterChange.emit(cleanFilters);
  }
}
