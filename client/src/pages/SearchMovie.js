import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import MovieItem from "../components/MovieItem";
import {BsSearch} from 'react-icons/bs'


const SearchMovie = () => {
    return ( 
        <div className="grid grid-cols-5 gap-6">
            <div className="col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="col-start-2 col-span-3 overflow-y-scroll no-scrollbar h-screen">
                <Header/>

                <h2 className="inline-block text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">Search Movie</h2>
                <div className='relative flex gap-3 justify-between px-20'>
                    <BsSearch className='absolute top-4 left-[95px] cursor-pointer'/>
                    <input type="text" placeholder='Enter movie name...' className='bg-zinc-800 w-full outline-none py-3 pl-11 rounded-2xl placeholder-gray-400 placeholder-opacity-75' />
                    <button className="px-3 text-lg rounded-xl border-[1px] border-[rgba(255,255,255,0.27)] hover:bg-red-500">Search</button>
                </div>
             
                <div className="flex gap-5 mt-10">
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                </div>
                <div className="flex gap-5 mt-10">
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                    <MovieItem/>
                </div>
                <Footer/>
            </div>
            <div className="col-span-1">
                <SidebarSuggestions/>
            </div>
        </div>
     );
}
 
export default SearchMovie;