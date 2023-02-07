import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'

// state for modal
export const modalState = atom({
  key: 'modalState',
  default: false,
})

// state for movie
export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})