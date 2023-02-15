import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {AiOutlineDelete} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MovieItem from "../components/MovieItem";
import userApi from "../services/userApi";
import ModalConfirm from '../components/ModalConfirm';
import SidebarSuggestions from "../components/SidebarSuggestions";
import icon_addmovie from '../assets/images/icon_addmovie.png'

const optionToast = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

const Bookmarked = () => {
    const [isOpenModalClearAll, setIsOpenModalClearAll] = useState(false)
    const [modalDeleteAMovie, setModalDeleteAMovie] = useState({
        isOpen: false,
        movieId: ''
    })

    const userId = localStorage.getItem('movie_userId')

    const {data: moviesData, refetch} = useQuery(
        ['moviesBookmarked', userId],
        () => userApi.getMoviesFromListMoviesBookmark(userId)
    )

    const clearAllBookmarks = useMutation(
        userApi.deleteAllBookmarks,
        {
            onSuccess: () => {
                refetch()
                toast.success('Đã xóa bookmarks thành công.', optionToast)
            },
            onError: (error) => alert(error)
        }
    )
    const deleteMovieInBookmarks = useMutation(
        userApi.deleteAMovieInBookmarks,
        {
            onSuccess: () => {
                refetch()
                toast.success('Đã xóa phim thành công.', optionToast)
            },
            onError: (error) => alert(error)
        }
    )

    const handleOpenModalClearAll = () => {
        setIsOpenModalClearAll(true)
    }
    const handleCloseModalClearAll = () => {
        setIsOpenModalClearAll(false)
    }

    const handleOpenModalDeleteAMovie = (movieId) => {
        setModalDeleteAMovie({isOpen: true, movieId: movieId})
    }
    const handleCloseModalDeleteAMovie = () => {
        setModalDeleteAMovie({...modalDeleteAMovie, isOpen: false})
    }

    const onConfirmClearAllBookmarks = () => {
        clearAllBookmarks.mutate(userId)
        setIsOpenModalClearAll(false)
    }
    const onConfirmDeleteAMovie = () => {
        deleteMovieInBookmarks.mutate({userId, movieId: modalDeleteAMovie.movieId})
        setModalDeleteAMovie({isOpen: false, movieId: ''})
    }

    return ( 
        <div className="grid grid-cols-5 gap-6">
            <div className="col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="col-start-2 col-span-3 overflow-y-scroll no-scrollbar h-screen">
                <Header/>
                
                <div className="flex justify-between items-end">
                    <h2 className="inline-block text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">
                        {`Bookmarked - Phim Đã Lưu ( ${moviesData?.length} ) `}
                    </h2>
                    {
                        (moviesData?.length > 0) && 
                        <button 
                            onClick={handleOpenModalClearAll}
                            className="flex items-center gap-2 p-2 rounded-xl border-[1px] border-[rgba(255,255,255,0.27)] hover:bg-red-500 transition duration-300 ease-in-out"
                        >
                            <AiOutlineDelete size={24}/>
                            <span>Clear all bookmarks</span>
                        </button>
                    }
                </div>

                <div className='grid grid-cols-4 gap-6 mt-7 w-full'>
                    {
                        moviesData?.map(movie => (
                            <MovieItem 
                                key={movie._id} 
                                inPageEdit="true" 
                                movieData={movie} 
                                handleOpenModalDeleteAMovie = {handleOpenModalDeleteAMovie}
                            />
                        ))
                    }
                </div>

                {
                    (moviesData?.length === 0) && (
                        <div className="flex flex-col w-full mx-auto items-center min-h-[260px]">
                            <img className="w-60 object-cover" src={icon_addmovie} alt="icon" />
                            <p className="text-center text-lg italic text-gray-400 mt-[-10px]">
                                Tìm kiếm phim yêu thích và ấn chọn Bookmark <br/> để lưu lại phim nhé !
                            </p>
                        </div>
                    )
                }

                {
                    isOpenModalClearAll && 
                    (
                        <ModalConfirm  
                            handleCloseModal = {handleCloseModalClearAll} 
                            onConfirm={onConfirmClearAllBookmarks}
                            message = "Bạn có chắc chắn muốn xóa toàn bộ bookmarks không ?"
                        />
                    )
                }

                {
                    modalDeleteAMovie.isOpen && 
                    (
                        <ModalConfirm  
                            handleCloseModal = {handleCloseModalDeleteAMovie} 
                            onConfirm={onConfirmDeleteAMovie}
                            message = "Bạn có chắc chắn muốn xóa phim khỏi bookmarks không ?"
                        />
                    )
                }
                
                <Footer/>
            </div>

            <div className="col-span-1">
                <SidebarSuggestions/>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
     );
}
 
export default Bookmarked;