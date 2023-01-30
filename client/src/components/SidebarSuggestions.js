import MovieItemSuggestion from './MovieItemSuggestion'
import {BsSearch} from 'react-icons/bs'

const SidebarSuggestions = () => {
    return ( 
        <div className='relative pr-4 overflow-y-scroll no-scrollbar h-screen'>
            <div className='py-5 sticky top-0 z-10 bg-[#1c1c1e]'>
                <div className='relative'>
                    <BsSearch className='absolute top-3 left-3 cursor-pointer'/>
                    <input type="text" className='bg-zinc-800 outline-none py-2 pl-10 rounded-2xl' />
                </div>
                <p className='mt-4 opacity-40 italic'>
                    #avatar2  #wednesday #DoctorStrange #OurBelovedSummer #TrueBeauty
                </p>
                <h3 className='mt-6 uppercase text-xl sticky'>Suggestions</h3>
            </div>

            <div className='relative z-0'>
                <MovieItemSuggestion/>
                <MovieItemSuggestion/>
                <MovieItemSuggestion/>
                <MovieItemSuggestion/>
                <MovieItemSuggestion/>
                <MovieItemSuggestion/>
                <MovieItemSuggestion/>
                <MovieItemSuggestion/>
            </div>

        </div>
     );
}
 
export default SidebarSuggestions;