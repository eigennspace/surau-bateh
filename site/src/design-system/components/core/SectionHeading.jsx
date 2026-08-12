import React from 'react';

// Parses **bold** and *italic* inside a single line of text into React nodes.
function parseInline(text) {
  const tokens = text.split(/(\*\*.+?\*\*|\*.+?\*)/g).filter(Boolean);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={i}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={i}>{token.slice(1, -1)}</em>;
    }
    return token;
  });
}

// Parses a description string with \n line breaks and **bold**/*italic* markup.
function parseDescription(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {parseInline(line)}
      {i < lines.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}

export function SectionHeading({ overline, title, description, align = 'left', arabic, style }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start', maxWidth: align === 'center' ? 640 : 'none',
      margin: align === 'center' ? '0 auto' : 0, fontFamily: 'var(--font-sans)', ...style }}>
      {overline ? <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase',
        color: 'var(--text-brand)', fontSize: 'var(--fs-overline)' }}>{overline}</span> : null}
      {arabic ? <span style={{ fontFamily: 'var(--font-arabic)', fontSize: 'var(--fs-arabic)', color: 'var(--gold-700)', lineHeight: 'var(--lh-arabic)' }}>{arabic}</span> : null}
      <h2 style={{ margin: 0, font: 'var(--text-h2)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-strong)', textWrap: 'balance' }}>{title}</h2>
      {description ? (
        <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 560, textWrap: 'pretty' }}>
          {typeof description === 'string' ? parseDescription(description) : description}
        </p>
      ) : null}
    </header>
  );
}
