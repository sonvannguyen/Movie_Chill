import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import MovieItem from "./MovieItem";

const MovieGroup = ({movieGroupName}) => {
    return ( 
        <div className="mb-4">
            <h2 className="inline-block text-2xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">{movieGroupName}</h2>
            <div>
                <Swiper 
                    navigation={true} 
                    modules={[Navigation]} 
                    slidesPerView={3.5}
                    spaceBetween={10}
                >
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieItem/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
     );
}
 
export default MovieGroup;