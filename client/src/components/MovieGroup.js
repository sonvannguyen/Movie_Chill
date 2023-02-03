import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import MovieItem from "./MovieItem";


const MovieGroup = ({movieGroupName, icon, moviesdata}) => {
    return ( 
        <div className="mb-4">
            <div className="flex gap-3 items-center">
                <div>{icon}</div>
                <h2 className="inline-block text-2xl font-bold pb-3 mb-6 mt-3 border-b-[1px] border-red-400">{movieGroupName}</h2>
            </div>
            <div>
                <Swiper 
                    navigation={true} 
                    modules={[Navigation]} 
                    slidesPerView={4.3}
                    spaceBetween={20}
                >
                    {
                        moviesdata?.map(movie => (
                            <SwiperSlide key={movie._id}>
                                <MovieItem movieData={movie}/>
                            </SwiperSlide>
                        ))
                    }
                    
                </Swiper>
            </div>
        </div>
     );
}
 
export default MovieGroup;