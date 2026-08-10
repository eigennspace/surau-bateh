/* @ds-bundle: {"format":4,"namespace":"SurauBatehLoriDesignSystem_c76578","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"BottomBar","sourcePath":"components/navigation/BottomBar.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ArabicVerse","sourcePath":"components/surau/ArabicVerse.jsx"},{"name":"DonationProgress","sourcePath":"components/surau/DonationProgress.jsx"},{"name":"EventItem","sourcePath":"components/surau/EventItem.jsx"},{"name":"PhotoTile","sourcePath":"components/surau/PhotoTile.jsx"},{"name":"PrayerTimeRow","sourcePath":"components/surau/PrayerTimeRow.jsx"},{"name":"PrayerTimeTable","sourcePath":"components/surau/PrayerTimeTable.jsx"},{"name":"StatBlock","sourcePath":"components/surau/StatBlock.jsx"},{"name":"Timeline","sourcePath":"components/surau/Timeline.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"b092cf9a5399","components/core/Button.jsx":"59d563005756","components/core/Card.jsx":"2cad90db55c6","components/core/Icon.jsx":"b24ec9d17faa","components/core/SectionHeading.jsx":"2bd617165f20","components/core/Tag.jsx":"83446d5c35a2","components/core/useBreakpoint.js":"cf280ad9b119","components/feedback/Dialog.jsx":"1c3be3ee39e9","components/feedback/Toast.jsx":"32490ef378bf","components/feedback/Tooltip.jsx":"be5693e24899","components/forms/Checkbox.jsx":"e47ae6114a0b","components/forms/Input.jsx":"618bf4ddd556","components/forms/RadioGroup.jsx":"f8fd5eceaed2","components/forms/Select.jsx":"a161fa1ff3a2","components/forms/Switch.jsx":"3affcba74069","components/navigation/BottomBar.jsx":"7887caa3880a","components/navigation/Footer.jsx":"860e6ac56d49","components/navigation/NavBar.jsx":"d89b1a5b00b0","components/navigation/Tabs.jsx":"0662b45908d6","components/surau/ArabicVerse.jsx":"e3ac2323e36e","components/surau/DonationProgress.jsx":"31f9edf68d81","components/surau/EventItem.jsx":"dba1fa4149c4","components/surau/PhotoTile.jsx":"da9367082437","components/surau/PrayerTimeRow.jsx":"dc686e99e500","components/surau/PrayerTimeTable.jsx":"2a07e6dd9d73","components/surau/StatBlock.jsx":"0c2a08223a47","components/surau/Timeline.jsx":"e4c90217500d","ui_kits/website/DonatePage.jsx":"51d52ac5fd2d","ui_kits/website/Hero.jsx":"63987bb2191e","ui_kits/website/SchedulePage.jsx":"8adb11cf4cf9","ui_kits/website/Sections.jsx":"23571e32d046","ui_kits/website/data.js":"6a1d7ced6c2f"},"inlinedExternals":[],"unexposedExports":[{"name":"useBreakpoint","sourcePath":"components/core/useBreakpoint.js"}]} */

