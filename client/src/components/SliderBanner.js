import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from 'swiper';
import {BiTimeFive, BiWorld,BiMessageDetail} from 'react-icons/bi';
import {FaPlay} from 'react-icons/fa';
import {ImFilm} from 'react-icons/im'; 
import {Link} from 'react-router-dom'

import 'swiper/css';
import 'swiper/css/autoplay'; 


const SliderBanner = ({randomGroupItem}) => {
    const moviesData = randomGroupItem?.movieList

    return ( 
        <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{delay: 3000}}
        >
            {
                moviesData?.map((movie) => (
                    <SwiperSlide key={movie?._id}>
                        <div className='relative cursor-pointer group'>
                            <img src={movie['poster_url']?.replace("https://img.hiephanhthienha.com", "https://img.ophim.live")} alt="img banner" className='h-48 md:h-96 w-full object-cover group-hover:opacity-90 transition duration-200 ease-in-out'/>
                            <div 
                                className='absolute top-0 left-0 right-0 bottom-0'
                                style={{background: "linear-gradient(266deg, rgba(0,0,0,0.18017629415047265) 0%, rgba(0,0,0,0.805946602273722) 100%)"}}
                            >
                            </div>
                           
                            <div className='absolute top-0 left-0 md:right-[200px] bottom-0 pl-4 pt-5 md:pl-6 md:pt-2'>

                                <h3 className='text-2xl md:text-5xl font-bold  text-red-500 limitALine'>{movie["origin_name"]}</h3>

                                <h4 className='mb-3 md:text-xl font-bold md:my-3'>{`( ${movie["name"]} )`}</h4>

                                <div className='text-sm md:text-base flex gap-2 items-center mb-2 md:mt-10 opacity-80'>
                                    <BiWorld size={20}/>
                                    <span className='hidden md:inline-block'>Quốc gia: {movie['country']}</span>
                                    <span className=' md:hidden'>QG: {movie['country']}</span>

                                </div>
                                <div className='text-sm md:text-base flex gap-2 items-center mb-2 opacity-80'>
                                    <BiTimeFive size={20}/>
                                    <span>Thời lượng: {movie['time']}</span>
                                </div>
                                <div className='text-sm md:text-base flex gap-2 items-center mb-2 opacity-80'>
                                    <ImFilm size={20}/>
                                    <span>Thể loại: {movie['category'][0]}</span>
                                </div>

                                <div className='hidden md:block'>
                                    <div className='flex gap-2 items-center mt-7 opacity-80'>
                                        <BiMessageDetail size={20}/>
                                        <span>Nội dung: </span>
                                    </div>
                                    <p dangerouslySetInnerHTML={{ __html: movie["content"] }} className='mt-1 px-4 mb-[200px] italic opacity-80 limit3Lines'></p>
                                </div>
                            </div>
                           
                            <Link to={`/watch/${movie["slug"]}/episode/1`} className='absolute flex flex-col items-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                                <div className='hidden md:block'>
                                    <FaPlay size={50}/>
                                </div>
                                <div className='md:hidden'>
                                    <FaPlay size={24}/>
                                </div>
                                <h4 className='hidden group-hover:block mt-2 font-bold  '>PLAY NOW</h4>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))
            }

        </Swiper>
     );
}
 
export default SliderBanner;