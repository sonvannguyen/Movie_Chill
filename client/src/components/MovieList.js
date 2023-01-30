import Header from "./Header";
import SliderBanner from "./SliderBanner";
import MovieGroup from "./MovieGroup";

const MovieList = () => {
    return ( 
        <div className="px-5 border-x-[0.5px] border-[rgba(255,255,255,0.14)]">
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