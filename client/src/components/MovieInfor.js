import { Link } from 'react-router-dom';
import {BsBookmarkHeart, BsPlayBtn} from 'react-icons/bs'
import {IoMdShareAlt} from 'react-icons/io'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const MovieInfor = ({movieDetailData}) => {
    const movieInforTemplate = [
        {
            title: "Type : ",
            value: movieDetailData?.type
        },
        {
            title: "Time : ",
            value: movieDetailData?.time
        },
        {
            title: "Trạng thái : ",
            value: movieDetailData?.status
        },
        {
            title: "Thể loại : ",
            value: movieDetailData?.category[0].name
        },
        {
            title: "Quốc gia : ",
            value: movieDetailData?.country[0].name
        },
        {
            title: "Năm phát hành : ",
            value: movieDetailData?.year
        }
    ]
    return (  
        <div>
            {/* Banner */}
            <div>
                <div className="relative h-[440px]">
                    <img 
                        src={movieDetailData?.poster_url || movieDetailData?.thumb_url} 
                        className='h-full w-full object-cover ' 
                        alt="poster img" 
                    />
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.12)]'></div>

                    <img 
                        src={movieDetailData?.thumb_url} 
                        className='absolute z-10 bottom-[-30px] w-[170px] rounded-md shadow-primary' 
                        alt="thumb img" 
                    />

                    <div className="absolute top-3 left-3 ">
                        <span className="bg-black p-1 text-xs shadow-primary">
                            {`${movieDetailData?.quality} -  ${movieDetailData?.lang}`}
                        </span>
                        <h5 className="bg-red-700 p-1 mt-[2px] text-sm uppercase shadow-primary">
                            Tổng số tập: {movieDetailData?.episode_total}
                        </h5>
                    </div>


                    <div className='absolute right-5 top-3 flex gap-3'>
                        <div className='bg-[rgba(0,0,0,0.6)] p-3 rounded-full cursor-pointer hover:bg-black shadow-primary'>
                            <BsBookmarkHeart fontSize={24}  />
                        </div>
                        <div className='bg-[rgba(0,0,0,0.6)] p-3 rounded-full cursor-pointer hover:bg-black shadow-primary'>
                            <IoMdShareAlt fontSize={24}/>
                        </div>
                    </div>

                    <div 
                        className='absolute flex justify-between items-center bottom-0 left-0 right-0 pl-[200px] pr-[24px] py-5 bg-[rgba(0,0,0,0.73)]'
                    >
                        <div className='w-[328px]'>
                            <h3 className='text-3xl font-bold'>{movieDetailData?.origin_name}</h3>
                            <h4 className='text-lg mt-3 text-gray-300'>{`( ${movieDetailData?.name} )`}</h4>
                        </div>
                        <Link to= {`/watch/${movieDetailData?.slug}/1`} className='flex items-center w-[10rem] h-[50px] gap-2 bg-red-700 p-3 rounded-xl cursor-pointer hover:bg-gray-600'>
                            <BsPlayBtn fontSize={30}/>
                            <span>WATCH NOW</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* infor  */}

            <div className='bg-[rgba(0,0,0.1)] grid grid-cols-4 py-4 px-3 '>
                <div className='pt-8 pl-9'>
                    <h4 className='ml-2 mb-4 text-xl text-[#b6e5ff]'>RATING</h4>
                    <div className='w-[80px]'>
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
                <div>
                    {
                        movieInforTemplate.map((movie, index) => (
                            <div key={index} className='mb-2'> 
                                <span className='font-bold opacity-86 inline-block mr-[12px]'>{movie.title}</span>
                                <span className='opacity-70 italic'>{movie.value}</span>    
                            </div>
                        ))
                    }
                </div>

                <div className='col-span-2 ml-16'>
                    <div className='mb-1'> 
                        <span className='font-bold opacity-86'>Đạo diễn : </span> 
                        <span className='opacity-70 italic'>{movieDetailData?.director}</span>
                    </div>
                    <span className='font-bold opacity-86'>Diễn viên : </span>
                    
                    {
                        movieDetailData?.actor.map((actor, index) => (
                            <span key={index} className='opacity-70 italic text-sm '>{actor} ,</span>
                        ) )
                    }
                </div>
            </div>

            <div className='mt-4'>
                <span className='font-bold text-xl uppercase'>Nội dung :</span>
                <p dangerouslySetInnerHTML={{ __html: movieDetailData?.content }} className='mt-3 px-4 mb-[200px] italic opacity-70'></p>
            </div>
           
        </div>
    );
}
 
export default MovieInfor;