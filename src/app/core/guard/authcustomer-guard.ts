import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/pages/auth/services/auth.service';

export const authcustomerGuard: CanActivateFn = (route, state) => {
   const auth   = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn())  { router.navigate(['/login']);       return false; }
  if (!auth.isCustomer())  { router.navigate(['/admin']); return false; }
  return true;
};
