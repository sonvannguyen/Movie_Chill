import {AiOutlineHome, AiOutlineSearch,AiOutlineHistory} from 'react-icons/ai'
import {BiFilterAlt} from 'react-icons/bi'
import {BsBookmarkCheck} from 'react-icons/bs'

import logo from '../assets/images/logo.png'

const Sidebar = () => {
    return ( 
        <div className='relative w-auto h-full '>
            <div className='fixed top-2 left-10 '>
               <img className='w-36 ml-2 cursor-pointer hover:scale-110 transition duration-300 ease-in-out' src={logo} alt="" />

               <div>
                    <h3 className='text-xl mt-6 mb-4 font-bold'>MENU</h3>
                    <div className='flex items-center gap-4 pl-6 py-2 pr-10 mb-4 opacity-70 cursor-pointer hover:opacity-100'>
                        <AiOutlineHome size={26}/>
                        <span className='text-lg'>Home</span>
                    </div>
                    <div className='flex items-center gap-4 pl-6 py-2 pr-10 mb-4 opacity-70 cursor-pointer hover:opacity-100'>
                        <BiFilterAlt size={26}/>
                        <span className='text-lg'>Filter</span>
                    </div>
                    <div className='flex items-center gap-4 pl-6 py-2 pr-10 mb-4 opacity-70 cursor-pointer hover:opacity-100'>
                        <AiOutlineSearch size={26}/>
                        <span className='text-lg'>Search</span>
                    </div>

                    <h3 className='text-xl mt-10 mb-4 font-bold'>PERSONAL</h3>
                    <div className='flex items-center gap-4 pl-6 py-2 pr-10 mb-4 opacity-70 cursor-pointer hover:opacity-100'>
                        <AiOutlineHistory size={26}/>
                        <span className='text-lg'>History</span>
                    </div>
                    <div className='flex items-center gap-4 pl-6 py-2 pr-10 mb-4 opacity-70 cursor-pointer hover:opacity-100'>
                        <BsBookmarkCheck size={26}/>
                        <span className='text-lg'>Bookmarked</span>
                    </div>
               </div>
               
            </div>
        </div>
     );
}
 
export default Sidebar;