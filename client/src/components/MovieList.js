import {useQuery} from 'react-query'
import SliderBanner from "./SliderBanner";
import MovieGroup from "./MovieGroup";
import {BiTrendingUp} from 'react-icons/bi'
import movieApi from '../services/movieApi';


const MovieList = () => {
    const {data: moviesGroupData} = useQuery(
        ['moviesGroup'], 
        movieApi.getMoviesInGroup, 
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 1000 * 60
        }
    )

    return ( 
        <div>
            <div className="h-96 overflow-hidden">
                <SliderBanner/>
            </div>
            <div className="mt-4">
                {
                    moviesGroupData?.map(movieGroup => (
                        <MovieGroup 
                            movieGroupName={movieGroup?.groupName} 
                            icon={<BiTrendingUp size={20}/>} 
                            moviesdata={movieGroup?.movieList}
                            key={movieGroup?._id}
                        />
                    ))
                }
             
            </div>
        </div>
     );
}
 
export default MovieList;