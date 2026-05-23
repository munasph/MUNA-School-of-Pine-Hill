import { Component, Input } from '@angular/core';

export type GlassButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type GlassButtonSize    = 'sm' | 'md' | 'lg';

/**
 * Angular port of the React `GlassButton` (motion.button).
 *
 * Class strings below are kept as full literals (not concatenated at runtime)
 * so Tailwind's JIT can detect every variant/size combination.
 */
@Component({
  selector: 'app-glass-button',
  templateUrl: './glass-button.component.html',
  styleUrls: ['./glass-button.component.css'],
})
export class GlassButtonComponent {
  @Input() variant:  GlassButtonVariant = 'primary';
  @Input() size:     GlassButtonSize    = 'md';
  @Input() type:     'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() extraClass = '';

  private readonly base =
    'inline-flex items-center justify-center gap-2 font-bold rounded-xl ' +
    'transition-all duration-200';

  private readonly variants: Record<GlassButtonVariant, string> = {
    primary:
      'bg-[var(--glass-bg-mid)] border border-[var(--glass-border)] ' +
      'text-[var(--text-primary)] hover:bg-[var(--glass-bg-strong)] ' +
      'hover:border-[var(--glass-border-strong)] backdrop-blur-sm ' +
      'disabled:opacity-40 disabled:cursor-not-allowed',
    secondary:
      'bg-transparent border border-[var(--glass-border-strong)] ' +
      'text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] ' +
      'hover:text-[var(--text-primary)] ' +
      'disabled:opacity-40 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-[var(--text-muted)] ' +
      'hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] ' +
      'disabled:opacity-40 disabled:cursor-not-allowed',
    accent:
      'bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] ' +
      'shadow-lg disabled:opacity-40 disabled:cursor-not-allowed',
  };

  private readonly sizes: Record<GlassButtonSize, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  /** Equivalent to React Motion's `whileHover={{ scale: 1.02 }}` / `whileTap={{ scale: 0.98 }}`. */
  private readonly motionScale =
    'hover:scale-[1.02] active:scale-[0.98] will-change-transform';

  get classes(): string {
    return [
      this.base,
      this.variants[this.variant],
      this.sizes[this.size],
      this.disabled ? '' : this.motionScale,
      this.extraClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
