import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';

import {BiMessageDetail} from 'react-icons/bi';
import {RiMovieLine} from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import MovieGroup from './MovieGroup';


const MovieWatch = ({movieData, episodes, movieRecommnedData}) => {
    const {episode: episodeParam} = useParams()
    const topRef = useRef(null)
    
    let embedUrl = ''

    if(episodes?.length === 1){
        embedUrl = episodes[0].link_embed
    }
    else {
        episodes?.forEach(item => {
            if(item.slug === episodeParam){
                embedUrl = item.link_embed
                return
            }
        })
    }

    const handleScrollToTop = () => {
        topRef?.current.scrollIntoView({ behavior: 'smooth'})
    }

    return ( 
        <>
            <div className='relative mb-8'>
                <div className='absolute top-[-100px]' ref={topRef}></div>
                <iframe 
                    src={embedUrl} 
                    className="w-full h-[430px]"
                    title={movieData?.name}
                    allow="fullscreen"
                >
                </iframe>
                <div className='mt-5 flex justify-between items-center pr-6 border-b-[0.3px] pb-5 border-zinc-700'>
                    <div>
                        <h3 className="text-4xl font-bold mb-2">{movieData?.origin_name}</h3>
                        <h4 className="text-xl opacity-80">{`( ${movieData?.name} )`}</h4>
                    </div>
                    <div className='text-center'>
                        <h3 className="text-2xl font-bold mb-3">{`TẬP ${episodeParam}`}</h3>
                        <button 
                            className='opacity-80 text-sm flex gap-1 items-center border-[1px] border-zinc-600 py-1 px-2 rounded-lg hover:opacity-100'
                        >
                            <AiOutlinePlus size={13}/>
                            Add to bookmark
                        </button>
                    </div>
                </div>

                <div className='flex gap-2 items-center mt-5 text-red-400'>
                        <BiMessageDetail size={23}/>
                        <span className='text-lg' >Nội dung: </span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: movieData?.content }} className='mt-2 px-4 italic opacity-70'></p>

                <div>
                    <div className='flex gap-3 items-center my-6 text-red-400 '>
                        <RiMovieLine size={23}/>
                        <h4 className='text-lg'>Chọn tập phim :</h4>
                    </div>
                    <ul className='flex gap-3 flex-wrap '>
                        {
                            Array.from(Array(episodes?.length).keys()).map(index => {
                                if (parseInt(episodeParam) === index + 1 ) {
                                    return (
                                        <Link 
                                            to={`/watch/${movieData?.slug}/episode/${index+1}`}
                                            key={index} 
                                            className='py-2 px-3 border-[1px] border-neutral-600 rounded-xl text-sm cursor-pointer bg-red-500 '
                                        >
                                            Tập {index + 1}
                                        </Link>
                                    )
                                }
                                else {
                                    return (
                                        <Link
                                            to={`/watch/${movieData?.slug}/episode/${index+1}`}
                                            key={index} 
                                            onClick= {handleScrollToTop}
                                            className='py-2 px-3 border-[1px] border-neutral-600 rounded-xl text-sm cursor-pointer hover:bg-red-500 transition duration-300 ease-linear'
                                        >
                                            Tập {index + 1}
                                        </Link>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>

            <MovieGroup movieGroupName="Phim Cùng Thể Loại" moviesdata={movieRecommnedData?.moviesData}/>
        </>
    );
}
 
export default MovieWatch;