import {BsBookmarkHeart, BsPlayBtn} from 'react-icons/bs'
import {IoMdShareAlt} from 'react-icons/io'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const movieData = {
    "name": "Sự Trả Thù Của Người Thứ 3",
"origin_name": "Revenge of Others",
"content": "<p>Một cậu bé rơi xuống chết ở trường, nhưng Ok Chanmi không tin rằng anh trai sinh đôi của cô, Park Wonseok, đã tự tử. Chanmi chuyển đến trường của anh trai cô, Yongtan High, và gặp Ji Sooheon, người đã chứng kiến ​​cái chết của anh trai cô.</p>",
"type": "series",
"status": "completed",
"thumb_url": "http://img.ophim1.cc/uploads/movies/su-tra-thu-cua-nguoi-thu-3-thumb.jpg",
"poster_url": "http://img.ophim1.cc/uploads/movies/su-tra-thu-cua-nguoi-thu-3-poster.jpg",
"is_copyright": "off",
"sub_docquyen": "off",
"chieurap": false,
"trailer_url": "",
"time": "60 phút/tập",
"episode_current": "Hoàn Tất (12/12)",
"episode_total": "12 Tập",
"quality": "HD",
"lang": "Vietsub",
"notify": "",
"showtimes": "",
"slug": "su-tra-thu-cua-nguoi-thu-3",
"year": 2022,
"actor": [
"Kim Yoo-Jin",
"Lomon",
"Seo Ji-Hoon",
"Chae Sang-Woo",
"Lee Soo-Min",
"Chung Su-Bin",
"Kim Joo-Ryung",
"Woo Yeon"
],
"director": [
"Kim Yoo-Jin"
],
"category": [
{
"name": "Chính kịch"
}
],
"country": [
{
"name": "Hàn Quốc"
}
]
}

const movieInforTemplate = [
    {
        title: "Type : ",
        value: movieData["type"]
    },
    {
        title: "Time : ",
        value: movieData["time"]
    },
    {
        title: "Trạng thái : ",
        value: movieData["status"]
    },
    {
        title: "Thể loại : ",
        value: movieData["category"][0]["name"]
    },
    {
        title: "Quốc gia : ",
        value: movieData["country"][0]["name"]
    },
    {
        title: "Năm phát hành : ",
        value: movieData["year"]
    },
]

const MovieInfor = () => {
    return (  
        <div>
            {/* Banner */}
            <div>
                <div className="relative h-[440px]">
                    <img 
                        src={movieData["poster_url"] || movieData["thumb_url"]} 
                        className='h-full w-full object-cover ' 
                        alt="poster img" 
                    />
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.12)]'></div>

                    <img 
                        src={movieData["thumb_url"]} 
                        className='absolute z-10 bottom-[-30px] w-[170px] rounded-md shadow-primary' 
                        alt="thumb img" 
                    />

                    <div className="absolute top-3 left-3 ">
                        <span className="bg-black p-1 text-xs shadow-primary">
                            {`${movieData["quality"]} -  ${movieData["lang"]}`}
                        </span>
                        <h5 className="bg-red-700 p-1 mt-[2px] text-sm uppercase shadow-primary">
                            Tổng số tập: {movieData["episode_total"]}
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
                            <h3 className='text-3xl font-bold'>{movieData["origin_name"]}</h3>
                            <h4 className='text-lg mt-3 text-gray-300'>{`( ${movieData["name"]} )`}</h4>
                        </div>
                        <div className='flex items-center w-[10rem] h-[50px] gap-2 bg-red-700 p-3 rounded-xl cursor-pointer hover:bg-gray-600'>
                            <BsPlayBtn fontSize={30}/>
                            <span>WATCH NOW</span>
                        </div>
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
                        <span className='opacity-70 italic'>{movieData["director"]}</span>
                    </div>
                    <span className='font-bold opacity-86'>Diễn viên : </span>
                    
                    {
                        movieData["actor"].map((actor, index) => (
                            <span key={index} className='opacity-70 italic text-sm '>{actor} ,</span>
                        ) )
                    }
                </div>
            </div>

            <div className='mt-4'>
                <span className='font-bold text-xl uppercase'>Nội dung :</span>
                <p dangerouslySetInnerHTML={{ __html: movieData["content"] }} className='mt-3 px-4 mb-[200px] italic opacity-70'></p>
            </div>
           
        </div>
    );
}
 
export default MovieInfor;