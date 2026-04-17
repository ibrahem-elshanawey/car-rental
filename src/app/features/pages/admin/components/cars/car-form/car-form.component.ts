import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-form.component',
  imports: [ReactiveFormsModule,NgIf,FormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss',
})
export class CarFormComponent implements OnInit {

  isEdit = false;
  id!: number;
  form!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private ctr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    kilometers: ['', Validators.required],
    price_per_day: ['', Validators.required]
  });

  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    if (this.id) {
      this.isEdit = true;
      this.carService.getCar(this.id).subscribe((res: any) => {
       const car = res;

  if (car) {
    this.form.patchValue({
      name: car.name,
      brand: car.brand,
      model: car.model,
      kilometers: car.kilometers,
      price_per_day: car.price_per_day
    });
    this.form.updateValueAndValidity();
  }
      });
    }
  }

  submit() {
     if (this.form.invalid) {
    this.form.markAllAsTouched(); // 🔥 أهم سطر
    return;
  }
    const request = this.isEdit
      ? this.carService.updateCar(this.id, this.form.value)
      : this.carService.createCar(this.form.value);

    request.subscribe({
    next: () => {

      // 🔥 Toastr
      this.toastr.success(
        this.isEdit ? 'Car updated successfully' : 'Car created successfully',
        'Success'
      );

      // 🔥 مهم مع zoneless
      this.ctr.detectChanges();

      // 🔥 navigation بعد frame
      requestAnimationFrame(() => {
        this.router.navigate(['/admin/cars']);
      });
    },

    error: () => {
      this.toastr.error('Something went wrong', 'Error');
      this.ctr.detectChanges();
    }
  });
  }
  get f() {
  return this.form.controls;
}
}
