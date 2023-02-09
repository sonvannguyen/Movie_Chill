import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import movieApi from '../services/movieApi'
import MovieItemSuggestion from './MovieItemSuggestion'
import {BsSearch} from 'react-icons/bs'


const SidebarSuggestions = () => {

    const {data: moviesData} = useQuery(
        ['moviesGroupSuggestion'], 
        () => movieApi.getMoviesByGroupName("Suggestions"), 
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 1000 * 60
        }
    )

    return ( 
        <div className='relative px-3 overflow-y-scroll no-scrollbar h-screen'>
            <div className='py-5 sticky top-0 z-10 bg-[#1c1c1e]'>
                <Link to='/search' className='relative'>
                    <BsSearch className='absolute top-1 left-3 cursor-pointer'/>
                    <input type="text" placeholder='Search movie...' className='bg-zinc-800 outline-none py-2 pl-10 rounded-2xl placeholder-gray-400 placeholder-opacity-75' />
                </Link>
                <p className='mt-4 opacity-40 italic'>
                    #avatar2  #wednesday #DoctorStrange #OurBelovedSummer #TrueBeauty
                </p>
                <h3 className='mt-3 uppercase text-xl sticky'>Suggestions</h3>
            </div>

            <div className='relative z-0'>
                {moviesData?.map(movie => (
                    <MovieItemSuggestion key={movie._id} movieData={movie} />
                ))}
            </div>

        </div>
     );
}
 
export default SidebarSuggestions;