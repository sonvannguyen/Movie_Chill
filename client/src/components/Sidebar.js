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
                    <div className='menu-item'>
                        <AiOutlineHome size={22}/>
                        <span className='text-lg'>Home</span>
                    </div>
                    <div className='menu-item'>
                        <BiFilterAlt size={22}/>
                        <span className='text-lg'>Filter</span>
                    </div>
                    <div className='menu-item'>
                        <AiOutlineSearch size={22}/>
                        <span className='text-lg'>Search</span>
                    </div>

                    <h3 className='text-xl mt-10 mb-4 font-bold'>PERSONAL</h3>
                    <div className='menu-item'>
                        <AiOutlineHistory size={22}/>
                        <span className='text-lg'>History</span>
                    </div>
                    <div className='menu-item'>
                        <BsBookmarkCheck size={22}/>
                        <span className='text-lg'>Bookmarked</span>
                    </div>
               </div>
               
            </div>
        </div>
     );
}
 
export default Sidebar;