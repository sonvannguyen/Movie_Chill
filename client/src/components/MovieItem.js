import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';

import { BsPlayCircle } from "react-icons/bs";
import {RiDeleteBack2Line} from 'react-icons/ri'

const MovieItem = ({inPageEdit, movieData, handleOpenModalDeleteAMovie, isLoading, isSkeleton}) => {
    const handleClickDelete = () => {
        handleOpenModalDeleteAMovie(movieData?._id)
    }
    return ( 
        <div>
            {
                isLoading ? 
                (
                    <div>
                        <div className="animate-pulse w-full h-[260px] bg-zinc-700 rounded-md "></div>
                        <div className="animate-pulse w-2/3 h-5 bg-zinc-700 my-2 rounded-md"></div>
                        <div className="animate-pulse w-full h-5 bg-zinc-700 rounded-md"></div>
                    </div>
                ) :
                (
                    <>
                        <div className="relative group" >
                            <div className="overflow-hidden group rounded-md">
                                {/* for mobile */}
                                <LazyLoad className='md:hidden LazyLoad' height={300}>
                                    <img 
                                        src={movieData?.thumb_url?.replace("https://img.hiephanhthienha.com", "https://img.ophim.live")}
                                        className='is-visible w-full min-h-[300px] max-h-[300px] md:min-h-[260px] lg:min-h-[260px] lg:max-h-[260px] object-cover rounded-md cursor-pointer group-hover:opacity-70 group-hover:scale-105 transition duration-300 ease-in-out'
                                        alt="thumb img" 
                                    />
                                </LazyLoad>

                                {/* for tablet and desktop */}
                                {
                                    isSkeleton ?
                                    (
                                        <LazyLoad className='hidden md:block LazyLoad' height={260} width={200} offset={100}>
                                            <img 
                                                src={movieData?.thumb_url?.replace("https://img.hiephanhthienha.com", "https://img.ophim.live")}
                                                className='is-visible min-h-[260px] max-h-[260px] object-cover rounded-md cursor-pointer group-hover:opacity-70 group-hover:scale-105 transition duration-300 ease-in-out'
                                                alt="thumb img" 
                                            />
                                        </LazyLoad>
                                    ):
                                    (
                                        <img 
                                            src={movieData?.thumb_url?.replace("https://img.hiephanhthienha.com", "https://img.ophim.live")}
                                            className='hidden md:block is-visible min-h-[260px] max-h-[260px] object-cover rounded-md cursor-pointer group-hover:opacity-70 group-hover:scale-105 transition duration-300 ease-in-out'
                                            alt="thumb img" 
                                        />
                                    )
                                }
                            </div>

                            <Link to={`/detail/${movieData?.slug}`} className="hidden group-hover:flex absolute top-0 bottom-0 left-0 right-0 items-center justify-center cursor-pointer">
                                <BsPlayCircle size={40} className='items-center text-white'/>
                            </Link>

                            {
                                inPageEdit &&
                                <div 
                                    onClick={handleClickDelete}
                                    className="absolute top-0 right-0 p-2 bg-zinc-700 cursor-pointer hover:bg-red-500"
                                >
                                    <RiDeleteBack2Line size={22}/>
                                </div>
                            }
                        </div> 

                        <Link to={`/detail/${movieData?.slug}`} className="mt-3">
                            <h4 className='text-lg font-bold cursor-pointer opacity-90 limitALine'>{movieData?.origin_name}</h4>
                            <h4 className='text-sm cursor-pointer opacity-60 limitALine'>{movieData?.name}</h4>
                        </Link>
                    </>
                )
            }

        </div>
     );
}
 
export default MovieItem;