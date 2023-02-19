import { useRef, useEffect } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { useMutation} from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IoMdShareAlt} from 'react-icons/io'
import {BsBookmarkHeart, BsPlayBtn} from 'react-icons/bs'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import MovieGroup from './MovieGroup';
import userApi from '../services/userApi';


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

const MovieInfor = ({movieDetailData, isLoading, movieRecommnedData}) => {
    const topRef = useRef(null)
    const { pathname } = useLocation()

    useEffect(() => {
        topRef?.current.scrollIntoView({ behavior: 'smooth'})
    }, [pathname])

    const movieInforTemplate = [
        {
            title: "Type :",
            value: movieDetailData?.type
        },
        {
            title: "Time :",
            value: movieDetailData?.time
        },
        {
            title: "Trạng thái :",
            value: movieDetailData?.status
        },
        {
            title: "Thể loại :",
            value: movieDetailData?.category[0]
        },
    ]
    let actor = '' 
    if(movieDetailData?.actor[0].length > 0){
        movieDetailData?.actor.forEach(item => {
            actor = actor + item + ', '
        })
    }
    else {
        actor = 'Không xác định'
    }

    const accessToken = localStorage.getItem('movie_access_token')
    const userId = localStorage.getItem('movie_userId')

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
            addMovieToBookmark.mutate({userId, movieId: movieDetailData?._id})
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
    return (  
        <div className='relative'>
            {/* Banner */}
            <div className='absolute top-[-100px]' ref={topRef}></div>
            <div>
                <div className="relative h-[230px] md:h-[330px] lg:h-[440px]">
                    {
                        isLoading ? 
                        (<>
                            <div role="status" className="w-full rounded animate-pulse ">
                                <div className="flex items-center justify-center h-[230px] md:h-[330px] lg:h-[440px] bg-[#404040a1] rounded ">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
                                </div>
                                
                            </div>
    
                            <div role="status" className="absolute z-10 bottom-0 w-[100px] md:w-[130px] lg:w-[170px] rounded animate-pulse ">
                                <div className="flex items-center justify-center h-[140px] md:h-[180px] lg:h-[260px] bg-[#404040a1] rounded ">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
                                </div>
                            </div>
                        </>
                        ) 
                        :
                        (
                            <>
                                <img 
                                    src={movieDetailData?.poster_url || movieDetailData?.thumb_url} 
                                    className='h-full w-full object-cover ' 
                                    alt="poster img" 
                                />
                                <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.12)]'></div>
    
                                <img 
                                    src={movieDetailData?.thumb_url} 
                                    className='absolute z-10 w-[100px] md:w-[130px] bottom-[-14px] md:bottom-[-30px] lg:w-[170px] rounded-md shadow-primary' 
                                    alt="thumb img" 
                                />
                            </>
                        )
                    }

                    <div className="hidden md:block absolute top-3 left-3 ">
                        <span className=" bg-black p-1 text-xs shadow-primary">
                            HD - Vietsub
                        </span>
                        <h5 className="bg-red-700 p-1 text-xs md:text-sm uppercase shadow-primary">
                            Tổng số tập: {movieDetailData?.episode_total}
                        </h5>
                    </div>


                    <div className='absolute right-5 top-3 flex gap-3'>
                        <div 
                            onClick={handleBookmark}
                            className='group relative bg-[rgba(0,0,0,0.6)] p-3 rounded-full cursor-pointer hover:bg-black shadow-primary'
                        >
                            <BsBookmarkHeart fontSize={24} />
                            <span className='hidden group-hover:block absolute left-[-12px] bottom-[-24px] bg-black px-1'>Bookmark</span>
                        </div>
                        <div className='group hidden md:block bg-[rgba(0,0,0,0.6)] p-3 rounded-full cursor-pointer hover:bg-black shadow-primary'>
                            <IoMdShareAlt fontSize={24}/>
                            <span className='hidden group-hover:block absolute right-0 bottom-[-24px] bg-black px-1'>Share</span>
                        </div>
                    </div>

                    <div 
                        className='absolute flex justify-between gap-2 lg:gap-0 items-center bottom-0 left-0 right-0 pl-[120px] md:pl-[160px] lg:pl-[200px] pr-[24px] py-3 md:py-5 bg-[rgba(0,0,0,0.73)]'
                    >
                        <div className='w-[328px]'>
                            <h3 className='text-lg md:text-2xl limit2Lines lg:text-3xl font-bold'>{movieDetailData?.origin_name}</h3>
                            {
                                movieDetailData?.name &&
                                <h4 className='text-sm md:text-lg md:mt-3 text-gray-300'>{`( ${movieDetailData?.name } )`}</h4>
                            }
                        </div>

                        <Link 
                            to= {`/watch/${movieDetailData?.slug}/episode/1`} 
                            className='hidden md:flex lg:flex items-center w-[10rem] h-[50px] gap-2 bg-red-700 p-3 rounded-xl cursor-pointer hover:bg-red-400 transition-all duration-200 ease-linear'
                        >
                            <BsPlayBtn fontSize={30}/>
                            <span className=''>WATCH NOW</span>
                        </Link>

                    </div>
                </div>
            </div>

            {/* infor  */}

            <div className='bg-[rgba(0,0,0.1)] grid grid-cols-2 md:grid md:grid-cols-4 py-4 px-5 '>
                <div className='pt-2 md:pt-6 md:pl-5 lg:pl-9'>
                    <h4 className='ml-2 md:mb-2 text-xl text-red-300 md:text-[#b6e5ff]'>RATING</h4>
                    <span className='ml-5 mb-2 font-bold md:hidden text-red-300'>8.3/10</span>

                    <div className='hidden md:block md:w-[80px]'>
                        <CircularProgressbar 
                            value={83} 
                            text={`${83/10}/10`} 
                            styles={buildStyles({
                                textSize: '14px',
                                textColor: '#ffff',
                                trailColor: '#000',
                                backgroundColor: '#3e98c7',
                              })}
                        />
                    </div>
                </div>

                <Link 
                    to= {`/watch/${movieDetailData?.slug}/episode/1`} 
                    className='flex md:hidden items-center w-[10rem] h-[50px] gap-2 bg-red-700 p-3 rounded-xl cursor-pointer hover:bg-red-400 transition-all duration-200 ease-linear'
                >
                    <BsPlayBtn fontSize={30}/>
                    <span>WATCH NOW</span>
                </Link>

                <div className='mt-3 md:mt-0 mr-2 md:mr-0 md:ml-2 lg:ml-0'>
                    {
                        movieInforTemplate.map((movie, index) => (
                            <div key={index} className='mb-2'> 
                                <span className='font-bold opacity-86 inline-block mr-1 md:mr-[12px]'>{movie.title}</span>
                                <span className='opacity-70 md:italic'>{movie.value}</span>    
                            </div>
                        ))
                    }
                </div>

                <div className='mt-3 md:mt-0 md:col-span-2 md:ml-8 lg:ml-16'>
                    <div className='mb-1'> 
                        <span className='font-bold opacity-86'>Quốc gia : </span> 
                        <span className='opacity-70 md:italic'>{movieDetailData?.country}</span>
                    </div>

                    <div className='mb-1'> 
                        <span className='font-bold opacity-86'>Năm phát hành : </span> 
                        <span className='opacity-70 md:italic'>{movieDetailData?.year}</span>
                    </div>

                    <span className='font-bold opacity-86'>Diễn viên : </span>
                    <span className='opacity-70 md:italic limit3Lines lg:limit2Line'>{actor}</span>

                </div>
            </div>

            <div className='px-5 md:px-6 lg:px-0'>
                <div className='mt-4'>
                    <span className='font-bold text-xl uppercase'>Nội dung :</span>
                    <p dangerouslySetInnerHTML={{ __html: movieDetailData?.content }} className='mt-3 px-4 mb-8 italic opacity-70'></p>
                </div>
            
                <MovieGroup movieGroupName="Phim Cùng Thể Loại" moviesdata={movieRecommnedData?.moviesData}/>
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
 
export default MovieInfor;