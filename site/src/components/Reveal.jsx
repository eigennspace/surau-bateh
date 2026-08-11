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
      // Trigger once the section is meaningfully inside the viewport (not
      // the instant its edge appears at the bottom) so the fade plays out
      // while it's actually on screen instead of finishing before the
      // user's eye gets there during a normal scroll.
      { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }
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
        // No `transform` at all once visible -- not even a no-op
        // `translateY(0px)`. A *live* transform value makes this element a
        // CSS containing block for any `position: fixed` descendant (e.g.
        // `PhotoLightbox`), so those descendants end up fixed to *this* box
        // instead of the viewport. That's what made the photo detail modal
        // render off-center (or fully out of view) once the page had
        // scrolled: `inset: 0` was resolving against the Reveal wrapper's
        // document-flow box, not the viewport. Transitioning `transform`
        // to/from `none` animates fine (browsers treat `none` as the
        // identity transform), so this drops the transform the instant the
        // reveal completes without needing an extra "settled" state or a
        // `transitionend` listener.
        transform: reduced || visible ? undefined : 'translateY(8px)',
        // Slightly longer than --dur-slow (420ms) on purpose: at that speed
        // the fade finished before it was noticeable during a normal
        // scroll. 600ms keeps the same easing/feel but gives the eye time
        // to catch it.
        transition: reduced ? undefined : 'opacity 600ms var(--ease-standard), transform 600ms var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
