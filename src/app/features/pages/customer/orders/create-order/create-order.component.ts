import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-order',
  imports: [ReactiveFormsModule,NgIf,TranslateModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent implements OnInit {
form!: FormGroup;
  loading = false;
  error = '';
 

  carId!: number;
  showInstallments = false;

  // UI helpers
  days = 0;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router,
    private toastr: ToastrService,
    private ctr: ChangeDetectorRef

  ) {}

  ngOnInit() {

    this.carId = +this.route.snapshot.queryParamMap.get('car_id')!;

    this.form = this.fb.group({
      delivery_date: ['', Validators.required],
      receiving_date: ['', Validators.required],
      payment_type: ['cash', Validators.required],
      order_type: ['full', Validators.required],

      // installments
      down_payment: [''],
      number_of_installments: ['']
    });

    // 🔥 Order Type Change
    this.form.get('order_type')?.valueChanges.subscribe(val => {
      this.showInstallments = val === 'installments';

      if (this.showInstallments) {
        this.form.get('down_payment')?.setValidators([Validators.required, Validators.min(1)]);
        this.form.get('number_of_installments')?.setValidators([Validators.required,  Validators.min(1),Validators.max(12)]);
      } else {
        this.form.patchValue({
          down_payment: null,
          number_of_installments: null
        });

        this.form.get('down_payment')?.clearValidators();
        this.form.get('number_of_installments')?.clearValidators();
      }

      this.form.get('down_payment')?.updateValueAndValidity();
      this.form.get('number_of_installments')?.updateValueAndValidity();
    });

    // 🔥 Calculate days
    this.form.valueChanges.subscribe(val => {
      if (val.delivery_date && val.receiving_date) {
        const d1 = new Date(val.delivery_date);
        const d2 = new Date(val.receiving_date);

        this.days = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const payload: any = {
      car_id: this.carId,
      delivery_date: this.form.value.delivery_date,
      receiving_date: this.form.value.receiving_date,
      payment_type: this.form.value.payment_type,
      order_type: this.form.value.order_type
    };

    if (this.showInstallments) {
      payload.down_payment = this.form.value.down_payment;
      payload.number_of_installments = this.form.value.number_of_installments;
    }

    this.ordersService.createOrder(payload).subscribe({
      next: () => {
        this.loading = false;
        
        
      this.toastr.success('Order created successfully', 'Success');

        setTimeout(() => {
          this.router.navigate(['/customer/orders']);
        }, 1200);
      },
      error: (errorMessage: string) => {
        this.loading = false;

        this.error = errorMessage;
        this.toastr.error(errorMessage, 'Error');
        this.ctr.detectChanges();
        
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}
