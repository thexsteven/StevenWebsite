import assets from './media-assets.json';

export type AssetId = keyof typeof assets;
export const media = {
  portrait: { desktop: 'spiegel-schwarzes-shirt' },
  hawaii: { desktop: 'kokohead-sonnenuntergang', mobile: 'ala-moana-palmen' },
  cycling: { desktop: 'grand-tour-schild' },
  fall: { desktop: 'fallschirm-absprung', mobile: 'fallschirm-gurtzeug' },
  freefall: { desktop: 'fallschirm-freifall' },
  parachute: { desktop: 'fallschirm-schirm-offen' },
  arrival: { desktop: 'flug-selfie' },
  daily: { desktop: 'sprachschule-stundenplan', mobile: 'kreuzung-radfahrer' },
  adventures: { desktop: 'bambuswald-weg' },
  food: { desktop: 'poke-bowl' },
  island: { desktop: 'maunakea-sonnenuntergang' },
  departure: { desktop: 'tag00-start-einfahrt' },
  turin: { desktop: 'turin-galleria' },
  pizza: { desktop: 'pizzateig-kueche' },
  destination: { desktop: 'feierabendbier-terrasse' },
  night: { desktop: 'nachthimmel-berge', mobile: 'van-nacht-pass' },
  mountain: { desktop: 'panorama-kalkmassiv' },
  sport: { desktop: 'handstand' },
} satisfies Record<string, { desktop: AssetId; mobile?: AssetId }>;

export type MediaName = keyof typeof media;
export function mediaAsset(id: AssetId) { return assets[id]; }
export function imageUrl(id: AssetId, width: number) { return assets[id].url.replace('{BREITE}', String(width)); }
