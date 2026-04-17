import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [NgIf,DatePipe,FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
 user: any;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getUser(id);
  }

  getUser(id: number) {
    this.loading = true;

    this.usersService.getUser(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.user = res;
         this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load user';
      }
    });
  }
}
