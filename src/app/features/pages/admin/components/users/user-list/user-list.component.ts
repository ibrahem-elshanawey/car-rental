import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { TableComponent } from "../../../../../../shared/components/table/table.component";
import { UserFilterComponent } from "../user-filter/user-filter.component";

@Component({
  selector: 'app-user-list',
  imports: [TableComponent, UserFilterComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
users: any[] = [];
  loading = false;

  currentPage = 1;
  lastPage = 1;
  total = 0;
  perPage = 10;

  filters: any = {
    per_page: 10
  };

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'country', label: 'Country' },
    { actions: ['view'] }
  ];

  constructor(
    private usersService: UsersService,
    private router: Router,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers({ per_page: 10 });
  }

  loadUsers(filters?: any) {

    if (filters !== undefined) {
      this.filters = {
      per_page: this.perPage,
      ...filters
    };

    this.currentPage = 1;
    }

    this.loading = true;

    this.usersService.getUsers({
      ...this.filters,
      page: this.currentPage
    }).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.users = res?.data ?? [];
        this.currentPage = res?.current_page;
        this.lastPage = res?.last_page || 1;
        this.total = res?.total;
        this.perPage = res?.per_page;
         this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  // actions
  handleAction(event: any) {

    if (event.type === 'view') {
      this.viewUser(event.row.id);
    }
  }

  viewUser(id: number) {
    this.router.navigate(['/admin/users/details', id]);
  }
}
