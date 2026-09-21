export type AlbumPhoto = {
  id: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  alt: string;
};

export type AlbumMapStop = {
  photoId: string;
  label: string;
  lat: number;
  lon: number;
};

export type TravelAlbumData = {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  locationLabel: string;
  durationLabel: string;
  coverCaption: string;
  cover: string;
  sections: {
    id: string;
    title: string;
    intro: string;
    photos: AlbumPhoto[];
    mapStops?: AlbumMapStop[];
  }[];
};
