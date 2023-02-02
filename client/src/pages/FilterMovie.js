import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import MovieItem from "../components/MovieItem";
import {BiFilterAlt} from 'react-icons/bi'


const categoryData = [
    "Tình Cảm",
    "Hài Hước",
    "Hành Động",
    "Tâm Lý",
    "Cổ Trang",
    "Gia Đình",
    "Học Đường",
    "Khoa Học",
    "Viễn Tưởng",
    "Kinh Dị"
]

const FilterMovie = () => {
    return ( 
        <div className="grid grid-cols-5 gap-6">
            <div className="col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="col-start-2 col-span-3 overflow-y-scroll no-scrollbar h-screen">
                <Header/>

                <h2 className="inline-block text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">
                    Filter Movie
                </h2>
                <div className="flex justify-between mb-6">
                    <div>
                        <label htmlFor="type">Type:</label>
                        <select id="type" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md">
                            <option value="phimbo" className="">Phim bộ</option>
                            <option value="phimle">Phim lẻ</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="the_loai">Thể loại:</label>
                        <select id="the_loai" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md">
                            {
                                categoryData.map((category, index) => (
                                    <option value={category} key={index} className="">{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="quoc_gia">Quốc gia:</label>
                        <select id="quoc_gia" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md">
                            <option value="Âu Mỹ" className="">Âu Mỹ</option>
                            <option value="Hàn Quốc" className="">Hàn Quốc</option>
                            <option value="Trung Quốc" className="">Trung Quốc</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nam">Năm Sx:</label>
                        <select id="nam" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md">
                            <option value="2022" className="">2022</option>
                        </select>
                    </div>
                </div>

                <button className="flex items-center my-0 mx-auto py-2 px-5 text-lg rounded-xl bg-red-500 hover:bg-red-600 ">
                    <BiFilterAlt size={18} className='mr-2'/>
                    <span>Lọc Phim</span>
                </button>

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
 
export default FilterMovie;