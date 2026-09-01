// Titik impor tunggal untuk komponen visual & token design system, yang
// hidup di `src/design-system/components/` dan diedit langsung di sana
// (lihat ADR 0003-site-vendors-design-system-snapshot dan
// 0009-hapus-skrip-sync-ds). Situs tidak mengimpor folder design system di
// luar `site/`, dan tidak ada lagi skrip yang menyalin dari sana.
const BASE = './design-system/components';

export { Badge } from './design-system/components/core/Badge.jsx';
export { Button } from './design-system/components/core/Button.jsx';
export { Card } from './design-system/components/core/Card.jsx';
export { Icon } from './design-system/components/core/Icon.jsx';
export { SectionHeading } from './design-system/components/core/SectionHeading.jsx';
export { Tag } from './design-system/components/core/Tag.jsx';
export { useBreakpoint } from './design-system/components/core/useBreakpoint.js';

export { Dialog } from './design-system/components/feedback/Dialog.jsx';
export { PhotoLightbox } from './design-system/components/feedback/PhotoLightbox.jsx';
export { Toast } from './design-system/components/feedback/Toast.jsx';
export { Tooltip } from './design-system/components/feedback/Tooltip.jsx';
export { VideoLightbox } from './design-system/components/feedback/VideoLightbox.jsx';

export { Checkbox } from './design-system/components/forms/Checkbox.jsx';
export { Input } from './design-system/components/forms/Input.jsx';
export { RadioGroup } from './design-system/components/forms/RadioGroup.jsx';
export { Select } from './design-system/components/forms/Select.jsx';
export { Switch } from './design-system/components/forms/Switch.jsx';

export { BottomBar } from './design-system/components/navigation/BottomBar.jsx';
export { Footer } from './design-system/components/navigation/Footer.jsx';
export { NavBar } from './design-system/components/navigation/NavBar.jsx';
export { Tabs } from './design-system/components/navigation/Tabs.jsx';

export { ArabicVerse } from './design-system/components/surau/ArabicVerse.jsx';
export { EventItem } from './design-system/components/surau/EventItem.jsx';
export { PhotoTile } from './design-system/components/surau/PhotoTile.jsx';
export { StatBlock } from './design-system/components/surau/StatBlock.jsx';
export { Timeline } from './design-system/components/surau/Timeline.jsx';
export { VideoEmbed } from './design-system/components/surau/VideoEmbed.jsx';

export const ASSETS_BASE = BASE;
