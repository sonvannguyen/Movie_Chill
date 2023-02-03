import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from 'swiper';
import {BiTimeFive, BiWorld,BiMessageDetail} from 'react-icons/bi';
import {FaPlay} from 'react-icons/fa';
import {ImFilm} from 'react-icons/im'; 

import 'swiper/css';
import 'swiper/css/autoplay'; 

const movieDatas = [{
    "name": "Sự Trả Thù Của Người Thứ 3",
"origin_name": "Revenge of Others",
"content": "<p>Một cậu bé rơi xuống chết ở trường, nhưng Ok Chanmi không tin rằng anh trai sinh đôi của cô, Park Wonseok, đã tự tử. Chanmi chuyển đến trường của anh trai cô, Yongtan High, và gặp Ji Sooheon, người đã chứng kiến ​​cái chết của anh trai cô.</p>",
"type": "series",
"status": "completed",
"thumb_url": "https://img.hiephanhthienha.com/uploads/movies/su-tra-thu-cua-nguoi-thu-3-thumb.jpg",
"poster_url": "https://img.hiephanhthienha.com/uploads/movies/su-tra-thu-cua-nguoi-thu-3-poster.jpg",
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
},
{
    "name": "Nữ Hoàng Trả Giá",
"origin_name": "My Bargain Queen ",
"content": "<p>Nữ Hoàng Trả Giá - My Bargain Queen kể về cô gái Hạ Thiển (Ngô Cẩn Ngôn đóng) đang chuẩn bị đính hôn thì hôn phu của cô - Hà Chí Tuấn bỏ trốn. Trong lúc tâm trạng hụt hẫng và tồi tệ, cô đã đụng độ với ông chủ khách sạn Trường Thịnh, Thịnh Triết Ninh (Lâm Canh Tân đóng). Trong cuộc tranh luận, Hạ Thiển nhận thấy kỹ năng quan sát và phân tích chuyên sâu vấn đề của mình rất có lợi trong việc thương lượng trả giá. Và cô đã quyết định bắt đầu con đường trở thành một chuyên gia trả giá, thành lập công ty riêng. Công ty của cô phát triển lớn mạnh hơn với sự giúp đỡ của Thịnh Triết Ninh. Trong lúc này, anh bị rơi vào cái bẫy do các đối tác kinh doanh bày ra và bị đuổi ra khỏi khách sạn. Và Hà Chí Tuấn cũng xuất hiện trở lại trong cuộc đời của Hạ Thiển.</p>",
"type": "series",
"status": "completed",
"thumb_url": "https://img.hiephanhthienha.com/uploads/movies/nu-hoang-tra-gia-thumb.jpg",
"is_copyright": "off",
"trailer_url": "https://www.youtube.com/watch?v=6VJrixCjRGU",
"time": "45 phút/tập",
"episode_current": "Hoàn tất (40/40)",
"episode_total": "40 tập",
"quality": "HD",
"lang": "Vietsub",
"notify": "",
"showtimes": "",
"slug": "nu-hoang-tra-gia",
"year": 2021,
"actor": [
"Lâm Canh Tân",
" Ngô Cẩn Ngôn"
],
"director": [
"Mã Minh",
" Châu Hiểu Bằng"
],
"category": [
{
"name": "Tình Cảm"
}
],
"country": [
{
"name": "Trung Quốc"
}
],
"chieurap": false,
"poster_url": "https://img.hiephanhthienha.com/uploads/movies/nu-hoang-tra-gia-poster.jpg",
"sub_docquyen": "off"
},
{
    "name": "Wednesday",
"origin_name": "Wednesday",
"content": "<p>Thông minh, hay châm chọc và \"chết trong lòng\" một chút, Wednesday Addams điều tra một vụ giết người liên hoàn trong khi có thêm bạn và cả kẻ thù mới ở Học viện Nevermore.</p>",
"type": "series",
"status": "completed",
"thumb_url": "https://img.hiephanhthienha.com/uploads/movies/wednesday-thumb.jpg",
"poster_url": "https://img.hiephanhthienha.com/uploads/movies/wednesday-poster.jpg",
"is_copyright": "off",
"sub_docquyen": "off",
"chieurap": false,
"trailer_url": "",
"time": "45 phút/tập",
"episode_current": "Hoàn Tất (8/8)",
"episode_total": "8 Tập",
"quality": "HD",
"lang": "Vietsub",
"notify": "",
"showtimes": "",
"slug": "wednesday",
"year": 2022,
"actor": [
"Jenna Ortega",
" Gwendoline Christie",
" Riki Lindhome",
" Christina Ricci",
" Jamie McShane",
" Hunter Doohan",
" Percy Hynes White",
" Emma Myers",
" Joy Sunday",
" Moosa Mostafa",
" Georgie Farmer",
" Naomi J. Ogawa",
" Catherine Zeta-Jones",
" Luis Guzmán"
],
"director": [
""
],
"category": [
{
"name": "Bí ẩn"
}
],
"country": [
{
"name": "Âu Mỹ"
}
]
},
{
    "name": "Hòn Đảo Ma Quái",
"origin_name": "Island",
"content": "<p>Won Mi Ho là con gái duy nhất của cha cô, người điều hành tập đoàn Daehan. Thái độ kiêu ngạo và ích kỷ của cô đã khiến cô mắc phải một sai lầm lớn khiến cha cô tức giận và trục xuất cô đến đảo Jeju. Ở đó, cô được phân công làm giáo viên đạo đức trung học. Cô ấy không hề hay biết, hòn đảo là nơi ác quỷ lang thang tự do. Cô gặp những cá nhân khác trên đảo và cùng nhau, các nhân vật hợp lực để sống.</p>",
"type": "series",
"status": "ongoing",
"thumb_url": "https://img.hiephanhthienha.com/uploads/movies/hon-dao-ma-quai-thumb.jpg",
"poster_url": "https://img.hiephanhthienha.com/uploads/movies/hon-dao-ma-quai-poster.jpg",
"is_copyright": "off",
"sub_docquyen": "off",
"chieurap": false,
"trailer_url": "https://www.youtube.com/watch?v=ep5ogWZm9lE",
"time": "70 phút/tập",
"episode_current": "Tập 4",
"episode_total": "8 Tập",
"quality": "FHD",
"lang": "Vietsub",
"notify": "",
"showtimes": "",
"slug": "hon-dao-ma-quai",
"year": 2022,
"actor": [
"Kim Nam-Gil",
"Lee Da-Hee",
"Cha Eun-Woo",
"Sung Joon"
],
"director": [
"Bae Jong"
],
"category": [
{
"name": "Hành Động"
},
{
"name": "Viễn Tưởng"
},
{
"name": "Phiêu Lưu"
}
],
"country": [
{
"name": "Hàn Quốc"
}
]
}
]

