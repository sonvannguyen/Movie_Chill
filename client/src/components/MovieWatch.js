import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import {BiMessageDetail} from 'react-icons/bi';
import {RiMovieLine} from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';

import userApi from '../services/userApi';
import Comment from './Comment';
import ModalConfirm from './ModalConfirm';
import movieApi from '../services/movieApi';

const optionToast = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

const MovieWatch = ({movieData, episodes, handleOnSubmitCreateComment, refetchMovieDetail}) => {
    const {episode: episodeParam} = useParams()
    const topRef = useRef(null)
    
    let embedUrl = ''

    if(episodes?.length === 1){
        embedUrl = episodes[0].link_embed
    }
    else {
        episodes?.forEach(item => {
            if(item.slug === episodeParam){
                embedUrl = item.link_embed
                return
            }
        })
    }

    const handleScrollToTop = () => {
        topRef?.current.scrollIntoView({ behavior: 'smooth'})
    }

    // handle add movie to bookmarks
    const userId = localStorage.getItem('movie_userId')
    const accessToken = localStorage.getItem('movie_access_token')

    const addMovieToBookmark = useMutation(
        userApi.addMovieToMoviesBookmark,
        {
            onSuccess: (data) => {
                if(data === 'Request failed with status code 409'){
                    toast.error('Phim đã tồn tại trong Bookmark.', optionToast)
                }
                else {
                    toast.success('Đã thêm phim thành công.', optionToast)
                }
            },
            onError: (error) => alert(error)
        }
    )

    const handleBookmark = () => {
        if(accessToken){
            addMovieToBookmark.mutate({userId, movieId: movieData?._id})
        }
        else {
            toast.error('Bạn cần Đăng nhập để thực hiện.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }
    // handle comment
    let commentsData = movieData?.comments

    const commentRef = useRef(null)
    const onSubmitComment = () => {
        const commentContent = commentRef?.current.value
        if( commentContent.length > 0){
            handleOnSubmitCreateComment(commentContent)
            commentRef.current.value = ''
        }
    }
    const handleOnKeyDown = (event) => {
        if(event.key === 'Enter'){
            onSubmitComment()
        }
    }

    // modal confirm delete comment
    const [commentModal, setCommentModal] = useState({
        isOpen: false,
        commentId: ''
    })

    const deleteComment = useMutation(
        movieApi.deleteComment,
        {
            onSuccess: (data) => {
                refetchMovieDetail()
            },
            onError: (error) => alert(error)
        }
    )

    const handleOpenModal = (commentId) => {
        setCommentModal({ isOpen: true, commentId: commentId})
    }
    const handleCloseModal = () => {
        setCommentModal({isOpen: false, commentId: ''})
    }

    const onConfirmDeleteComment = () => {
        deleteComment.mutate({movieId: movieData?._id, commentId: commentModal.commentId})
        setCommentModal({isOpen: false, commentId: ''})
    }
    

    return ( 
        <>
            <div className='relative mb-8'>
                <div className='absolute top-[-100px]' ref={topRef}></div>
                <iframe 
                    src={embedUrl} 
                    className="w-full h-[200px] md:h-[430px]"
                    title={movieData?.name}
                    allow="fullscreen"
                >
                </iframe>
                <div className='px-3 lg:px-0 mt-5 flex justify-between items-center gap-2 pr-6 border-b-[0.3px] pb-5 border-zinc-700'>
                    <div>
                        <h3 className="text-xl md:text-4xl font-bold mb-2">{movieData?.origin_name}</h3>
                        <h4 className="text-sm md:text-xl opacity-80">{`( ${movieData?.name} )`}</h4>
                    </div>
                    <div className='text-center'>
                        <h3 className="text-2xl font-bold mb-1 md:mb-3 ">{`TẬP ${episodeParam}`}</h3>
                        <button 
                            onClick={handleBookmark}
                            className='hidden opacity-80 text-sm md:flex gap-1 items-center border-[1px] border-zinc-600 py-1 px-2 rounded-lg hover:opacity-100'
                        >
                            <AiOutlinePlus size={13}/>
                            Add to bookmark
                        </button>
                    </div>
                </div>
                <button 
                    onClick={handleBookmark}
                    className=' opacity-80 text-sm flex md:hidden float-right gap-1 items-center border-[1px] border-zinc-700 p-2 hover:opacity-100'
                >
                    <AiOutlinePlus size={13}/>
                    Add to bookmark
                </button>

                <div className='px-3 lg:px-0 flex gap-2 items-center mt-5 text-red-400'>
                        <BiMessageDetail size={23}/>
                        <span className='text-lg' >Nội dung: </span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: movieData?.content }} className='mt-2 px-4 italic opacity-70'></p>

                <div className='px-3 lg:px-0'>
                    <div className='flex gap-3 items-center my-6 text-red-400 '>
                        <RiMovieLine size={23}/>
                        <h4 className='text-lg'>Chọn tập phim :</h4>
                    </div>
                    <ul className='flex gap-3 flex-wrap '>
                        {
                            Array.from(Array(episodes?.length).keys()).map(index => {
                                if (parseInt(episodeParam) === index + 1 ) {
                                    return (
                                        <Link 
                                            to={`/watch/${movieData?.slug}/episode/${index+1}`}
                                            key={index} 
                                            className='py-2 px-3 border-[1px] border-neutral-600 rounded-xl text-sm cursor-pointer bg-red-500 '
                                        >
                                            Tập {index + 1}
                                        </Link>
                                    )
                                }
                                else {
                                    return (
                                        <Link
                                            to={`/watch/${movieData?.slug}/episode/${index+1}`}
                                            key={index} 
                                            onClick= {handleScrollToTop}
                                            className='py-2 px-3 border-[1px] border-neutral-600 rounded-xl text-sm cursor-pointer hover:bg-red-500 transition duration-300 ease-linear'
                                        >
                                            Tập {index + 1}
                                        </Link>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>

            {/* comments */}
            <div className='px-3 lg:px-0'>
                <h4 
                    className="inline-block text-2xl font-bold pb-3 mb-6 mt-3 border-b-[1px] border-red-400"
                >
                    {`Bình Luận (${movieData?.comments.length || 0})`}
                </h4>

                {/* enter comment */}
                {
                    accessToken ? (
                        <div className='flex gap-2 md:gap-4 mb-8 items-center'>
                            <img 
                                className="hidden md:block md:w-12 md:h-12 object-cover rounded-full"
                                src="https://i.pinimg.com/236x/48/07/43/4807437150542c4c980d358291aea33d.jpg" 
                                alt="avatar"
                            />
                            <input 
                                type="text" 
                                ref={commentRef}
                                onKeyDown={handleOnKeyDown}
                                placeholder='Thêm bình luận...'
                                className='rounded-lg p-3 w-[300px] md:p-4 md:w-[500px] bg-[#3f3f46ad] outline-none' 
                            />
                            <button 
                                onClick={onSubmitComment}
                                className='text-lg bg-red-500 hover:bg-red-600 px-3 py-2  md:py-3 md:px-6 rounded-md transition duration-150'
                            >
                                Đăng
                            </button>
                        </div>
                    ) : (
                        <div className='flex justify-center gap-3 mb-4'>
                            <span className='md:text-lg'>Bạn cần </span>
                            <Link 
                                to='/login' 
                                className='md:text-lg text-red-400 font-bold hover:text-red-500'
                            >
                                Đăng Nhập
                            </Link>
                            <span className='md:text-lg'> để bình luận !</span>

                        </div>
                    )
                }

                <div className='max-h-[468px] overflow-y-scroll custom-scrollbar'>
                    {
                        commentsData?.map(comment => (
                            <Comment 
                                key={comment._id} 
                                commentData={comment}
                                handleOpenModal={handleOpenModal}
                            />
                        ))
                    }
                </div>

                
                {
                    commentModal.isOpen && 
                    (
                        <ModalConfirm  
                            handleCloseModal = {handleCloseModal} 
                            onConfirm={onConfirmDeleteComment}
                            message = "Bạn có chắc chắn muốn xóa bình luận này không ?"
                        />
                    )
                }
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
        </>
    );
}
 
export default MovieWatch;