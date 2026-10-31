export type BackgroundGroup = 'cover' | 'gradients';

export interface SystemBackground {
  id: string;
  name: string;
  group: BackgroundGroup;
  /** CSS background value (images use url(), gradients use linear-gradient). */
  css: string;
  video?: string;
}

export const GROUP_LABELS: Record<BackgroundGroup, string> = {
  cover: 'Manganum galleries',
  gradients: 'Gradients',
};

export const SYSTEM_BACKGROUNDS: SystemBackground[] = [
  { id: 'bg-1', name: 'Dunes', group: 'cover', css: "url('/backgrounds/image-1.jpg') center/cover no-repeat" },
  { id: 'bg-2', name: 'Shore', group: 'cover', css: "url('/backgrounds/image-2.jpg') center/cover no-repeat" },
  { id: 'bg-3', name: 'Summit', group: 'cover', css: "url('/backgrounds/image-3.jpg') center/cover no-repeat" },
  { id: 'bg-4', name: 'Forest', group: 'cover', css: "url('/backgrounds/image-4.jpg') center/cover no-repeat" },
  { id: 'bg-5', name: 'Field', group: 'cover', css: "url('/backgrounds/image-5.jpg') center/cover no-repeat" },
  { id: 'bg-6', name: 'Night sky', group: 'cover', css: "url('/backgrounds/image-6.jpg') center/cover no-repeat" },
  { id: 'bg-video', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10070-fhd.mp4' },
  { id: 'g1', name: 'Sunset', group: 'gradients', css: 'linear-gradient(135deg,#ff9a9e,#fecfef)' },
  { id: 'g2', name: 'Ocean', group: 'gradients', css: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)' },
  { id: 'g3', name: 'Midnight', group: 'gradients', css: 'linear-gradient(135deg,#0f2027,#2c5364)' },
  { id: 'g4', name: 'Lavender', group: 'gradients', css: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  { id: 'g5', name: 'Mint', group: 'gradients', css: 'linear-gradient(135deg,#84fab0,#8fd3f4)' },
  { id: 'g6', name: 'Ember', group: 'gradients', css: 'linear-gradient(135deg,#f6d365,#fda085)' },
];

export type BackgroundLook =
  | { kind: 'image'; css: string }
  | { kind: 'video'; url: string }
  | { kind: 'gradient'; css: string };

export function resolveBackground(current: string, custom?: string): BackgroundLook {
  if (current === 'custom' && custom) {
    return custom.startsWith('data:video') || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(custom)
      ? { kind: 'video', url: custom }
      : { kind: 'image', css: `url('${custom}') center/cover no-repeat` };
  }
  const item = SYSTEM_BACKGROUNDS.find((b) => b.id === current);
  if (item) {
    if (item.video) return { kind: 'video', url: item.video };
    return current.startsWith('g')
      ? { kind: 'gradient', css: item.css }
      : { kind: 'image', css: item.css };
  }
  const fallback = SYSTEM_BACKGROUNDS[0]!;
  return { kind: 'image', css: fallback.css };
}

export function availableBackgrounds(disliked: string[], custom?: string): SystemBackground[] {
  const list = SYSTEM_BACKGROUNDS.filter((b) => !disliked.includes(b.id));
  if (custom && !disliked.includes('custom')) {
    list.push({ id: 'custom', name: 'My background', group: 'cover', css: `url('${custom}') center/cover no-repeat` });
  }
  return list;
}
