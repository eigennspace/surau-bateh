import React from 'react';
export function RadioGroup({ label, options = [], value, onChange, name = 'radio', style }) {
  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <legend style={{ font: 'var(--text-label)', color: 'var(--text-strong)', padding: 0, marginBottom: 2 }}>{label}</legend> : null}
      {options.map(o => {
        const v = o.value ?? o, on = value === v;
        return (
          <label key={v} onClick={() => onChange && onChange(v)} style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ width: 20, height: 20, borderRadius: 'var(--radius-pill)', display: 'grid', placeItems: 'center',
              border: '1px solid ' + (on ? 'var(--maroon-700)' : 'var(--border-strong)'), background: 'var(--white)', transition: 'var(--transition-control)' }}>
              {on ? <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-pill)', background: 'var(--surface-brand)' }} /> : null}
            </span>
            <span style={{ font: 'var(--text-body-default)', color: 'var(--text-strong)' }}>{o.label ?? o}</span>
            <input type="radio" name={name} value={v} checked={on} readOnly style={{ display: 'none' }} />
          </label>
        );
      })}
    </fieldset>
  );
}
