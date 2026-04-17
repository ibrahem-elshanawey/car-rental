import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard';
import { authcustomerGuard } from './core/guard/authcustomer-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/pages/auth/components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/pages/auth/components/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/pages/admin/components/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./features/pages/admin/components/users/user-list/user-list.component').then(
            (m) => m.UserListComponent,
          ),
      },
      {
        path: 'users/details/:id',
        loadComponent: () =>
          import('./features/pages/admin/components/users/user-details/user-details.component').then(
            (m) => m.UserDetailsComponent,
          ),
      },
      {
        path: 'cars',
        loadComponent: () =>
          import('./features/pages/admin/components/cars/car-list/car-list.component').then(
            (m) => m.CarListComponent,
          ),
      },
      {
        path: 'cars/add',
        loadComponent: () =>
          import('./features/pages/admin/components/cars/car-form/car-form.component').then(
            (m) => m.CarFormComponent,
          ),
      },
      {
        path: 'cars/edit/:id',
        loadComponent: () =>
          import('./features/pages/admin/components/cars/car-form/car-form.component').then(
            (m) => m.CarFormComponent,
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/pages/admin/components/orders/order-list/order-list.component').then(
            (m) => m.OrderListComponent,
          ),
      },
      {
        path: 'orders/details/:id',
        loadComponent: () =>
          import('./features/pages/admin/components/orders/order-details/order-details.component').then(
            (m) => m.OrderDetailsComponent,
          ),
      }
    ],
  },
{
    path:'customer',
    loadComponent: () =>
      import('./features/pages/customer/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    canActivate: [authcustomerGuard],
    children: [
        {path:'cars', loadComponent: () => import('./features/pages/customer/cars/cars-list/cars-list.component').then(m => m.CarsListComponent)},
        {path:'cars/details/:id', loadComponent: () => import('./features/pages/customer/cars/car-details/car-details.component').then(m => m.CarDetailsComponent)},
        {path:'orders', loadComponent: () => import('./features/pages/customer/orders/order-list/order-list.component').then(m => m.OrderListComponent)},
        {path:'orders/create', loadComponent: () => import('./features/pages/customer/orders/create-order/create-order.component').then(m => m.CreateOrderComponent)},
        {path:'orders/details/:id', loadComponent: () => import('./features/pages/customer/orders/order-details/order-details.component').then(m => m.OrderDetailsComponent)},
        {path:'installments', loadComponent: () => import('./features/pages/customer/installments/installments.component').then(m => m.InstallmentsComponent)},
    ]
},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
