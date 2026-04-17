import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
 return next(req).pipe(
    catchError((error) => {

      let errorMessage = 'Something went wrong';

      // 🔴 Validation Error
      if (error.status === 422) {
        const errors = error.error?.errors;

        if (errors) {
          errorMessage = Object.values(errors).flat().join(', ');
        }
      }

      // 🔴 Unauthorized
      else if (error.status === 401) {
      errorMessage = error.error?.message || 'Invalid email or password.';
      }

      // 🔴 Server Error
      else if (error.status === 500) {
        errorMessage = 'Server error, try later';
      }

      // 🔴 Network Error
      else if (error.status === 0) {
        errorMessage = 'No internet connection';
      }

      // 🔴 Default
      else {
        errorMessage = error.error?.message || errorMessage;
      }

      // 🔥 مهم جداً
      return throwError(() => errorMessage);
    })
  );
};
