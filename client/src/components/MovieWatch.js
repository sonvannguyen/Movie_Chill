import { Link } from 'react-router-dom';
import { useRef } from 'react';

import {BiMessageDetail} from 'react-icons/bi';
import {RiMovieLine} from 'react-icons/ri'
import MovieGroup from './MovieGroup';


const MovieWatch = ({movieData, episode}) => {
    const topRef = useRef(null)
    let embedUrl = ''
    const listEpisodeData = movieData?.episodes[0].server_data

    if(listEpisodeData?.length === 1){
        embedUrl = listEpisodeData[0].link_embed
    }
    else {
        listEpisodeData?.forEach(item => {
            if(item.slug === episode){
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
            <div className='relative'>
                <div className='absolute top-[-100px]' ref={topRef}></div>
                <iframe 
                    src={embedUrl} 
                    className="w-full h-[430px] "
                    title={movieData?.movie.name}
                    allow="fullscreen"
                >
                </iframe>
                <div className='mt-5 flex justify-between items-center pr-6 border-b-[0.3px] pb-5 border-zinc-700'>
                    <div>
                        <h3 className="text-4xl font-bold mb-2">{movieData?.movie?.origin_name}</h3>
                        <h4 className="text-xl opacity-80">{`( ${movieData?.movie?.name} )`}</h4>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{`TẬP ${episode}`}</h3>
                </div>

                <div className='flex gap-2 items-center mt-5 text-red-400'>
                        <BiMessageDetail size={23}/>
                        <span className='text-lg' >Nội dung: </span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: movieData?.movie?.content }} className='mt-2 px-4 italic opacity-70'></p>

                <div>
                    <div className='flex gap-3 items-center my-6 text-red-400 '>
                        <RiMovieLine size={23}/>
                        <h4 className='text-lg'>Chọn tập phim :</h4>
                    </div>
                    <ul className='flex gap-3 flex-wrap '>
                        {
                            Array.from(Array(listEpisodeData?.length).keys()).map(index => {
                                if (parseInt(episode) === index + 1 ) {
                                    return (
                                        <Link 
                                            to={`/watch/${movieData?.movie.slug}/${index+1}`}
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
                                            to={`/watch/${movieData?.movie.slug}/${index+1}`}
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

            <MovieGroup movieGroupName="Recommend"/>
        </>
    );
}
 
export default MovieWatch;