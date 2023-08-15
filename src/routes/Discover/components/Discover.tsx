import React, { Component } from 'react';
import { toast } from 'react-toastify';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import api from '../../../api';
import {
  AlbumItem,
  AlbumResponse,
  CategoriesResponse,
  CategoryItem,
  PlaylistItem,
  PlaylistsResponse,
} from '../../../types';
import getTokenDataFromStorage from '../../../utils/getTokenDataFromStorage';

//TODO: Fix `any` types here

interface IDiscoverProps {}

interface IDiscoverState {
  newReleases: Array<AlbumItem>;
  playlists: Array<PlaylistItem>;
  categories: Array<CategoryItem>;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  controller = new AbortController();

  componentWillUnmount() {
    this.controller.abort();
  }

  componentDidMount() {
    const tokenData = getTokenDataFromStorage();

    // Do not request to api if access_token not set
    if (!tokenData?.access_token) {
      return;
    }

    try {
      // Fetch new releases
      api
        .get<AlbumResponse>(`/browse/new-releases`, { signal: this.controller.signal })
        .then((response) => {
          this.setState((prev) => ({
            ...prev,
            newReleases: response.data.albums.items,
          }));
        });

      // Fetch featured playlists
      api
        .get<PlaylistsResponse>(`/browse/featured-playlists`, { signal: this.controller.signal })
        .then((response) => {
          this.setState((prev) => ({
            ...prev,
            playlists: response.data.playlists.items,
          }));
        });

      // Fetch categories
      api
        .get<CategoriesResponse>(`/browse/categories`, { signal: this.controller.signal })
        .then((response) => {
          this.setState((prev) => ({
            ...prev,
            categories: response.data.categories.items,
          }));
        });
    } catch (e) {
      // Show default error
      toast('Unexpected error happened', { type: 'error' });

      // we may send the error to the error service
      console.error(e);
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
