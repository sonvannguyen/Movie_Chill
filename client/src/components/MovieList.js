import {useQuery} from 'react-query'
import SliderBanner from "./SliderBanner";
import MovieGroup from "./MovieGroup";
import {BiTrendingUp} from 'react-icons/bi'
import movieApi from '../services/movieApi';


const MovieList = () => {
    const {data: moviesGroupData, isLoading: isLoadingGroupMovie} = useQuery(
        ['moviesGroup'], 
        movieApi.getMoviesInGroup, 
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 1000 * 60
        }
    )
    const dataMovieGroupEmptyForSkeleton = [1,2,3,4,5,6,7,8]

    const randomIndex = Math.floor(Math.random() * moviesGroupData?.length);
    const randomGroupItem = moviesGroupData?.[randomIndex];

    return ( 
        <div>
            <div className="h-48 md:h-96 overflow-hidden">
                {
                    isLoadingGroupMovie ? (
                        <div className='w-full h-96 bg-zinc-700 animate-pulse'></div>
                    ): (
                    <SliderBanner randomGroupItem = {randomGroupItem}/>
                    )
                }
                
            </div>
            <div className="mt-2 mx-4 md:mx-6 lg:p-0 lg:mx-0 lg:mt-4">
                {
                    !isLoadingGroupMovie && moviesGroupData?.map(movieGroup => (
                        <MovieGroup 
                            movieGroupName={movieGroup?.groupName} 
                            icon={<BiTrendingUp size={20}/>} 
                            moviesdata={movieGroup?.movieList}
                            key={movieGroup?._id}
                            isLoading={isLoadingGroupMovie}
                        />
                    ))
                }
                {
                    isLoadingGroupMovie &&
                    <MovieGroup 
                        isLoading={isLoadingGroupMovie}
                        moviesdata={dataMovieGroupEmptyForSkeleton}
                    />
                }
            </div>
        </div>
     );
}
 
export default MovieList;