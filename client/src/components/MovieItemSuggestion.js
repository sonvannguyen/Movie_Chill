import {FaPlay} from 'react-icons/fa';


const movieData = {
    "name": "Avatar 2: Dòng Chảy Của Nước",
"origin_name": "Avatar 2",
"content": "<p>Sau avatar 1 Hai nhân vật chính, Jake Sully và Neytiri, giờ đã thành đôi, nguyện sẽ ở bên nhau. Tuy nhiên, cả hai buộc phải rời khỏi nhà và khám phá những miền đất mới trên mặt trăng Pandora, cũng chính là lúc những mối nguy cũ trở lại với họ.</p>",
"type": "single",
"status": "completed",
"thumb_url": "https://img.hiephanhthienha.com/uploads/movies/avatar-2-dong-chay-cua-nuoc-thumb.jpg",
"poster_url": "https://img.hiephanhthienha.com/uploads/movies/avatar-2-dong-chay-cua-nuoc-poster.jpg",
"is_copyright": "off",
"sub_docquyen": "on",
"chieurap": true,
"trailer_url": "https://www.youtube.com/watch?v=8Ilt3PY_M3w",
"time": "120 phút",
"episode_current": "Full",
"episode_total": "1",
"quality": "HD",
"lang": "Vietsub",
"notify": "",
"showtimes": "",
"slug": "avatar-2-dong-chay-cua-nuoc",
"year": 2022,
"actor": [
"Sam Worthington",
" Zoe Saldana",
" Sigourney Weaver",
" Stephen Lang"
],
"director": [
"James Cameron"
],
"category": [
{
"name": "Hành Động"
},
{
"name": "Phiêu Lưu"
}
],
"country": [
{
"name": "Âu Mỹ"
}
]
}


const MovieItemSuggestion = () => {
    return ( 
        <div className="mb-5 flex gap-5 cursor-pointer group hover:bg-zinc-700 transition duration-200 ease-in-out rounded-md">
            <div className="relative">
                <img
                    src={movieData["thumb_url"]} 
                    alt="movie thumb" 
                    className="w-20 opacity-90 group-hover:opacity-60 rounded-md"
                />
                <div className='hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                    <FaPlay/>
                </div>
            </div>
            <div className="flex flex-col justify-between pb-2">
                <h4 className="text-lg opacity-90">{movieData['origin_name']}</h4>
                <h4 className="text-sm opacity-60">{movieData['category'][0]['name']}</h4>
                <h4 className="text-sm italic opacity-60">{movieData['time']}</h4>
            </div>
        </div>
     );
}
 
export default MovieItemSuggestion;