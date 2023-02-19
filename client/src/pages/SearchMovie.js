import { useQuery } from 'react-query';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams  } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {BsSearch} from 'react-icons/bs'

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import film_animation from '../assets/images/film_animation.gif'
import movieApi from '../services/movieApi';
import MovieItem from '../components/MovieItem';


const SearchMovie = () => {
    const refInputSearch = useRef(null)
    const titleRef = useRef(null)
    let [searchParams, setSearchParams] = useSearchParams()

   // initializing currentPage and movieName values based on the URL search parameters
   //  to retain the query on back navigation
    const [search, setSearch] = useState({
        currentPage: parseInt(searchParams.get('page')) || 1,
        movieName: searchParams.get('movie') || ''
    })
    
    const {data: searchResult, refetch} = useQuery(
        ['search', search.movieName, search.currentPage],
        () => movieApi.searchMovie({movieName: search.movieName, page: search.currentPage}),
        {
            staleTime: 3 * 60 * 1000,
            enabled: false,
            keepPreviousData: true
        }
    )
    const handleClickSearch = () => {
        setSearch({currentPage: 1, movieName: refInputSearch?.current?.value})
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearch({currentPage: 1, movieName: refInputSearch?.current?.value})
        }
    }

    const handlePageClick = (data) => {
        titleRef?.current.scrollIntoView({ behavior: 'smooth' })
        setSearch({...search, currentPage: data.selected+1})
    }

    useEffect(() => {
        if(search.movieName){
            setSearchParams({movie: search.movieName, page: search.currentPage})
            refetch()
        }
    }, [search])

    
    return ( 
        <div className="grid lg:grid-cols-5 lg:gap-6 md:grid-cols-4">
            <div className="hidden bg:block md:block col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="md:col-start-2 md:col-span-3 md:overflow-y-scroll md:no-scrollbar h-screen">
                <Header/>

                <div className="px-5 md:px-6 lg:px-0">
                <h2 
                    ref={titleRef}
                    className="inline-block lg:ml-0 text-2xl md:text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400"
                >
                    Search Movie
                </h2>

                <div className='relative flex gap-3 justify-between'>
                    <BsSearch className='absolute top-4 left-[16px] cursor-pointer'/>

                    <input 
                        type="text" 
                        ref={refInputSearch}
                        onKeyDown={handleKeyDown}
                        placeholder='Enter movie name...' 
                        className='bg-zinc-800 w-full outline-none py-3 pl-11 rounded-2xl placeholder-gray-400 placeholder-opacity-75' 
                    />

                    <button 
                        onClick={handleClickSearch}
                        className="px-1 md:px-3 md:text-lg rounded-xl border-[1px] border-[rgba(255,255,255,0.27)] hover:bg-red-500"
                    >
                        Search
                    </button>
                </div>

                {/* // Trường hợp có kết quả tìm kiếm */}
               
                {
                    searchResult && (
                        <h4 className='text-xl font-bold mt-6 italic'>
                            {`Có ${searchResult?.totalMovies || 0 } kết quả tìm kiếm :`}
                        </h4>
                    )
                }

                {
                    searchResult?.totalMovies > 0 &&
                    (
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-7'>
                            {
                                searchResult?.moviesData?.map(movie => (
                                    <MovieItem key={movie._id} movieData={movie}/>
                                ))
                            }
                            
                        </div>
                    )
                }

                {
                    searchResult?.totalMovies > 0 && (
                        <div className='flex items-center justify-center'>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'p-2'}
                                forcePage={search.currentPage-1}
                                pageCount={searchResult?.totalPages}
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
                </div>

                {/* // Trường hợp không có kết quả tìm kiếm */}
                
                {
                    !(searchResult?.totalMovies > 0) && (
                        <div className='w-full min-h-[200px]'>
                            <img src= {film_animation} alt="gif wait" className="w-44 mt-8 mx-auto" />
                            <h4 className="text-center italic opacity-80 mt-3">Tìm kiếm phim và xem ngay với MovieChill &hearts;</h4>
                        </div>
                    )
                }
                
                {
                    (searchResult?.totalMovies > 0) && <Footer/>
                }
                </div>

            <div className="hidden lg:block lg:col-span-1">
                <SidebarSuggestions/>
            </div>
        </div>
     );
}
 
export default SearchMovie;