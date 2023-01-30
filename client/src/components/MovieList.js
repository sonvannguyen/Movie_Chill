import SliderBanner from "./SliderBanner";
import MovieGroup from "./MovieGroup";

const MovieList = () => {
    return ( 
        <div>
            <div className="h-96 overflow-hidden">
                <SliderBanner/>
            </div>
            <div className="mt-4">
                <MovieGroup movieGroupName="Popular"/>
                <MovieGroup movieGroupName="Top Rated"/>
                <MovieGroup movieGroupName="Trending"/>
            </div>
        </div>
     );
}
 
export default MovieList;