import Image from "next/legacy/image"
import { useEffect, useState } from "react"
import { BsFillPlayFill, BsInfoCircle } from 'react-icons/bs'
import { useRecoilState } from 'recoil'

import { baseUrl } from "../constants/movie";
import { Movie } from "../typings"
import { modalState, movieState } from '../atoms/modalAtom'

interface Props { 
    netflixOriginals: Movie[];
 }

function Banner({ netflixOriginals }: Props) {
  // Random movies
  const [movie, setMovie] = useState<Movie | null>(null);  // <>: type
  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])  // random idx of movies
  }, [netflixOriginals]);

  // modal
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div  className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[95vh] lg:justify-end lg:pb-12">
      {/* home picture */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
          <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout='fill' objectFit="cover"/> 
      </div>    
      {/* info */}
        <h1 className="text-2xl font-fold lg:text-5xl md:text-3xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-xl lg:text-xl">{movie?.overview}</p>
        {/* button */}
        <div className="flex space-x-3">
          <button className="bannerButton bg-white text-black">
            <BsFillPlayFill className="h-4 w-4 md:h-7 md:w-7"/>
            Play
          </button>
          <button 
            className="bannerButton bg-[gray]/70" 
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
          >
            <BsInfoCircle className="h-5 w-5 md:h-7 md:w-7"/>
            More Info
          </button>
        </div>
    </div>
  )
}

export default Banner