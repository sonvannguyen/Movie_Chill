import SliderBanner from "./SliderBanner";
import MovieGroup from "./MovieGroup";
import {BiWorld, BiTrendingUp} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'

const MovieList = () => {
    return ( 
        <div>
            <div className="h-96 overflow-hidden">
                <SliderBanner/>
            </div>
            <div className="mt-4">
                <MovieGroup movieGroupName="Trending" icon={<BiTrendingUp size={20}/>}/>
                <MovieGroup movieGroupName="Top Rated" icon={<AiFillStar size={20}/>}/>
                <MovieGroup movieGroupName="Popular" icon={<BiWorld size={20}/>}/>
            </div>
        </div>
     );
}
 
export default MovieList;