import React, { useEffect, useRef, useState } from 'react';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(reducedMotionQuery).matches
    : false;

/**
 * Reveal — wraps a block-level section and fades it in (opacity + small
 * translateY) the first time it enters the viewport while scrolling.
 * Reveals once per element (observer is disconnected after the first hit).
 * Respects prefers-reduced-motion: content shows instantly, no animation.
 */
export default function Reveal({ children, as: Tag = 'div', style, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return undefined;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reduced = prefersReducedMotion();

  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: reduced ? undefined : `translateY(${visible ? 0 : 8}px)`,
        transition: reduced ? undefined : 'opacity var(--dur-slow) var(--ease-standard), transform var(--dur-slow) var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
