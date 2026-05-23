import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'app-glass-input',
  templateUrl: './glass-input.component.html',
  styleUrls: ['./glass-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: GlassInputComponent, multi: true },
  ],
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
