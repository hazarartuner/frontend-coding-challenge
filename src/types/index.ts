import { AxiosError } from 'axios';

export type SpotifyTokenData = {
  code: string;
  codeVerifier: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type SpotifyApiError = AxiosError<{
  error: string;
  error_description: string;
}>;

type ExternalUrls = {
  spotify: string;
};

export type SpotifyUser = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  followers: {
    href: null | string;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
};

export type AlbumResponse = {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: AlbumItem[];
  };
};

export type AlbumItem = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  copyrights: Copyright[];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: Artist[];
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type Copyright = {
  text: string;
  type: string;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Owner = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type TracksRef = {
  href: string;
  total: number;
};

export type PlaylistItem = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: null | boolean;
  snapshot_id: string;
  tracks: TracksRef;
  type: string;
  uri: string;
};

export type Playlists = {
  href: string;
  items: PlaylistItem[];
};

export type PlaylistsResponse = {
  message: string;
  playlists: Playlists;
};

export type CategoriesResponse = {
  categories: Categories;
};

export type Categories = {
  href: string;
  items: CategoryItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null | string;
  total: number;
};

export type CategoryItem = {
  href: string;
  icons: Image[];
  id: string;
  name: string;
};
