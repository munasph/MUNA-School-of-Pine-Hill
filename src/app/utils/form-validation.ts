import { AbstractControl } from '@angular/forms';

/** Same pattern used by the contact form. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns a user-facing error string when a control is touched and invalid.
 * Returns null when the field is valid or has not been touched yet.
 */
export function fieldError(
  control: AbstractControl | null | undefined,
  label: string,
  custom?: Partial<Record<'required' | 'pattern' | 'email' | 'minlength', string>>,
): string | null {
  if (!control?.touched || !control.errors) return null;

  const errors = control.errors;

  if (errors['required']) {
    return custom?.required ?? `${label} is required`;
  }
  if (errors['email'] || errors['pattern']) {
    return custom?.pattern ?? custom?.email ?? 'Invalid email format';
  }
  if (errors['minlength']) {
    return custom?.minlength
      ?? `${label} must be at least ${errors['minlength'].requiredLength} characters`;
  }

  return null;
}
