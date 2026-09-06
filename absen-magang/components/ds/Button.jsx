import React from 'react';
import { Icon } from './Icon.jsx';

const TONE = {
  primary: { background: 'var(--surface-brand)', color: 'var(--text-on-brand)', border: '1px solid var(--maroon-700)', boxShadow: 'var(--shadow-brand)' },
  accent: { background: 'var(--surface-accent)', color: 'var(--slate-900)', border: '1px solid var(--gold-600)', boxShadow: 'var(--shadow-sm)' },
  secondary: { background: 'var(--white)', color: 'var(--text-brand)', border: '1px solid var(--maroon-300)', boxShadow: 'var(--shadow-xs)' },
  ghost: { background: 'transparent', color: 'var(--text-body)', border: '1px solid transparent', boxShadow: 'none' },
  dark: { background: 'var(--surface-dark)', color: 'var(--text-on-dark)', border: '1px solid var(--slate-900)', boxShadow: 'var(--shadow-md)' },
};
const SIZE = {
  sm: { height: 34, padding: '0 14px', fontSize: 'var(--fs-body-sm)', gap: 6 },
  md: { height: 42, padding: '0 20px', fontSize: 'var(--fs-body)', gap: 8 },
  lg: { height: 52, padding: '0 28px', fontSize: 'var(--fs-body-lg)', gap: 10 },
};

export function Button({ children, tone = 'primary', size = 'md', icon, iconPosition = 'left', fullWidth = false, disabled = false, type = 'button', onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const t = TONE[tone] || TONE.primary, s = SIZE[size] || SIZE.md;
  const glyph = icon ? <Icon name={icon} size={size === 'lg' ? 20 : 16} /> : null;
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)', letterSpacing: '0.005em', cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: 'var(--radius-pill)', transition: 'var(--transition-control)', opacity: disabled ? 0.45 : 1,
        filter: hover && !disabled ? 'brightness(0.94)' : 'none', transform: press && !disabled ? 'scale(var(--press-scale))' : 'none',
        ...t, ...s, ...style }}>
      {glyph && iconPosition === 'left' ? glyph : null}
      {children}
      {glyph && iconPosition === 'right' ? glyph : null}
    </button>
  );
}
