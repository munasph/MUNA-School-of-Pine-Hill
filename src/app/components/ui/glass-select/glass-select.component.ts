import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

export interface GlassOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-glass-select',
  template: `
    <div class="space-y-1.5">
      <label *ngIf="label" [for]="selectId"
             class="text-xs font-bold uppercase tracking-widest block"
             [style.color]="'var(--text-muted)'">
        {{ label }}
      </label>
      <select
        [id]="selectId"
        [required]="required"
        [value]="value"
        (change)="onSelect(($any($event.target)).value)"
        (blur)="onTouched()"
        class="w-full p-3.5 rounded-xl text-sm appearance-none cursor-pointer
               bg-[var(--glass-bg)] border
               focus:outline-none focus:ring-2 transition-all duration-200"
        [class.border-red-400]="!!error"
        [class.border-\\[var\\(--glass-border\\)\\]]="!error"
        [style.color]="'var(--text-primary)'"
        [style.backdropFilter]="'blur(12px)'"
        [style.webkitBackdropFilter]="'blur(12px)'">
        <option *ngFor="let o of options" [value]="o.value"
                [style.backgroundColor]="'var(--bg-deep)'"
                [style.color]="'var(--text-primary)'">
          {{ o.label }}
        </option>
      </select>
      <p *ngIf="error" class="text-red-400 text-xs">{{ error }}</p>
    </div>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: GlassSelectComponent, multi: true },
  ],
  styles: [`:host { display: block; }`],
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
