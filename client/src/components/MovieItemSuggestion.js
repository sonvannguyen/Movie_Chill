import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

import {FaPlay} from 'react-icons/fa';


const MovieItemSuggestion = ({movieData, isLoading}) => {
    return ( 
        <>
            {
                isLoading ? 
                (
                    <div className='flex gap-5 mb-5'>
                        <div className='animate-pulse h-[120px] w-[80px] bg-zinc-700 rounded-md'></div>
                        <div className='flex flex-col justify-between '>
                            <div className='animate-pulse w-16 h-4 bg-zinc-700'></div>
                            <div className='animate-pulse w-20 h-4 bg-zinc-700'></div>
                            <div className='animate-pulse w-24 h-4 bg-zinc-700'></div>
                            <div className='animate-pulse w-20 h-4 bg-zinc-700'></div>
                            <div className='animate-pulse w-16 h-4 bg-zinc-700'></div>
                        </div>
                    </div>
                ) :
                (
                    <Link to={`/detail/${movieData?.slug}`} className="mb-5 flex gap-5 cursor-pointer group hover:bg-zinc-700 transition duration-200 ease-in-out rounded-md">
                        <div className="relative">

                            <LazyLoad LazyLoad height={120} className='LazyLoad ' >
                                <img
                                    src={movieData?.thumb_url} 
                                    alt="movie thumb" 
                                    className="is-visible max-w-[80px] h-full object-cover opacity-90 group-hover:opacity-60 rounded-md"
                                />
                            </LazyLoad>

                            <div className='hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                                <FaPlay/>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between pb-2">
                            <h4 className="opacity-90">{movieData?.origin_name}</h4>
                            <h4 className="text-sm opacity-60">{movieData?.category[0]}</h4>
                            {
                                movieData?.type === 'single' ? 
                                (
                                    <h4 className="text-sm italic opacity-60">Phim lẻ</h4>
                                ) :
                                (
                                    <h4 className="text-sm italic opacity-60">Phim bộ</h4>
                                )
                            }
                            <h4 className='text-sm mt-2 opacity-70'>{movieData?.time}</h4>
                        </div>
                    </Link>
                )
            }
        </>
     );
}
 
export default MovieItemSuggestion;