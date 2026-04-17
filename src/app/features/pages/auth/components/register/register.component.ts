import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
loading = false;
  errorMessage = '';

    form!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ctr: ChangeDetectorRef
  ) {

    this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
    country: ['', Validators.required]

  }, {
    validators: this.passwordMatchValidator
  });
  }

 

  // ✅ Custom Validator
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirm = form.get('password_confirmation')?.value;

    return password === confirm ? null : { mismatch: true };
  }

  // ✅ Submit
  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
        error: (errMessage: string) => {
        this.loading = false;
        this.errorMessage = errMessage;
          this.ctr.detectChanges();
      }
    });
  }

  // Helpers
  get f() {
    return this.form.controls;
  }
}
