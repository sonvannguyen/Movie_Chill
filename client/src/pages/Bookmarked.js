import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import MovieItem from "../components/MovieItem";

import {AiOutlineDelete} from 'react-icons/ai'

const Bookmarked = () => {
    return ( 
        <div className="grid grid-cols-5 gap-6">
            <div className="col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="col-start-2 col-span-3 overflow-y-scroll no-scrollbar h-screen">
                <Header/>
                
                <div className="flex justify-between items-end">
                    <h2 className="inline-block text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">
                        Bookmarked - Phim Đã Lưu
                    </h2>
                    <button className="flex items-center gap-2 p-2 rounded-xl border-[1px] border-[rgba(255,255,255,0.27)] hover:bg-red-500 transition duration-300 ease-in-out">
                        <AiOutlineDelete size={24}/>
                        <span>Clear all bookmarks</span>
                    </button>
                </div>

                <div className="flex gap-5 mt-10">
                    <MovieItem inPageEdit="true"/>
                    <MovieItem inPageEdit="true"/>
                    <MovieItem inPageEdit="true"/>
                    <MovieItem inPageEdit="true"/>
                </div>
                <div className="flex gap-5 mt-10">
                    <MovieItem inPageEdit="true"/>
                    <MovieItem inPageEdit="true"/>
                    <MovieItem inPageEdit="true"/>
                    <MovieItem inPageEdit="true"/>
                </div>

                <Footer/>
            </div>
            <div className="col-span-1">
                <SidebarSuggestions/>
            </div>
        </div>
     );
}
 
export default Bookmarked;