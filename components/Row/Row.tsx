import { useRef, useState } from "react"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import Thumbnail from "./Thumbnail"
import { Movie } from "../../typings"

interface Props {
    title: string
    // When using firebase
    // movie: Movie | DocumentData
    movies: Movie[]
}

function Row({title, movies}: Props) {
    // row reference
    const rowRef = useRef<HTMLDivElement>(null);
    // left and right move
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction: string) => {
        setIsMoved(true);
        if (rowRef.current) {
            // clientWidth: width of the scrolled row
            const {scrollLeft, clientWidth} = rowRef.current;
            const scrollTo = 
                direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2 mt-40">
        <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
            {title}
        </h2>
        <div className="group relative md:-ml-2">
            {/* left arrow */}
            <AiOutlineLeft 
                className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`}
                onClick={() => handleClick("left")}
            />
            {/* content */}
            <div 
                className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-1.5 md:p-2"
                ref={rowRef}
            >
                {movies.map((movie) => (
                    <Thumbnail key={movie.id} movie={movie}/>
                ))}
            </div>
            {/* right arrow */}
            <AiOutlineRight 
                className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 hover:scale-125 group-hover:opacity-100"
                onClick={() => handleClick("right")}
            />
        </div>
    </div>
  )
}

export default Row