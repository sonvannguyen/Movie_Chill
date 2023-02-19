import { useState, useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import MovieItem from "./MovieItem";

const slidesPerViewByBreakpoints = {
    'sm': 1.6,
    'md': 3.3,
    'lg': 4.3,
};

const MovieGroup = ({movieGroupName, icon, moviesdata, isLoading}) => {
    const [slider, setSlider] = useState({
        slidesPerView: slidesPerViewByBreakpoints.sm,
        gap: 16
    })

    useEffect(() => {
        const width = window.innerWidth;
    
        if(width >= 640 && width < 836){
            setSlider({
                slidesPerView: slidesPerViewByBreakpoints.md,
                gap: 10
            })
        }
        if(width >= 836){
            setSlider({
                slidesPerView: slidesPerViewByBreakpoints.lg,
                gap: 14
            })
        }

        function handleResize() {
            const width = window.innerWidth;
            if (width < 640) {
                setSlider({
                    slidesPerView: slidesPerViewByBreakpoints.sm,
                    gap: 16
                })
            } else if (width < 836) {
                setSlider({
                    slidesPerView: slidesPerViewByBreakpoints.md,
                    gap: 10
                })
            } 
            else {
                setSlider({
                    slidesPerView: slidesPerViewByBreakpoints.lg,
                    gap: 14
                })
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
      
    return ( 
        <div className="mb-4">
            {
                isLoading ? 
                (
                    <div className="animate-pulse w-36 h-8 bg-zinc-700 rounded-md mb-4 mt-3"></div>
                ) : 
                (
                    <div className="flex gap-3 items-center">
                        <div className="hidden md:block">{icon}</div>
                        <h2 
                            className="inline-block text-2xl font-bold pb-3 mb-4 md:mb-6 md:mt-3 border-b-[1px] border-red-400"
                        >
                            {movieGroupName}
                        </h2>
                    </div>
                )
            }
            
            <div>
                <Swiper 
                    navigation={true} 
                    modules={[Navigation]} 
                    slidesPerView={slider.slidesPerView}
                    spaceBetween={slider.gap}
                >
                    {
                        moviesdata?.map((movie, index) => (
                            <SwiperSlide key={movie._id || index}>
                                <MovieItem 
                                    movieData={movie} 
                                    isLoading={isLoading} 
                                    isSkeleton={(movieGroupName !== 'Popular') ? true : false}
                                />
                            </SwiperSlide>
                        ))
                    }
                    
                </Swiper>
            </div>
        </div>
     );
}
 
export default MovieGroup;