const SliderBanner = () => {
    return ( 
        <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{delay: 3000}}
        >
            {
                movieDatas.map((movieData, index) => (
                    <SwiperSlide key={index}>
                        <div className='relative cursor-pointer group'>
                            <img src={movieData['poster_url']} alt="img banner" className='h-96 w-full object-cover group-hover:opacity-90 transition duration-200 ease-in-out'/>
                            <div 
                                className='absolute top-0 left-0 right-0 bottom-0'
                                style={{background: "linear-gradient(266deg, rgba(0,0,0,0.18017629415047265) 0%, rgba(0,0,0,0.905946602273722) 100%)"}}
                            >
                            </div>
                           
                            <div className='absolute top-0 left-0 right-[200px] bottom-0 pl-6 pt-2'>
                                <h3 className='text-5xl font-bold  text-red-500'>{movieData["origin_name"]}</h3>
                                <h4 className='text-xl font-bold my-3'>{`( ${movieData["name"]} )`}</h4>
                                <div className='flex gap-2 items-center mb-2 mt-10 opacity-80'>
                                    <BiWorld size={20}/>
                                    <span>Quốc gia: {movieData['country'][0]['name']}</span>
                                </div>
                                <div className='flex gap-2 items-center mb-2 opacity-80'>
                                    <BiTimeFive size={20}/>
                                    <span>Thời lượng: {movieData['time']}</span>
                                </div>
                                <div className='flex gap-2 items-center mb-2 opacity-80'>
                                    <ImFilm size={20}/>
                                    <span>Thể loại: {movieData['category'][0]['name']}</span>
                                </div>
                                <div className='flex gap-2 items-center mt-7 opacity-80'>
                                    <BiMessageDetail size={20}/>
                                    <span>Nội dung: </span>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: movieData["content"] }} className='mt-1 px-4 mb-[200px] italic opacity-80 limit3Lines'></p>
                            </div>
                           
                            <div className='absolute flex flex-col items-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                                <FaPlay size={50}/>
                                <h4 className='hidden group-hover:block mt-2 font-bold  '>PLAY NOW</h4>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }

        </Swiper>
     );
}
 
export default SliderBanner;