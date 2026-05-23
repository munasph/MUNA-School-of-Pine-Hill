import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'app-glass-input',
  template: `
    <div class="space-y-1.5">
      <label *ngIf="label" [for]="inputId"
             class="text-xs font-bold uppercase tracking-widest block"
             [style.color]="'var(--text-muted)'">
        {{ label }}
      </label>
      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [required]="required"
        [attr.min]="min"
        [attr.max]="max"
        [attr.step]="step"
        [value]="value"
        (input)="onInput(($any($event.target)).value)"
        (blur)="onTouched()"
        class="w-full p-3.5 rounded-xl text-sm
               bg-[var(--glass-bg)] border placeholder:text-[var(--text-muted)]
               focus:outline-none focus:ring-2 transition-all duration-200"
        [class.border-red-400]="!!error"
        [class.border-\\[var\\(--glass-border\\)\\]]="!error"
        [style.color]="'var(--text-primary)'"
        [style.backdropFilter]="'blur(12px)'"
        [style.webkitBackdropFilter]="'blur(12px)'" />
      <p *ngIf="error" class="text-red-400 text-xs">{{ error }}</p>
    </div>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: GlassInputComponent, multi: true },
  ],
  styles: [`:host { display: block; }`],
})
export class GlassInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input() step?: string | number;
  @Input() error?: string;

  inputId = `app-glass-input-${++nextId}`;

  value: string = '';
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void { this.value = value ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  onInput(v: string): void {
    this.value = v;
    this.onChange(v);
  }
}
