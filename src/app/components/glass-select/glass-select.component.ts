import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

export interface GlassOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-glass-select',
  templateUrl: './glass-select.component.html',
  styleUrls: ['./glass-select.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: GlassSelectComponent, multi: true },
  ],
})
export class GlassSelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() options: GlassOption[] = [];
  @Input() required = false;
  @Input() error?: string;

  @Output() valueChange = new EventEmitter<string>();

  selectId = `app-glass-select-${++nextId}`;

  value: string = '';
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void { this.value = value ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  onSelect(v: string): void {
    this.value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }
}
