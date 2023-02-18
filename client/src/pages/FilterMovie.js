import { useEffect, useRef, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import ReactPaginate from 'react-paginate';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import {BiFilterAlt} from 'react-icons/bi'
import gif_wait from '../assets/images/gif_wait.gif'
import movieApi from "../services/movieApi";
import MovieItem from "../components/MovieItem";


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
    const titleRef = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage]= useState(searchParams.get('page') || 1)
    const {search} = useLocation()
    
    const [filter, setFilter] = useState({
        type: searchParams.get('type') || '',
        category: searchParams.get('category') || '',
        country: searchParams.get('country') || '',
        year:  searchParams.get('year') || '',
        page: searchParams.get('page') || 1
    })
   
    const handleOnChangeSelect = ({field, value}) => {
        setFilter({
            ...filter,
            [field]: value,
            page: 1
        })
        setCurrentPage(1)
    }

    useEffect(()=> {
        setSearchParams(filter)
    }, [filter])

    const {data: filterResult, refetch} = useQuery(
        ['filter', filter, currentPage] ,
        () => movieApi.filterMovie({search, page: currentPage}),
        {
            staleTime: 3 * 60 * 1000,
            enabled: false,
            keepPreviousData: true
        }
    )

    const handleFilterMovie = () => {
        if(search){
            refetch()
        }
    }
    
    const handlePageClick = (data) => {
        titleRef?.current.scrollIntoView({ behavior: 'smooth' })
        setCurrentPage(data.selected + 1)
        setFilter({
            ...filter,
            page: data.selected + 1
        })
    }
    
    useEffect(() => {
        if(search){
            refetch()
        }
    }, [currentPage])

    return ( 
        <div className="md:grid lg:grid-cols-5 lg:gap-6 md:grid-cols-4">
            <div className="hidden bg:block md:block col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="md:col-start-2 md:col-span-3 md:overflow-y-scroll md:no-scrollbar h-screen">
                <Header/>

                <div className="px-3 md:px-6 lg:px-0">
                <h2 ref={titleRef} className="inline-block text-2xl md:text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">
                    Filter Movie
                </h2>
                <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between mb-6">
                    <div className="md:flex md:flex-col md:items-center md:gap-2 lg:block">
                        <label htmlFor="type">Type:</label>
                        <select
                             id="type" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md"
                             onChange={(e) => handleOnChangeSelect({field: "type", value: e.target.value})}
                             defaultValue={searchParams.get('type') || ""}
                        >
                            <option value="" disabled hidden>Chọn</option>
                            <option value="series" className="">Phim bộ</option>
                            <option value="single">Phim lẻ</option>
                            <option value="hoathinh">Hoạt hình</option>
                        </select>
                    </div>
                    <div className="md:flex md:flex-col md:items-center md:gap-2 lg:block">
                        <label htmlFor="category">Thể loại:</label>
                        <select
                             id="category" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md"
                             onChange={(e) => handleOnChangeSelect({field: "category", value: e.target.value})}
                             defaultValue={searchParams.get('category') || ""}
                         >
                            <option value="" disabled hidden>Chọn</option>
                            {
                                categoryData.map((category, index) => (
                                    <option value={category} key={index} className="">{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="md:flex md:flex-col md:items-center md:gap-2 lg:block">
                        <label htmlFor="country">Quốc gia:</label>
                        <select
                             id="country" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md"
                             onChange={(e) => handleOnChangeSelect({field: "country", value: e.target.value})}
                             defaultValue={searchParams.get('country') || ""}
                        >
                            <option value="" disabled hidden>Chọn</option>
                            <option value="Âu Mỹ" className="">Âu Mỹ</option>
                            <option value="Hàn Quốc" className="">Hàn Quốc</option>
                            <option value="Trung Quốc" className="">Trung Quốc</option>
                        </select>
                    </div>
                    <div className="md:flex md:flex-col md:items-center md:gap-2 lg:block">
                        <label htmlFor="year">Năm Sx:</label>
                        <select
                             id="year" className="bg-zinc-700 outline-none ml-3 p-2 rounded-md"
                             onChange={(e) => handleOnChangeSelect({field: "year", value: e.target.value})}
                             defaultValue=""
                        >
                            <option value="" disabled hidden>Chọn</option>
                            <option value="2020" className="">2020</option>
                            <option value="2021" className="">2021</option>
                            <option value="2022" className="">2022</option>
                            <option value="2023" className="">2023</option>

                        </select>
                    </div>
                </div>

                <button 
                    onClick={handleFilterMovie}
                    className="flex items-center my-0 mx-auto py-2 px-5 text-lg rounded-xl bg-red-500 hover:bg-red-600 "
                >
                    <BiFilterAlt size={18} className='mr-2'/>
                    <span>Lọc Phim</span>
                </button>

                

                {/* trường hợp có phim trả về sau khi filter */}
                {
                    filterResult && (
                        <h4 className='text-xl font-bold mt-6 italic'>
                            {`Có ${filterResult?.totalMovies || 0 } kết quả phù hợp :`}
                        </h4>
                    )
                }

                {
                    filterResult?.totalMovies > 0 &&
                    (
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-7'>
                            {
                                filterResult?.moviesData?.map(movie => (
                                    <MovieItem key={movie._id} movieData={movie}/>
                                ))
                            }
                            
                        </div>
                    )
                }

                {
                    filterResult?.totalMovies > 0 && (
                        <div className='flex items-center justify-center'>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'p-2'}
                                forcePage={currentPage-1}
                                pageCount={filterResult?.totalPage}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={1}
                                onPageChange={handlePageClick}
                                containerClassName={'flex gap-2 mt-10'}
                                pageLinkClassName={'py-3 px-5 bg-zinc-700 rounded-md'}
                                nextLinkClassName={'py-3 px-5 bg-zinc-700 rounded-md'}
                                previousLinkClassName={'py-3 px-5 bg-zinc-700 rounded-md'}
                                activeLinkClassName={'py-3 px-5 bg-red-500 rounded-md'}
                            />
                        </div>
                    )
                }

                {/* // Trường hợp không có kết quả filter*/}
                                
                {
                    !(filterResult?.totalMovies > 0) && (
                        <div className="w-full min-h-[100px]">
                            <img src= {gif_wait} alt="gif wait" className="w-64 mx-auto" />
                            <h4 className="text-center italic opacity-80 mt-[-26px]">Lọc phim theo sở thích và xem ngay với MovieChill &hearts;</h4>
                        </div>
                    )
                }
                </div>

                <Footer/>
                
            </div>
            <div className="hidden lg:block lg:col-span-1">
                <SidebarSuggestions/>
            </div>
        </div>
     );
}
 
export default FilterMovie;