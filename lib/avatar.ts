export type AvatarOutfit = {
  id: string;
  image: string;
  alt: string;
};

// Future outfits use the same full-body portrait framing.
export const techOutfit: AvatarOutfit = {
  id: 'tech',
  image: '/images/avatar/steven-tech-v2.webp',
  alt: 'Steven als schlanker Anime-Cyborg mit Locken, Bart und dunklem Technik-Outfit',
};

export const learnModeOutfit: AvatarOutfit = {
  id: 'learn-mode',
  image: '/images/avatar/steven-learn-mode.webp',
  alt: 'Steven im Learn mode mit goldenem Haar, leuchtender Aura und Energieblitzen',
};
