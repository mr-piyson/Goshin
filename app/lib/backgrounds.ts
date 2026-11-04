export type BackgroundGroup = 'cover' | 'gradients';

export interface SystemBackground {
  id: string;
  name: string;
  group: BackgroundGroup;
  /** CSS background value (images use url(), gradients use linear-gradient). */
  css: string;
  /** Image source for image backgrounds (used for reliable load/error handling). */
  src?: string;
  video?: string;
  /** First-frame still shown while the video decodes on first paint. */
  poster?: string;
}

export const GROUP_LABELS: Record<BackgroundGroup, string> = {
  cover: 'Manganum galleries',
  gradients: 'Gradients',
};

const imageCss = (src: string) => `url('${src}') center/cover no-repeat`;

export const SYSTEM_BACKGROUNDS: SystemBackground[] = [
  { id: 'bg-1', name: 'Dunes', group: 'cover', src: '/backgrounds/image-1.jpg', css: imageCss('/backgrounds/image-1.jpg') },
  { id: 'bg-2', name: 'Shore', group: 'cover', src: '/backgrounds/image-2.jpg', css: imageCss('/backgrounds/image-2.jpg') },
  { id: 'bg-3', name: 'Summit', group: 'cover', src: '/backgrounds/image-3.jpg', css: imageCss('/backgrounds/image-3.jpg') },
  { id: 'bg-4', name: 'Forest', group: 'cover', src: '/backgrounds/image-4.jpg', css: imageCss('/backgrounds/image-4.jpg') },
  { id: 'bg-5', name: 'Field', group: 'cover', src: '/backgrounds/image-5.jpg', css: imageCss('/backgrounds/image-5.jpg') },
  { id: 'bg-6', name: 'Night sky', group: 'cover', src: '/backgrounds/image-6.jpg', css: imageCss('/backgrounds/image-6.jpg') },
  { id: 'bg-video-1', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10070-fhd.mp4', poster: '/backgrounds/10070-poster.jpg' },
  { id: 'bg-video-2', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10002-fhd.mp4', poster: '/backgrounds/10002-poster.jpg' },
  { id: 'bg-video-3', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10005-fhd.mp4', poster: '/backgrounds/10005-poster.jpg' },
  { id: 'bg-video-4', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10006-fhd.mp4', poster: '/backgrounds/10006-poster.jpg' },
  { id: 'bg-video-5', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10025-fhd.mp4', poster: '/backgrounds/10025-poster.jpg' },
  { id: 'bg-video-6', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10028-fhd.mp4', poster: '/backgrounds/10028-poster.jpg' },
  { id: 'bg-video-7', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10032-fhd.mp4', poster: '/backgrounds/10032-poster.jpg' },
  { id: 'bg-video-8', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10034-fhd.mp4', poster: '/backgrounds/10034-poster.jpg' },
  { id: 'bg-video-9', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10035-fhd.mp4', poster: '/backgrounds/10035-poster.jpg' },
  { id: 'bg-video-10', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10043-fhd.mp4', poster: '/backgrounds/10043-poster.jpg' },
  { id: 'bg-video-11', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10046-fhd.mp4', poster: '/backgrounds/10046-poster.jpg' },
  { id: 'bg-video-12', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10069-fhd.mp4', poster: '/backgrounds/10069-poster.jpg' },
  { id: 'bg-video-13', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10070-fhd.mp4', poster: '/backgrounds/10070-poster.jpg' },
  { id: 'bg-video-14', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10071-fhd.mp4', poster: '/backgrounds/10071-poster.jpg' },
  { id: 'bg-video-15', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10072-fhd.mp4', poster: '/backgrounds/10072-poster.jpg' },
  { id: 'bg-video-16  ', name: 'Ambient video', group: 'cover', css: '#0b0f14', video: '/backgrounds/10073-fhd.mp4', poster: '/backgrounds/10073-poster.jpg' },
  { id: 'g1', name: 'Sunset', group: 'gradients', css: 'linear-gradient(135deg,#ff9a9e,#fecfef)' },
  { id: 'g2', name: 'Ocean', group: 'gradients', css: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)' },
  { id: 'g3', name: 'Midnight', group: 'gradients', css: 'linear-gradient(135deg,#0f2027,#2c5364)' },
  { id: 'g4', name: 'Lavender', group: 'gradients', css: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  { id: 'g5', name: 'Mint', group: 'gradients', css: 'linear-gradient(135deg,#84fab0,#8fd3f4)' },
  { id: 'g6', name: 'Ember', group: 'gradients', css: 'linear-gradient(135deg,#f6d365,#fda085)' },
];

export type BackgroundLook =
  | { kind: 'image'; css: string; src: string }
  | { kind: 'video'; url: string; poster?: string }
  | { kind: 'gradient'; css: string }
  | { kind: 'fallback' };

export function resolveBackground(current: string, custom?: string): BackgroundLook {
  if (current === 'custom') {
    if (!custom) return { kind: 'fallback' };
    return custom.startsWith('data:video') || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(custom)
      ? { kind: 'video', url: custom }
      : { kind: 'image', css: imageCss(custom), src: custom };
  }
  const item = SYSTEM_BACKGROUNDS.find((b) => b.id === current);
  if (item) {
    if (item.video) return { kind: 'video', url: item.video, poster: item.poster };
    return current.startsWith('g')
      ? { kind: 'gradient', css: item.css }
      : { kind: 'image', css: item.css, src: item.src ?? '' };
  }
  return { kind: 'fallback' };
}

/** The lightweight still that represents a background while it loads. */
export function backgroundStill(look: BackgroundLook): string | undefined {
  if (look.kind === 'image') return look.src;
  if (look.kind === 'video') return look.poster;
  return undefined;
}

export function availableBackgrounds(disliked: string[], custom?: string): SystemBackground[] {
  const list = SYSTEM_BACKGROUNDS.filter((b) => !disliked.includes(b.id));
  if (custom && !disliked.includes('custom')) {
    list.push({ id: 'custom', name: 'My background', group: 'cover', css: imageCss(custom), src: custom });
  }
  return list;
}
