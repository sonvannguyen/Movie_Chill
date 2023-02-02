import { BsPlayCircle } from "react-icons/bs";
import {RiDeleteBack2Line} from 'react-icons/ri'

const MovieItem = ({inPageEdit, movieData}) => {
    return ( 
        <div>
            <div className="relative group" >
                <div className="overflow-hidden group">
                    <img 
                        src={movieData?.thumb_url}
                        className='w-[186px] rounded-md cursor-pointer group-hover:opacity-80 group-hover:scale-105 transition duration-300 ease-in-out'
                        alt="thumb img" 
                    />
                </div>
                <div className="hidden group-hover:flex absolute top-0 bottom-0 left-0 right-0 items-center justify-center cursor-pointer">
                    <BsPlayCircle size={40} className='items-center text-white'/>
                </div>
                {
                    inPageEdit &&
                    <div className="hidden group-hover:flex absolute top-0 right-0 p-2 bg-zinc-700 cursor-pointer hover:bg-red-500">
                        <RiDeleteBack2Line size={22}/>
                    </div>
                }
            </div>
            <h3 className='text-lg font-bold cursor-pointer opacity-90'>{movieData?.origin_name}</h3>
            <h4 className='cursor-pointer opacity-60'>{movieData?.name}</h4>

        </div>
     );
}
 
export default MovieItem;