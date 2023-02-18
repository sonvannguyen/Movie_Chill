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

    const randomIndex = Math.floor(Math.random() * moviesGroupData?.length);
    const randomGroupItem = moviesGroupData?.[randomIndex];

    return ( 
        <div>
            <div className="h-48 md:h-96 overflow-hidden">
                <SliderBanner randomGroupItem = {randomGroupItem}/>
            </div>
            <div className="mt-2 mx-3 md:mx-6 lg:p-0 lg:mx-0 lg:mt-4">
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