(() => {

const __ds_ns = (window.SurauBatehLoriDesignSystem_c76578 = window.SurauBatehLoriDesignSystem_c76578 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  tone = 'default',
  padding = 'var(--gutter-card)',
  interactive = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const TONE = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)'
    },
    sand: {
      background: 'var(--sand-200)',
      border: '1px solid var(--border-hairline)'
    },
    brand: {
      background: 'var(--surface-brand)',
      border: '1px solid var(--maroon-800)',
      color: 'var(--text-on-brand)'
    },
    dark: {
      background: 'var(--surface-dark)',
      border: '1px solid var(--slate-800)',
      color: 'var(--text-on-dark)'
    },
    calm: {
      background: 'var(--surface-calm)',
      border: '1px solid var(--teal-200)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-lg)',
      padding,
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-body)',
      boxShadow: interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      transition: 'var(--transition-control)',
      ...TONE[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/** Ikon Lucide (CDN lucide-static) dirender lewat CSS mask agar mewarisi currentColor. */
function Icon({
  name,
  size = 18,
  strokeColor,
  style,
  title
}) {
  const url = `url("https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": title || name,
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      backgroundColor: strokeColor || 'currentColor',
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONE = {
  neutral: {
    background: 'var(--status-info-soft)',
    color: 'var(--slate-700)'
  },
  brand: {
    background: 'var(--surface-brand-soft)',
    color: 'var(--maroon-700)'
  },
  accent: {
    background: 'var(--status-next-soft)',
    color: 'var(--gold-800)'
  },
  active: {
    background: 'var(--status-active-soft)',
    color: 'var(--teal-800)'
  },
  solid: {
    background: 'var(--surface-brand)',
    color: 'var(--text-on-brand)'
  }
};
function Badge({
  children,
  tone = 'neutral',
  icon,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-label)',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      ...TONE[tone],
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const TONE = {
  primary: {
    background: 'var(--surface-brand)',
    color: 'var(--text-on-brand)',
    border: '1px solid var(--maroon-700)',
    boxShadow: 'var(--shadow-brand)'
  },
  accent: {
    background: 'var(--surface-accent)',
    color: 'var(--slate-900)',
    border: '1px solid var(--gold-600)',
    boxShadow: 'var(--shadow-sm)'
  },
  secondary: {
    background: 'var(--white)',
    color: 'var(--text-brand)',
    border: '1px solid var(--maroon-300)',
    boxShadow: 'var(--shadow-xs)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-body)',
    border: '1px solid transparent',
    boxShadow: 'none'
  },
  dark: {
    background: 'var(--surface-dark)',
    color: 'var(--text-on-dark)',
    border: '1px solid var(--slate-900)',
    boxShadow: 'var(--shadow-md)'
  }
};
const SIZE = {
  sm: {
    height: 34,
    padding: '0 14px',
    fontSize: 'var(--fs-body-sm)',
    gap: 6
  },
  md: {
    height: 42,
    padding: '0 20px',
    fontSize: 'var(--fs-body)',
    gap: 8
  },
  lg: {
    height: 52,
    padding: '0 28px',
    fontSize: 'var(--fs-body-lg)',
    gap: 10
  }
};
function Button({
  children,
  tone = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const t = TONE[tone] || TONE.primary,
    s = SIZE[size] || SIZE.md;
  const glyph = icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'lg' ? 20 : 16
  }) : null;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.005em',
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: 'var(--radius-pill)',
      transition: 'var(--transition-control)',
      opacity: disabled ? 0.45 : 1,
      filter: hover && !disabled ? 'brightness(0.94)' : 'none',
      transform: press && !disabled ? 'scale(var(--press-scale))' : 'none',
      ...t,
      ...s,
      ...style
    }
  }, glyph && iconPosition === 'left' ? glyph : null, children, glyph && iconPosition === 'right' ? glyph : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function SectionHeading({
  overline,
  title,
  description,
  align = 'left',
  arabic,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      maxWidth: align === 'center' ? 640 : 'none',
      margin: align === 'center' ? '0 auto' : 0,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, overline ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-brand)',
      fontSize: 'var(--fs-overline)'
    }
  }, overline) : null, arabic ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-arabic)',
      fontSize: 'var(--fs-arabic)',
      color: 'var(--gold-700)',
      lineHeight: 'var(--lh-arabic)'
    }
  }, arabic) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--text-h2)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--text-strong)',
      textWrap: 'balance'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-body-default)',
      color: 'var(--text-muted)',
      maxWidth: 560,
      textWrap: 'pretty'
    }
  }, description) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      font: 'var(--text-label)',
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      fontFamily: 'var(--font-sans)',
      background: selected ? 'var(--surface-brand)' : hover ? 'var(--sand-300)' : 'var(--white)',
      color: selected ? 'var(--text-on-brand)' : 'var(--text-body)',
      border: '1px solid ' + (selected ? 'var(--maroon-700)' : 'var(--border-default)'),
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/useBreakpoint.js
try { (() => {
/** true bila lebar layar cocok dengan query. Default: ponsel & tablet sempit. */
function useBreakpoint(query = '(max-width: 860px)') {
  const [match, setMatch] = React.useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  React.useEffect(() => {
    const mm = window.matchMedia(query);
    const handle = e => setMatch(e.matches);
    setMatch(mm.matches);
    mm.addEventListener('change', handle);
    return () => mm.removeEventListener('change', handle);
  }, [query]);
  return match;
}
Object.assign(__ds_scope, { useBreakpoint });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/useBreakpoint.js", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  description,
  children,
  footer,
  onClose,
  width = 460,
  inline = false
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: inline ? 'relative' : 'fixed',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      zIndex: 50,
      background: inline ? 'transparent' : 'rgba(34,38,44,.48)',
      backdropFilter: inline ? 'none' : 'var(--blur-glass)',
      padding: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-default)',
      padding: 'var(--space-8)',
      fontFamily: 'var(--font-sans)',
      position: 'relative'
    }
  }, onClose ? /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Tutup",
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      padding: 4,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  })) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      font: 'var(--text-h3)',
      color: 'var(--text-strong)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-5)',
      font: 'var(--text-body-default)',
      color: 'var(--text-muted)'
    }
  }, description) : null, children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      justifyContent: 'flex-end',
      marginTop: 'var(--space-6)'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONE = {
  success: {
    icon: 'circle-check',
    color: 'var(--teal-800)',
    background: 'var(--teal-100)',
    border: 'var(--teal-200)'
  },
  info: {
    icon: 'info',
    color: 'var(--slate-800)',
    background: 'var(--slate-100)',
    border: 'var(--border-default)'
  },
  warning: {
    icon: 'triangle-alert',
    color: 'var(--gold-800)',
    background: 'var(--gold-100)',
    border: 'var(--gold-200)'
  },
  danger: {
    icon: 'circle-alert',
    color: 'var(--maroon-800)',
    background: 'var(--maroon-50)',
    border: 'var(--maroon-100)'
  }
};
function Toast({
  tone = 'info',
  title,
  message,
  onClose,
  style
}) {
  const t = TONE[tone] || TONE.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '14px 16px',
      minWidth: 280,
      background: t.background,
      border: '1px solid ' + t.border,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 18,
    style: {
      color: t.color,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: t.color
    }
  }, title), message ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, message) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Tutup",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 15
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children,
  placement = 'top',
  style
}) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      opacity: show ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity var(--dur-fast) var(--ease-standard)',
      background: 'var(--surface-dark)',
      color: 'var(--text-on-dark)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--fs-caption)',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      marginTop: 1,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-xs)',
      transition: 'var(--transition-control)',
      background: on ? 'var(--surface-brand)' : 'var(--white)',
      border: '1px solid ' + (on ? 'var(--maroon-700)' : 'var(--border-strong)')
    }
  }, on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    style: {
      color: 'var(--white)'
    }
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-default)',
      color: 'var(--text-strong)',
      lineHeight: 'var(--lh-normal)'
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  icon,
  hint,
  error,
  type = 'text',
  disabled = false,
  id,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || 'in-' + (label || placeholder || 'field').replace(/\s+/g, '-').toLowerCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 44,
      padding: '0 14px',
      background: disabled ? 'var(--slate-100)' : 'var(--white)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (error ? 'var(--status-danger)' : focus ? 'var(--maroon-700)' : 'var(--border-default)'),
      boxShadow: focus ? '0 0 0 3px rgba(220,201,69,.35)' : 'var(--shadow-xs)',
      transition: 'var(--transition-control)'
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    style: {
      color: 'var(--text-faint)'
    }
  }) : null, /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'var(--text-body-default)',
      color: 'var(--text-strong)',
      minWidth: 0
    }
  })), hint || error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: error ? 'var(--status-danger)' : 'var(--text-muted)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
function RadioGroup({
  label,
  options = [],
  value,
  onChange,
  name = 'radio',
  style
}) {
  return /*#__PURE__*/React.createElement("fieldset", {
    style: {
      border: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("legend", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-strong)',
      padding: 0,
      marginBottom: 2
    }
  }, label) : null, options.map(o => {
    const v = o.value ?? o,
      on = value === v;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      onClick: () => onChange && onChange(v),
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 'var(--radius-pill)',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid ' + (on ? 'var(--maroon-700)' : 'var(--border-strong)'),
        background: 'var(--white)',
        transition: 'var(--transition-control)'
      }
    }, on ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--surface-brand)'
      }
    }) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body-default)',
        color: 'var(--text-strong)'
      }
    }, o.label ?? o), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      value: v,
      checked: on,
      readOnly: true,
      style: {
        display: 'none'
      }
    }));
  }));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  hint,
  disabled = false,
  id,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || 'sel-' + (label || 'field').replace(/\s+/g, '-').toLowerCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: selectId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      height: 44,
      padding: '0 40px 0 14px',
      appearance: 'none',
      cursor: 'pointer',
      background: disabled ? 'var(--slate-100)' : 'var(--white)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (focus ? 'var(--maroon-700)' : 'var(--border-default)'),
      boxShadow: focus ? '0 0 0 3px rgba(220,201,69,.35)' : 'var(--shadow-xs)',
      font: 'var(--text-body-default)',
      color: 'var(--text-strong)',
      transition: 'var(--transition-control)'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    style: {
      position: 'absolute',
      right: 14,
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  })), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 26,
      borderRadius: 'var(--radius-pill)',
      padding: 3,
      display: 'flex',
      justifyContent: on ? 'flex-end' : 'flex-start',
      transition: 'var(--transition-control)',
      background: on ? 'var(--status-active)' : 'var(--slate-300)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-xs)'
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-default)',
      color: 'var(--text-strong)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomBar.jsx
try { (() => {
const DEFAULTS = [{
  label: 'Beranda',
  icon: 'house'
}, {
  label: 'Jadwal Salat',
  icon: 'clock',
  short: 'Jadwal'
}, {
  label: 'Kajian',
  icon: 'calendar-days'
}, {
  label: 'Infak',
  icon: 'hand-coins'
}, {
  label: 'Kontak',
  icon: 'phone'
}];
function BottomBar({
  items = DEFAULTS,
  active = 'Beranda',
  onNavigate,
  style
}) {
  const mobile = __ds_scope.useBreakpoint();
  if (!mobile) return null;
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'fixed',
      inset: 'auto 0 0 0',
      zIndex: 40,
      display: 'grid',
      gridTemplateColumns: 'repeat(' + items.length + ',1fr)',
      background: 'rgba(253,251,246,.94)',
      backdropFilter: 'var(--blur-glass)',
      borderTop: '1px solid var(--border-hairline)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map(it => {
    const on = it.label === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.label,
      type: "button",
      onClick: () => onNavigate && onNavigate(it.label),
      style: {
        minHeight: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '6px 2px',
        color: on ? 'var(--maroon-700)' : 'var(--text-muted)',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-overline)',
        fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-medium)'
      }
    }, it.short || it.label));
  }));
}
Object.assign(__ds_scope, { BottomBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function Footer({
  logoSrc = '../../assets/logo-mark.png',
  address = 'Lori Lubuk Minturun, Kota Padang, Sumatera Barat',
  columns = [],
  socials = ['instagram', 'facebook', 'youtube'],
  style
}) {
  const mobile = __ds_scope.useBreakpoint();
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-dark)',
      color: 'var(--text-on-dark)',
      padding: mobile ? 'var(--space-10) var(--space-5) var(--space-6)' : 'var(--space-16) var(--space-8) var(--space-8)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1.4fr repeat(' + Math.max(columns.length, 1) + ', 1fr)',
      gap: mobile ? 'var(--space-8)' : 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'flex-start',
      display: 'grid',
      placeItems: 'center',
      padding: '12px 16px',
      background: 'var(--sand-100)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "",
    style: {
      height: 54,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--slate-300)',
      maxWidth: 280
    }
  }, address), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      width: 34,
      height: 34,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,.08)',
      color: 'var(--gold-400)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: s,
    size: 16
  }))))), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--gold-500)'
    }
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: 'var(--slate-300)',
      textDecoration: 'none',
      fontSize: 'var(--fs-body-sm)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-10) auto 0',
      paddingTop: 'var(--space-5)',
      borderTop: '1px solid rgba(255,255,255,.10)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--slate-400)'
    }
  }, "\xA9 ", new Date().getFullYear(), " Surau Bateh Lori, Kota Padang. Dikelola oleh pengurus surau."));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function NavBar({
  logoSrc = '../../assets/logo-mark.png',
  brand = 'Surau Bateh Lori',
  tagline = 'Kota Padang',
  items = ['Beranda', 'Profil', 'Jadwal Salat', 'Kajian', 'Berita', 'Kontak'],
  active = 'Beranda',
  onNavigate,
  action = 'Salurkan Infak',
  onAction,
  style
}) {
  const mobile = __ds_scope.useBreakpoint();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!mobile) setOpen(false);
  }, [mobile]);
  const go = it => {
    setOpen(false);
    onNavigate && onNavigate(it);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: mobile ? 'var(--space-4)' : 'var(--space-8)',
      padding: mobile ? '12px var(--space-5)' : '14px var(--space-8)',
      flexWrap: 'wrap',
      background: 'rgba(253,251,246,.88)',
      backdropFilter: 'var(--blur-glass)',
      borderBottom: '1px solid var(--border-hairline)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "",
    style: {
      height: mobile ? 32 : 38,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-extrabold)',
      fontSize: 'var(--fs-body)',
      color: 'var(--maroon-700)',
      letterSpacing: '-0.01em'
    }
  }, brand), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, tagline))), mobile ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": open ? 'Tutup menu' : 'Buka menu',
    "aria-expanded": open,
    onClick: () => setOpen(o => !o),
    style: {
      marginLeft: 'auto',
      width: 44,
      height: 44,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      background: 'var(--white)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      color: 'var(--maroon-700)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: open ? 'x' : 'menu',
    size: 20
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      marginLeft: 'auto'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(it);
    },
    style: {
      textDecoration: 'none',
      font: 'var(--text-label)',
      color: it === active ? 'var(--maroon-700)' : 'var(--text-body)',
      paddingBottom: 2,
      borderBottom: '2px solid ' + (it === active ? 'var(--gold-500)' : 'transparent'),
      transition: 'var(--transition-control)'
    }
  }, it))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    tone: "primary",
    size: "sm",
    icon: "hand-coins",
    onClick: onAction
  }, action)), mobile && open ? /*#__PURE__*/React.createElement("nav", {
    style: {
      flexBasis: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: 'var(--space-4)'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(it);
    },
    style: {
      textDecoration: 'none',
      font: 'var(--text-label)',
      fontSize: 'var(--fs-body-lg)',
      minHeight: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-4)',
      borderRadius: 'var(--radius-md)',
      color: it === active ? 'var(--maroon-700)' : 'var(--text-body)',
      background: it === active ? 'var(--surface-brand-soft)' : 'transparent'
    }
  }, it, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 16,
    style: {
      color: 'var(--text-faint)'
    }
  }))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    tone: "primary",
    size: "lg",
    fullWidth: true,
    icon: "hand-coins",
    style: {
      marginTop: 'var(--space-3)'
    },
    onClick: () => {
      setOpen(false);
      onAction && onAction();
    }
  }, action)) : null);
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  style
}) {
  const [internal, setInternal] = React.useState(items[0] && (items[0].value ?? items[0]));
  const active = value !== undefined ? value : internal;
  const pick = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      background: 'var(--sand-300)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map(it => {
    const v = it.value ?? it,
      on = active === v;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(v),
      style: {
        border: 'none',
        cursor: 'pointer',
        padding: '8px 18px',
        borderRadius: 'var(--radius-pill)',
        font: 'var(--text-label)',
        transition: 'var(--transition-control)',
        background: on ? 'var(--white)' : 'transparent',
        color: on ? 'var(--text-brand)' : 'var(--text-muted)',
        boxShadow: on ? 'var(--shadow-xs)' : 'none'
      }
    }, it.label ?? it);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surau/ArabicVerse.jsx
try { (() => {
function ArabicVerse({
  arabic,
  translation,
  source,
  align = 'center',
  tone = 'sand',
  style
}) {
  const TONE = {
    sand: {
      background: 'var(--sand-200)',
      color: 'var(--text-body)'
    },
    dark: {
      background: 'var(--surface-dark)',
      color: 'var(--slate-300)'
    },
    brand: {
      background: 'var(--surface-brand)',
      color: 'rgba(255,255,255,.82)'
    }
  };
  const t = TONE[tone] || TONE.sand;
  return /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      padding: 'var(--space-10) var(--space-8)',
      borderRadius: 'var(--radius-lg)',
      textAlign: align,
      fontFamily: 'var(--font-sans)',
      ...t,
      ...style
    }
  }, /*#__PURE__*/React.createElement("p", {
    dir: "rtl",
    lang: "ar",
    style: {
      margin: 0,
      fontFamily: 'var(--font-arabic)',
      fontSize: 'var(--fs-arabic-lg)',
      lineHeight: 'var(--lh-arabic)',
      color: tone === 'sand' ? 'var(--maroon-700)' : 'var(--gold-400)'
    }
  }, arabic), translation ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--space-4) auto 0',
      maxWidth: 620,
      font: 'var(--text-body-default)',
      fontStyle: 'italic',
      textWrap: 'pretty'
    }
  }, translation) : null, source ? /*#__PURE__*/React.createElement("cite", {
    style: {
      display: 'block',
      marginTop: 'var(--space-3)',
      fontStyle: 'normal',
      font: 'var(--text-label)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      fontSize: 'var(--fs-overline)',
      color: tone === 'sand' ? 'var(--text-faint)' : 'var(--gold-500)'
    }
  }, source) : null);
}
Object.assign(__ds_scope, { ArabicVerse });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/ArabicVerse.jsx", error: String((e && e.message) || e) }); }

// components/surau/DonationProgress.jsx
try { (() => {
function DonationProgress({
  title = 'Pembangunan Ruang Wudhu',
  collected = 0,
  target = 1,
  currency = 'Rp',
  deadline,
  style
}) {
  const pct = Math.min(100, Math.round(collected / target * 100));
  const fmt = n => currency + ' ' + n.toLocaleString('id-ID');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h4)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--maroon-700)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--sand-300)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: 'linear-gradient(90deg,var(--maroon-700),var(--gold-500))',
      transition: 'width var(--dur-slow) var(--ease-standard)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)'
    }
  }, fmt(collected)), " terkumpul"), /*#__PURE__*/React.createElement("span", null, "Target ", fmt(target), deadline ? ' · ' + deadline : '')));
}
Object.assign(__ds_scope, { DonationProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/DonationProgress.jsx", error: String((e && e.message) || e) }); }

// components/surau/EventItem.jsx
try { (() => {
function EventItem({
  day,
  month,
  title,
  speaker,
  time,
  place,
  category,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'center',
      padding: 'var(--space-4)',
      cursor: onClick ? 'pointer' : 'default',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'var(--transition-control)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 62,
      height: 66,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      gap: 0,
      background: 'var(--surface-brand-soft)',
      border: '1px solid var(--maroon-100)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h3)',
      color: 'var(--maroon-700)',
      lineHeight: 1
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--maroon-600)'
    }
  }, month)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, category ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "accent",
    style: {
      alignSelf: 'flex-start',
      fontSize: 'var(--fs-overline)'
    }
  }, category) : null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: 'var(--text-h4)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-4)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, speaker ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mic",
    size: 14
  }), speaker) : null, time ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 14
  }), time) : null, place ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 14
  }), place) : null)), onClick ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18,
    style: {
      color: 'var(--text-faint)'
    }
  }) : null);
}
Object.assign(__ds_scope, { EventItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/EventItem.jsx", error: String((e && e.message) || e) }); }

// components/surau/PhotoTile.jsx
try { (() => {
function PhotoTile({
  src,
  alt = '',
  caption,
  meta,
  icon,
  ratio = '4 / 3',
  position = 'center',
  tone = 'scrim',
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("figure", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      margin: 0,
      position: 'relative',
      aspectRatio: ratio,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'var(--transition-control)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: position,
      transform: hover ? 'scale(1.03)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-standard)'
    }
  }), caption || meta ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: 'absolute',
      inset: 'auto 0 0 0',
      padding: '38px var(--space-5) var(--space-5)',
      background: tone === 'scrim' ? 'var(--overlay-scrim)' : 'none',
      color: 'var(--sand-100)',
      fontFamily: 'var(--font-sans)'
    }
  }, meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginBottom: 5
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 13
  }) : null, meta) : null, caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--text-label)',
      fontSize: 'var(--fs-body)',
      textWrap: 'pretty'
    }
  }, caption) : null) : null);
}
Object.assign(__ds_scope, { PhotoTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/PhotoTile.jsx", error: String((e && e.message) || e) }); }

// components/surau/PrayerTimeRow.jsx
try { (() => {
const ICONS = {
  Subuh: 'sunrise',
  Syuruq: 'sun',
  Dzuhur: 'sun',
  Ashar: 'cloud-sun',
  Maghrib: 'sunset',
  Isya: 'moon-star'
};
function PrayerTimeRow({
  name,
  adzan,
  iqamah,
  state = 'default',
  variant = 'solid',
  style
}) {
  const active = state === 'active',
    next = state === 'next',
    glass = variant === 'glass';
  const bg = active ? 'var(--status-active)' : next ? glass ? 'rgba(220,201,69,.20)' : 'var(--status-next-soft)' : 'transparent';
  const bd = active ? 'var(--teal-700)' : next ? glass ? 'rgba(231,216,119,.42)' : 'var(--gold-200)' : 'transparent';
  const fg = active ? 'var(--white)' : glass ? 'var(--sand-100)' : 'var(--text-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: '14px var(--space-5)',
      borderRadius: 'var(--radius-md)',
      transition: 'var(--transition-control)',
      background: bg,
      color: fg,
      border: '1px solid ' + bd,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      font: 'var(--text-label)',
      fontSize: 'var(--fs-body)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICONS[name] || 'clock',
    size: 18,
    style: {
      color: active ? 'var(--gold-400)' : glass ? 'rgba(253,251,246,.62)' : 'var(--text-faint)'
    }
  }), name, active ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "solid",
    style: {
      background: 'rgba(255,255,255,.16)',
      color: 'var(--white)',
      fontSize: 'var(--fs-overline)'
    }
  }, "Berlangsung") : null, next ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "accent",
    style: glass ? {
      background: 'rgba(231,216,119,.26)',
      color: 'var(--gold-200)',
      fontSize: 'var(--fs-overline)'
    } : {
      fontSize: 'var(--fs-overline)'
    }
  }, "Berikutnya") : null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-body-lg)'
    }
  }, adzan), iqamah ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--fs-body-sm)',
      width: 62,
      textAlign: 'right',
      color: active ? 'rgba(255,255,255,.75)' : glass ? 'rgba(253,251,246,.68)' : 'var(--text-muted)'
    }
  }, iqamah) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 62
    }
  }));
}
Object.assign(__ds_scope, { PrayerTimeRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/PrayerTimeRow.jsx", error: String((e && e.message) || e) }); }

// components/surau/PrayerTimeTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PrayerTimeTable({
  date = 'Senin, 10 Agustus 2026',
  hijri = '26 Safar 1448 H',
  location = 'Kota Padang',
  times = [],
  activeName,
  nextName,
  variant = 'solid',
  style
}) {
  const glass = variant === 'glass';
  const shell = glass ? {
    background: 'rgba(253,251,246,.14)',
    border: '1px solid rgba(253,251,246,.24)',
    backdropFilter: 'var(--blur-glass)',
    WebkitBackdropFilter: 'var(--blur-glass)',
    boxShadow: '0 26px 60px rgba(16,18,21,.34)'
  } : {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-default)',
    boxShadow: 'var(--shadow-sm)'
  };
  const headBg = glass ? 'rgba(253,251,246,.10)' : 'var(--sand-200)';
  const headBorder = glass ? '1px solid rgba(253,251,246,.18)' : '1px solid var(--border-hairline)';
  const c = {
    date: glass ? 'var(--sand-100)' : 'var(--text-strong)',
    hijri: glass ? 'var(--gold-400)' : 'var(--maroon-700)',
    meta: glass ? 'rgba(253,251,246,.74)' : 'var(--text-muted)',
    label: glass ? 'rgba(253,251,246,.58)' : 'var(--text-faint)'
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      ...shell,
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      padding: 'var(--space-5) var(--space-6)',
      background: headBg,
      borderBottom: headBorder
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: c.date
    }
  }, date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: c.hijri
    }
  }, hijri)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--fs-body-sm)',
      color: c.meta
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 15
  }), location)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      gap: 'var(--space-4)',
      padding: '10px var(--space-5) 2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: c.label
    }
  }, "Salat"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: c.label
    }
  }, "Adzan"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: c.label,
      width: 62,
      textAlign: 'right'
    }
  }, "Iqamah")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-3) var(--space-4)'
    }
  }, times.map(t => /*#__PURE__*/React.createElement(__ds_scope.PrayerTimeRow, _extends({
    key: t.name,
    variant: variant
  }, t, {
    state: t.name === activeName ? 'active' : t.name === nextName ? 'next' : 'default'
  })))));
}
Object.assign(__ds_scope, { PrayerTimeTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/PrayerTimeTable.jsx", error: String((e && e.message) || e) }); }

// components/surau/StatBlock.jsx
try { (() => {
function StatBlock({
  icon,
  value,
  label,
  tone = 'sand',
  style
}) {
  const TONE = {
    sand: {
      background: 'var(--sand-200)',
      color: 'var(--maroon-700)'
    },
    dark: {
      background: 'rgba(255,255,255,.06)',
      color: 'var(--gold-400)'
    },
    plain: {
      background: 'transparent',
      color: 'var(--maroon-700)'
    }
  };
  const t = TONE[tone] || TONE.sand;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-md)',
      background: t.background,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    style: {
      color: t.color
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h2)',
      color: tone === 'dark' ? 'var(--white)' : 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: tone === 'dark' ? 'var(--slate-300)' : 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/surau/Timeline.jsx
try { (() => {
function Node({
  item,
  index,
  last,
  silsilah,
  depth
}) {
  const done = item.status === 'selesai',
    now = item.status === 'berjalan';
  const dotSize = depth ? 26 : 34;
  const dotBg = silsilah ? depth ? 'var(--maroon-100)' : 'var(--maroon-700)' : done ? 'var(--status-active)' : now ? 'var(--surface-accent)' : 'var(--white)';
  const dotFg = silsilah ? depth ? 'var(--maroon-800)' : 'var(--gold-400)' : now ? 'var(--slate-900)' : done ? 'var(--white)' : 'var(--text-faint)';
  const line = silsilah ? 'var(--maroon-100)' : 'var(--sand-400)';
  const branches = item.branches || [];
  return /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'grid',
      gridTemplateColumns: dotSize + 'px 1fr',
      columnGap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: dotSize,
      height: dotSize,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-pill)',
      background: dotBg,
      color: dotFg,
      border: '1px solid ' + (silsilah || done || now ? 'transparent' : 'var(--border-strong)'),
      fontVariantNumeric: 'tabular-nums',
      fontSize: depth ? 'var(--fs-caption)' : 'var(--fs-body-sm)',
      fontWeight: 'var(--fw-bold)'
    }
  }, silsilah ? item.order ?? index + 1 : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: done ? 'check' : now ? 'hammer' : 'circle-dashed',
    size: 15
  })), !last || branches.length ? /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      width: 2,
      minHeight: 26,
      background: line
    }
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: last && !branches.length ? 0 : 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: depth ? 'var(--fs-body)' : 'var(--fs-h4)',
      lineHeight: 'var(--lh-snug)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, item.title), item.period ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, item.period) : null, now ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "accent"
  }, "Berjalan") : null), item.role ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--maroon-700)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, item.role) : null, item.description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)',
      textWrap: 'pretty'
    }
  }, item.description) : null, branches.length ? /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 'var(--space-4) 0 0 10px',
      padding: 0,
      borderLeft: '2px solid ' + line,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, branches.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: b.title + i,
    style: {
      display: 'grid',
      gridTemplateColumns: '16px 1fr',
      columnGap: 'var(--space-2)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 2,
      marginTop: depth ? 12 : 13,
      background: line
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Node, {
    item: b,
    index: i,
    last: true,
    depth: depth + 1,
    silsilah: silsilah
  }))))) : null));
}

/** variant: 'roadmap' = tahapan bertanggal & berstatus · 'silsilah' = mata rantai guru/pengurus. Item boleh punya `branches`. */
function Timeline({
  items = [],
  variant = 'roadmap',
  style
}) {
  const silsilah = variant === 'silsilah';
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Node, {
    key: it.title + i,
    item: it,
    index: i,
    last: i === items.length - 1,
    depth: 0,
    silsilah: silsilah
  })));
}
Object.assign(__ds_scope, { Timeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surau/Timeline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/DonatePage.jsx
try { (() => {
const {
  Card,
  SectionHeading,
  Input,
  Select,
  RadioGroup,
  Checkbox,
  Button,
  Badge,
  Dialog,
  Toast,
  DonationProgress,
  Icon
} = window.SurauBatehLoriDesignSystem_c76578;
function DonatePage() {
  const mobile = window.useKitBreakpoint();
  const [nominal, setNominal] = React.useState('Rp 100.000');
  const [confirm, setConfirm] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: mobile ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)',
      background: 'var(--sand-200)',
      minHeight: 600
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    overline: "Infak & Sedekah",
    title: "Salurkan infak untuk surau",
    description: "Dana dikelola pengurus dan dilaporkan setiap bulan pada papan pengumuman dan halaman berita."
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: 'var(--space-8)',
      padding: mobile ? 'var(--space-5)' : 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(DonationProgress, {
    title: "Renovasi Atap Surau",
    collected: 38500000,
    target: 75000000,
    deadline: "hingga 30 Sep"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-default)',
      margin: 'var(--space-8) 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nama jamaah",
    placeholder: "Nama lengkap atau 'Hamba Allah'",
    icon: "user"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Nomor WhatsApp",
    placeholder: "08xx",
    icon: "phone",
    hint: "Untuk pengiriman tanda terima."
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Peruntukan",
    options: ['Renovasi atap surau', 'Operasional harian', 'Kajian & khatib', 'Santunan anak yatim']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(RadioGroup, {
    label: "Nominal infak",
    value: nominal,
    onChange: setNominal,
    options: ['Rp 50.000', 'Rp 100.000', 'Rp 250.000', 'Nominal lain']
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Sembunyikan nama saya",
    description: "Tercatat sebagai Hamba Allah pada laporan."
  }), /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    fullWidth: true,
    icon: "hand-coins",
    onClick: () => setConfirm(true)
  }, "Lanjutkan")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    icon: "landmark"
  }, "BSI 7011 2233 44 a.n. Surau Bateh Lori"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    icon: "qr-code"
  }, "QRIS tersedia di papan pengumuman"))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    title: "Konfirmasi infak",
    description: nominal + ' untuk renovasi atap surau.',
    onClose: () => setConfirm(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      tone: "ghost",
      onClick: () => setConfirm(false)
    }, "Batal"), /*#__PURE__*/React.createElement(Button, {
      tone: "primary",
      onClick: () => {
        setConfirm(false);
        setDone(true);
        setTimeout(() => setDone(false), 4000);
      }
    }, "Kirim"))
  }), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Infak tercatat",
    message: "Jazakumullah khairan, tanda terima dikirim via WhatsApp.",
    onClose: () => setDone(false)
  })) : null);
}
Object.assign(window, {
  DonatePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/DonatePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
const {
  Button,
  Badge,
  Icon,
  PrayerTimeTable
} = window.SurauBatehLoriDesignSystem_c76578;
function Hero({
  onNavigate
}) {
  const d = window.SB_DATA;
  const mobile = window.useKitBreakpoint();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: mobile ? '48px var(--space-5) var(--space-12)' : '96px var(--space-8) var(--gutter-section)',
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(100deg,rgba(34,38,44,.86) 0%,rgba(34,38,44,.68) 42%,rgba(34,38,44,.44) 72%,rgba(34,38,44,.52) 100%), url(../../assets/foto-surau.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 58%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1.05fr .95fr',
      gap: mobile ? 'var(--space-8)' : 'var(--space-16)',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    icon: "map-pin",
    style: {
      background: 'rgba(253,251,246,.92)',
      color: 'var(--maroon-700)'
    }
  }, "Lori Lubuk Minturun, Kota Padang"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extrabold)',
      lineHeight: 'var(--lh-tight)',
      fontSize: mobile ? 'var(--fs-h1)' : 'var(--fs-display-1)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--sand-100)',
      textWrap: 'balance',
      textShadow: '0 2px 20px rgba(34,38,44,.35)'
    }
  }, "Surau Bateh Lori,", /*#__PURE__*/React.createElement("br", null), "rumah ibadah ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)'
    }
  }, "warga nagari")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-body-default)',
      fontSize: 'var(--fs-body-lg)',
      color: 'rgba(253,251,246,.86)',
      maxWidth: 460,
      textWrap: 'pretty'
    }
  }, "Salat lima waktu, kajian pekanan, dan latihan silat tradisi bagi jamaah. Semua kegiatan terbuka untuk warga sekitar surau."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      width: mobile ? '100%' : 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    icon: "hand-coins",
    fullWidth: mobile,
    onClick: () => onNavigate('Infak')
  }, "Salurkan Infak"), /*#__PURE__*/React.createElement(Button, {
    tone: "accent",
    size: "lg",
    icon: "calendar-days",
    fullWidth: mobile,
    onClick: () => onNavigate('Kajian')
  }, "Lihat Agenda")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap',
      paddingTop: 'var(--space-4)',
      color: 'rgba(253,251,246,.72)',
      fontSize: 'var(--fs-body-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 15
  }), "180 jamaah rutin"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mic",
    size: 15
  }), "Kajian dua kali sepekan"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 15
  }), "Gotong royong tiap pekan"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(PrayerTimeTable, {
    variant: "glass",
    style: {
      position: 'relative',
      zIndex: 1
    },
    times: d.times,
    activeName: "Ashar",
    nextName: "Maghrib"
  }))));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SchedulePage.jsx
try { (() => {
const {
  PrayerTimeTable,
  SectionHeading,
  Tabs,
  Card,
  Badge,
  Switch,
  Icon
} = window.SurauBatehLoriDesignSystem_c76578;
function SchedulePage() {
  const mobile = window.useKitBreakpoint();
  const [range, setRange] = React.useState('Hari ini');
  const d = window.SB_DATA;
  const week = ['Sen 10', 'Sel 11', 'Rab 12', 'Kam 13', 'Jum 14', 'Sab 15', 'Ahd 16'];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: mobile ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)',
      background: 'var(--sand-100)',
      minHeight: 600
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    overline: "Waktu Salat",
    title: "Jadwal salat Kota Padang",
    description: "Dihitung untuk koordinat Lori Lubuk Minturun, disesuaikan dengan pengumuman iqamah pengurus surau."
  }), /*#__PURE__*/React.createElement(Tabs, {
    items: ['Hari ini', 'Pekan ini'],
    value: range,
    onChange: setRange
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr .72fr',
      gap: mobile ? 'var(--space-5)' : 'var(--space-8)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, range === 'Hari ini' ? /*#__PURE__*/React.createElement(PrayerTimeTable, {
    times: d.times,
    activeName: "Ashar",
    nextName: "Maghrib"
  }) : /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: mobile ? 'auto' : 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: '100%',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-sm)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--sand-200)'
    }
  }, ['Hari', ...d.times.map(t => t.name)].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '12px 14px',
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, week.map((day, i) => /*#__PURE__*/React.createElement("tr", {
    key: day,
    style: {
      background: i === 0 ? 'var(--status-next-soft)' : 'transparent',
      borderTop: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 14px',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, day), d.times.map(t => /*#__PURE__*/React.createElement("td", {
    key: t.name,
    style: {
      padding: '12px 14px',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--text-body)'
    }
  }, t.adzan.replace(/^(\d+):(\d+)$/, (m, h, mm) => String(Number(h)).padStart(2, '0') + ':' + String((Number(mm) + i) % 60).padStart(2, '0'))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "calm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "volume-2",
    size: 18,
    style: {
      color: 'var(--teal-800)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--teal-800)'
    }
  }, "Iqamah Ashar dalam 12 menit")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "Layar TV surau menampilkan hitung mundur yang sama.")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-strong)'
    }
  }, "Pengaturan pengingat"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Pengingat adzan",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Pengingat kajian"
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Pengingat Jumat pagi",
    defaultChecked: true
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-strong)'
    }
  }, "Khatib Jumat"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "14 Ags")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "Ust. H. Marwan Dt. Rajo \u2014 \u201CAmanah dalam Bekerja\u201D. Khutbah dimulai 12.10 WIB."))))));
}
Object.assign(window, {
  SchedulePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SchedulePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const NS = window.SurauBatehLoriDesignSystem_c76578;
window.useKitBreakpoint = NS.useBreakpoint || function (query = '(max-width: 860px)') {
  const [m, setM] = React.useState(() => window.matchMedia(query).matches);
  React.useEffect(() => {
    const mm = window.matchMedia(query);
    const h = e => setM(e.matches);
    setM(mm.matches);
    mm.addEventListener('change', h);
    return () => mm.removeEventListener('change', h);
  }, [query]);
  return m;
};
const useKit = window.useKitBreakpoint;
const pad = m => m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)';
const {
  Card,
  SectionHeading,
  Badge,
  Button,
  Icon,
  Tag,
  EventItem,
  StatBlock,
  DonationProgress,
  ArabicVerse,
  Tabs
} = NS;
// Fail-soft: komponen baru mungkin belum ada di bundel yang termuat.
const Timeline = NS.Timeline || function TimelineFallback({
  items = []
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      paddingLeft: 'var(--space-5)',
      borderLeft: '2px solid var(--sand-400)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-h4)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, it.title), it.period ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, it.period) : null, it.description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, it.description) : null)));
};
// Fail-soft: kit tetap tampil meski bundel belum memuat PhotoTile.
const PhotoTile = NS.PhotoTile || function PhotoTileFallback({
  src,
  alt = '',
  caption,
  meta,
  icon,
  ratio = '4 / 3',
  position = 'center',
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      position: 'relative',
      aspectRatio: ratio,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: position
    }
  }), caption || meta ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: 'absolute',
      inset: 'auto 0 0 0',
      padding: '38px var(--space-5) var(--space-5)',
      background: 'var(--overlay-scrim)',
      color: 'var(--sand-100)',
      fontFamily: 'var(--font-sans)'
    }
  }, meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginBottom: 5
    }
  }, meta) : null, caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--text-label)',
      fontSize: 'var(--fs-body)'
    }
  }, caption) : null) : null);
};
function ProgramsSection() {
  const mobile = useKit();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: pad(mobile),
      background: 'var(--sand-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    overline: "Program",
    title: "Kegiatan rutin Surau Bateh Lori",
    description: "Empat program yang berjalan sepanjang pekan, dikelola pengurus dan didukung infak jamaah."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'repeat(4,1fr)',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-8)'
    }
  }, window.SB_DATA.programs.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.title,
    interactive: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-brand-soft)',
      color: 'var(--maroon-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--text-h4)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)'
    }
  }, p.desc), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 'auto',
      paddingTop: 10,
      fontSize: 'var(--fs-caption)',
      color: 'var(--maroon-700)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, p.meta))))));
}
function VerseSection() {
  const mobile = useKit();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: mobile ? '0 var(--space-5)' : '0 var(--space-8)',
      background: 'var(--sand-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto',
      paddingBottom: mobile ? 'var(--space-12)' : 'var(--gutter-section)'
    }
  }, /*#__PURE__*/React.createElement(ArabicVerse, {
    tone: "sand",
    style: {
      background: 'var(--white)',
      border: '1px solid var(--border-hairline)',
      padding: mobile ? 'var(--space-8) var(--space-5)' : undefined
    },
    arabic: "\u0625\u0650\u0646\u064E\u0651\u0645\u064E\u0627 \u064A\u064E\u0639\u0652\u0645\u064F\u0631\u064F \u0645\u064E\u0633\u064E\u0627\u062C\u0650\u062F\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0645\u064E\u0646\u0652 \u0622\u0645\u064E\u0646\u064E \u0628\u0650\u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0648\u064E\u0627\u0644\u0652\u064A\u064E\u0648\u0652\u0645\u0650 \u0627\u0644\u0652\u0622\u062E\u0650\u0631\u0650",
    translation: "Hanyalah yang memakmurkan masjid Allah orang-orang yang beriman kepada Allah dan hari akhir.",
    source: "QS. At-Taubah: 18"
  })));
}
function AgendaSection({
  compact
}) {
  const mobile = useKit();
  const [filter, setFilter] = React.useState('Semua');
  const cats = ['Semua', 'Kajian Rutin', 'Tahsin', 'Silat', 'Jumat'];
  const list = window.SB_DATA.events.filter(e => filter === 'Semua' || e.category === filter);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: pad(mobile),
      background: 'var(--sand-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: compact || mobile ? 'minmax(0,1fr)' : '1.4fr .8fr',
      gap: mobile ? 'var(--space-8)' : 'var(--space-12)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    overline: "Agenda",
    title: "Kajian dan kegiatan pekan ini"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      margin: 'var(--space-6) 0'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: filter === c,
    onClick: () => setFilter(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, list.map(e => /*#__PURE__*/React.createElement(EventItem, _extends({
    key: e.title
  }, e, {
    onClick: () => {}
  }))), list.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      font: 'var(--text-body-default)'
    }
  }, "Belum ada agenda pada kategori ini.") : null)), compact ? null : /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Pengumuman"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-4)'
    }
  }, window.SB_DATA.news.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.title,
    href: "#",
    style: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    style: {
      alignSelf: 'flex-start',
      fontSize: 'var(--fs-overline)'
    }
  }, n.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-strong)'
    }
  }, n.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-faint)'
    }
  }, n.date))))), /*#__PURE__*/React.createElement(Card, {
    tone: "dark"
  }, /*#__PURE__*/React.createElement(DonationProgress, {
    title: "Renovasi Atap Surau",
    collected: 38500000,
    target: 75000000,
    deadline: "hingga 30 Sep",
    style: {
      color: 'var(--text-on-dark)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    tone: "accent",
    size: "sm",
    fullWidth: true,
    style: {
      marginTop: 'var(--space-5)'
    },
    icon: "hand-coins"
  }, "Ikut Berinfak")))));
}
function StatsSection() {
  const mobile = useKit();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-brand)',
      padding: mobile ? 'var(--space-8) var(--space-5)' : 'var(--space-12) var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "dark",
    icon: "users",
    value: "180",
    label: "Jamaah rutin Subuh"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    tone: "dark",
    icon: "mic",
    value: "8",
    label: "Kajian per bulan"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    tone: "dark",
    icon: "calendar-days",
    value: "Tiap pekan",
    label: "Gotong royong halaman"
  })));
}
function GallerySection() {
  const P = '../../assets/photos/';
  const mobile = useKit();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: pad(mobile),
      background: 'var(--sand-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    overline: "Dokumentasi",
    title: "Suasana surau",
    description: "Foto-foto kegiatan yang direkam pengurus surau."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? 'repeat(2,minmax(0,1fr))' : 'repeat(4,1fr)',
      gridAutoRows: 'auto',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'interior-ruang-salat.png',
    alt: "Ruang salat surau",
    ratio: "16 / 9",
    style: {
      gridColumn: 'span 2'
    },
    meta: "Ruang Utama",
    icon: "map-pin",
    caption: "Karpet ruang salat selepas Dzuhur."
  }), /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'majelis-jamaah.jpg',
    alt: "Majelis jamaah",
    ratio: "16 / 9",
    style: {
      gridColumn: 'span 2'
    },
    meta: "Kajian Rutin",
    icon: "mic",
    caption: "Majelis ba'da Isya, jamaah putra dan putri."
  }), /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'gotong-royong-halaman.jpg',
    alt: "Gotong royong halaman surau",
    ratio: "3 / 4",
    meta: "Gotong Royong",
    icon: "users",
    caption: "Membersihkan lereng halaman."
  }), /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'latihan-silat.jpg',
    alt: "Latihan silat di surau",
    ratio: "3 / 4",
    position: "center 35%",
    meta: "Remaja",
    icon: "users",
    caption: "Latihan silat tradisi, malam pekanan."
  }), /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'pengurus-surau.jpg',
    alt: "Pengurus surau",
    ratio: "3 / 4",
    position: "center 40%",
    meta: "Pengurus",
    icon: "users",
    caption: "Pengurus dan tuanku selepas musyawarah."
  }), /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'gotong-royong-jamaah.jpg',
    alt: "Jamaah bekerja di halaman",
    ratio: "3 / 4",
    meta: "Gotong Royong",
    icon: "users",
    caption: "Jamaah menanam di halaman atas."
  }))));
}
function ProfilePage() {
  const P = '../../assets/photos/';
  const mobile = useKit();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: pad(mobile),
      background: 'var(--sand-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr',
      gap: mobile ? 'var(--space-8)' : 'var(--space-16)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    icon: "map-pin"
  }, "Lori Lubuk Minturun, Kota Padang"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extrabold)',
      lineHeight: 'var(--lh-snug)',
      fontSize: mobile ? 'var(--fs-h2)' : 'var(--fs-h1)',
      color: 'var(--text-strong)',
      textWrap: 'balance'
    }
  }, "Dibangun bersama, dari halaman yang masih tanah"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-body-default)',
      color: 'var(--text-muted)',
      maxWidth: 480,
      textWrap: 'pretty'
    }
  }, "Surau Bateh Lori berdiri di lereng bukit di tepi nagari. Bangunan dua lantai dengan surambi kayu ini dikerjakan bertahap oleh jamaah sendiri \u2014 dari tiang beton dan tumpukan batu bata sampai ruang salat berkarpet yang dipakai hari ini."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-body-default)',
      color: 'var(--text-muted)',
      maxWidth: 480,
      textWrap: 'pretty'
    }
  }, "Setiap pekan halaman dan lerengnya dibersihkan bergiliran. Pekerjaan itu tidak pernah selesai, dan justru dari situ surau ini hidup.")), /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'pembangunan-surau.jpg',
    alt: "Masa pembangunan surau",
    ratio: "4 / 5",
    position: "center 45%",
    meta: "Masa Pembangunan",
    icon: "hammer",
    caption: "Memasang dinding bata di sisi surambi bawah."
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-dark)',
      padding: pad(mobile)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr',
      gap: mobile ? 'var(--space-8)' : 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'gotong-royong-belakang.jpg',
    alt: "Membersihkan sisi belakang surau",
    ratio: "4 / 3",
    position: "center 55%",
    meta: "Gotong Royong",
    icon: "users",
    caption: "Merapikan sisi belakang, dekat ruang wudhu baru."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--text-h2)',
      color: 'var(--sand-100)',
      textWrap: 'balance'
    }
  }, "Dikelola pengurus, dikerjakan jamaah"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-body-default)',
      color: 'var(--slate-300)',
      maxWidth: 460,
      textWrap: 'pretty'
    }
  }, "Pengurus surau mengatur jadwal khatib, kajian pekanan, dan laporan kas bulanan. Kegiatan hariannya dijalankan bergiliran oleh jamaah sekitar."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "dark",
    icon: "users",
    value: "180",
    label: "Jamaah rutin Subuh"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    tone: "dark",
    icon: "mic",
    value: "8",
    label: "Kajian per bulan"
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: pad(mobile),
      background: 'var(--sand-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    overline: "Roadmap",
    title: "Tahapan pembangunan surau",
    description: "Dikerjakan bertahap sesuai dana infak yang terkumpul."
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: 'var(--space-8)',
      padding: mobile ? 'var(--space-5)' : 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Timeline, {
    variant: "roadmap",
    items: window.SB_DATA.roadmap
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "sand",
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Silsilah guru surau"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "Bagian ini sengaja dikosongkan sampai pengurus memastikan nama dan urutan mata rantainya. Strukturnya sudah siap: ", /*#__PURE__*/React.createElement("code", null, "<Timeline variant=\"silsilah\" />"), ".")))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: pad(mobile),
      background: 'var(--sand-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    overline: "Pengurus",
    title: "Musyawarah pengurus dan tuanku"
  }), /*#__PURE__*/React.createElement(PhotoTile, {
    src: P + 'pengurus-surau.jpg',
    alt: "Pengurus surau berfoto bersama",
    ratio: mobile ? '4 / 3' : '16 / 7',
    position: "center 45%",
    style: {
      marginTop: 'var(--space-8)'
    },
    caption: "Selepas musyawarah pengurus di ruang utama."
  }))));
}
function ContactPage() {
  const c = window.SB_DATA.contact;
  const mobile = useKit();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: pad(mobile),
      background: 'var(--sand-200)',
      minHeight: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    overline: "Kontak",
    title: "Menghubungi pengurus surau",
    description: "Untuk pertanyaan jadwal kajian, khatib Jumat, atau penyaluran infak."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-8)'
    }
  }, c.pengurus.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-brand-soft)',
      color: 'var(--maroon-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h4)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, p.role)), /*#__PURE__*/React.createElement("a", {
    href: 'tel:' + p.phone,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--text-label)',
      fontSize: 'var(--fs-body)',
      textDecoration: 'none',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16
  }), p.phone), /*#__PURE__*/React.createElement(Button, {
    tone: "secondary",
    size: "sm",
    icon: "message-circle",
    style: {
      alignSelf: 'flex-start',
      marginTop: 'auto'
    }
  }, "Kirim WhatsApp"))), /*#__PURE__*/React.createElement(Card, {
    tone: "sand",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--white)',
      color: 'var(--maroon-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-h4)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, "Lokasi surau"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "Lori Lubuk Minturun, Kota Padang, Sumatera Barat")), /*#__PURE__*/React.createElement("a", {
    href: c.maps,
    target: "_blank",
    rel: "noreferrer",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--text-label)',
      fontSize: 'var(--fs-body)',
      textDecoration: 'none',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map",
    size: 16
  }), "Buka di Google Maps"))), /*#__PURE__*/React.createElement(Card, {
    tone: "calm",
    style: {
      marginTop: 'var(--space-6)',
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 18,
    style: {
      color: 'var(--teal-800)',
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-body)'
    }
  }, "Pengurus paling mudah ditemui di surau selepas Maghrib. Jalan menuju surau menanjak \u2014 kabari lebih dahulu bila datang bersama rombongan."))));
}
Object.assign(window, {
  ProgramsSection,
  VerseSection,
  AgendaSection,
  StatsSection,
  GallerySection,
  ProfilePage,
  ContactPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.SB_DATA = {
  times: [{
    name: 'Subuh',
    adzan: '04:58',
    iqamah: '05:10'
  }, {
    name: 'Syuruq',
    adzan: '06:14'
  }, {
    name: 'Dzuhur',
    adzan: '12:16',
    iqamah: '12:30'
  }, {
    name: 'Ashar',
    adzan: '15:38',
    iqamah: '15:50'
  }, {
    name: 'Maghrib',
    adzan: '18:24',
    iqamah: '18:32'
  }, {
    name: 'Isya',
    adzan: '19:36',
    iqamah: '19:45'
  }],
  events: [{
    day: '12',
    month: 'Ags',
    title: 'Kajian Tafsir Surah Al-Kahfi',
    speaker: 'Ust. Rahmat Hidayat',
    time: "Ba'da Maghrib",
    place: 'Ruang utama',
    category: 'Kajian Rutin'
  }, {
    day: '14',
    month: 'Ags',
    title: 'Tahsin Al-Qur\u2019an Dewasa',
    speaker: 'Ust. Zulfikar',
    time: '19.45 WIB',
    place: 'Ruang belajar',
    category: 'Tahsin'
  }, {
    day: '15',
    month: 'Ags',
    title: 'Khutbah Jumat: Amanah dalam Bekerja',
    speaker: 'Ust. H. Marwan Dt. Rajo',
    time: '12.10 WIB',
    place: 'Ruang utama',
    category: 'Jumat'
  }, {
    day: '17',
    month: 'Ags',
    title: 'Doa Bersama HUT Kemerdekaan RI',
    speaker: 'Pengurus Surau',
    time: "Ba'da Subuh",
    place: 'Halaman surau',
    category: 'Kegiatan'
  }, {
    day: '19',
    month: 'Ags',
    title: 'Latihan Silat Tradisi',
    speaker: 'Pelatih sasaran surau',
    time: "Ba'da Isya",
    place: 'Ruang bawah',
    category: 'Silat'
  }],
  programs: [{
    icon: 'swords',
    title: 'Silat Tradisi',
    desc: 'Sasaran silat untuk remaja dan dewasa di ruang bawah surau.',
    meta: 'Malam pekanan · Ba\u2019da Isya'
  }, {
    icon: 'mic',
    title: 'Kajian Rutin Pekanan',
    desc: 'Tafsir dan fikih ibadah bersama ustaz undangan dari Kota Padang.',
    meta: 'Selasa & Kamis · Ba\u2019da Maghrib'
  }, {
    icon: 'users',
    title: 'Tahsin Dewasa',
    desc: 'Perbaikan bacaan Al-Qur\u2019an untuk jamaah dewasa, kelompok kecil.',
    meta: 'Rabu · Ba\u2019da Isya'
  }, {
    icon: 'heart-handshake',
    title: 'Santunan Anak Yatim',
    desc: 'Penyaluran bulanan dari infak jamaah untuk anak yatim sekitar surau.',
    meta: 'Setiap Jumat pertama'
  }],
  news: [{
    tag: 'Pengumuman',
    title: 'Jadwal Khatib Jumat Agustus 1448 H',
    date: '8 Agustus 2026'
  }, {
    tag: 'Laporan',
    title: 'Laporan Kas Surau Juli 2026',
    date: '2 Agustus 2026'
  }, {
    tag: 'Kegiatan',
    title: 'Gotong Royong Pembersihan Ruang Wudhu',
    date: '28 Juli 2026'
  }],
  roadmap: [{
    title: 'Tiang dan lantai bawah',
    period: 'Tahap 1',
    status: 'selesai',
    description: 'Tiang beton dan lantai surambi bawah dikerjakan jamaah sendiri.'
  }, {
    title: 'Surambi kayu lantai atas',
    period: 'Tahap 2',
    status: 'selesai',
    description: 'Pagar dan lantai kayu untuk majelis di lantai atas.'
  }, {
    title: 'Ruang salat berkarpet',
    period: 'Tahap 3',
    status: 'selesai',
    description: 'Lantai, dinding, dan karpet ruang utama yang dipakai hari ini.'
  }, {
    title: 'Ruang wudhu sisi belakang',
    period: 'Tahap 4',
    status: 'berjalan',
    description: 'Dinding bata dan saluran air di sisi belakang surau.'
  }, {
    title: 'Renovasi atap',
    period: 'Tahap 5',
    status: 'rencana',
    description: 'Menunggu dana infak jamaah terkumpul.'
  }],
  contact: {
    maps: 'https://maps.app.goo.gl/bVQSzRjYxisicxUq6?g_st=ic',
    pengurus: [{
      name: 'Ustadz Anshor',
      role: 'Pengurus surau',
      phone: '081261246706'
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.BottomBar = __ds_scope.BottomBar;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ArabicVerse = __ds_scope.ArabicVerse;

__ds_ns.DonationProgress = __ds_scope.DonationProgress;

__ds_ns.EventItem = __ds_scope.EventItem;

__ds_ns.PhotoTile = __ds_scope.PhotoTile;

__ds_ns.PrayerTimeRow = __ds_scope.PrayerTimeRow;

__ds_ns.PrayerTimeTable = __ds_scope.PrayerTimeTable;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Timeline = __ds_scope.Timeline;

})();
