import { ChangeDetectorRef, Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loading = false;
  error = '';
  role: 'customer' | 'admin' = 'customer';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
     private cdr:   ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  setRole(role: 'customer' | 'admin') {
    this.role = role;
    this.error = '';
    this.form.reset();
  }
  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const call =
      this.role === 'admin'
        ? this.auth.adminLogin(this.form.value)
        : this.auth.login(this.form.value);

    call.subscribe({
      next: (res) => {
        this.loading = false;
        // Navigate based on actual role returned by API
        res.user.role === 'admin'
          ? this.router.navigate(['/admin/users'])
          : this.router.navigate(['/customer/cars']);
      },
      error: (errorMessage: string) => {
        this.loading = false;
        this.error = errorMessage;
         this.cdr.detectChanges();
      },
    });
  }
}
