import types from '../assets/types2.png';
import search from '../assets/search.png';
import favorite from '../assets/favorite.png';
import {HashMap} from './interfaces';

export const onBoardingScreenMap: HashMap = {
  1: {
    heading: 'Explore Pokemons',
    subHeading:
      'Discover new and rare species of Pokemons and learn about their strengths, weaknesses and special abilities.',
    image: types,
  },
  2: {
    heading: 'Search Pokemons',
    subHeading:
      'Find the Pokemons you want quickly and easily usng our powerful search feature with different filters.',
    image: search,
  },
  3: {
    heading: 'Manage Favorites',
    subHeading:
      'Keep track of your favorite Pokemons and access them easily whenever you want.',
    image: favorite,
  },
};
