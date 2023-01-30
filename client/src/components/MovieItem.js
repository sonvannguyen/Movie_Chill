import { BsPlayCircle } from "react-icons/bs";

const MovieItem = () => {
    return ( 
        <div>
            <div className="relative group" >
                <div className="overflow-hidden group">
                    <img 
                        src="https://image.tmdb.org/t/p/w342/6P6tXhjT5tK3qOXzxF9OMLlG7iz.jpg" 
                        className='w-[186px] rounded-md cursor-pointer group-hover:opacity-80 group-hover:scale-105 transition duration-300 ease-in-out'
                        alt="poster" 
                    />
                </div>
                <div className="hidden group-hover:flex absolute top-0 bottom-0 left-0 right-0 items-center justify-center cursor-pointer">
                    <BsPlayCircle size={40} className='items-center text-white'/>
                </div>
            </div>
            <h3 className='text-lg font-bold cursor-pointer opacity-90'>Cheer up</h3>
            <h4 className='cursor-pointer opacity-60'>Vũ điệu tuổi trẻ</h4>

        </div>
     );
}
 
export default MovieItem;