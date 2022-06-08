import {
  AddPost,
  Home,
  ImageUpload,
  Profile,
  Weather,
  Spotify,
  Map,
} from '../../containers';

export const HomeStack = [
  {
    name: 'Home',
    component: Home,
    key: 'Home',
  },
  {
    name: 'AddPost',
    component: AddPost,
    key: 'AddPost',
  },
  {
    name: 'ImageUpload',
    component: ImageUpload,
    key: 'ImageUpload',
  },
  {
    name: 'Profile',
    component: Profile,
    key: 'Profile',
  },
  {
    name: 'Weather',
    component: Weather,
    key: 'Weather',
  },
  {
    name: 'Spotify',
    component: Spotify,
    key: 'Spotify',
  },
  {
    name: 'Map',
    component: Map,
    key: 'Map',
  },
];
