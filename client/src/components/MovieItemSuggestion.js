import { Link } from 'react-router-dom';
import {FaPlay} from 'react-icons/fa';


const MovieItemSuggestion = ({movieData}) => {
    return ( 
        <Link to={`/detail/${movieData?.slug}`} className="mb-5 flex gap-5 cursor-pointer group hover:bg-zinc-700 transition duration-200 ease-in-out rounded-md">
            <div className="relative">
                <img
                    src={`https://img.hiephanhthienha.com${movieData?.thumb_url}`} 
                    alt="movie thumb" 
                    className="max-w-[80px] h-full object-cover opacity-90 group-hover:opacity-60 rounded-md"
                />
                <div className='hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                    <FaPlay/>
                </div>
            </div>
            <div className="flex flex-col justify-between pb-2">
                <h4 className="opacity-90">{movieData?.origin_name}</h4>
                <h4 className="text-sm opacity-60">{movieData?.category[0]}</h4>
                {
                    movieData?.type == 'single' ? 
                    (
                        <h4 className="text-sm italic opacity-60">Phim lẻ</h4>
                    ) :
                    (
                        <h4 className="text-sm italic opacity-60">Phim bộ</h4>
                    )
                }
            </div>
        </Link>
     );
}
 
export default MovieItemSuggestion;