import {NavLink} from 'react-router-dom'
import {AiOutlineHome, AiOutlineSearch,AiOutlineHistory} from 'react-icons/ai'
import {BiFilterAlt} from 'react-icons/bi'
import {BsBookmarkCheck} from 'react-icons/bs'

import logo from '../assets/images/logo.png'

const Sidebar = () => {
    // change class name nav link when active
    const navItem = ({ isActive }) => {
        return isActive ? 'menu-item menu-item-active' : 'menu-item'
    }

    return ( 
        <div className='relative w-auto h-full border-r-[1px] border-[#ffffff1d] '>
            <div className='fixed top-2 left-8 '>
               <img className='w-36 cursor-pointer' src={logo} alt="logo" />

               <div>
                    <h3 className='text-xl mt-6 mb-4 font-bold'>MENU</h3>

                    <NavLink to='/' className={navItem}>
                        <AiOutlineHome size={22}/>
                        <span className='text-lg'>Home</span>
                    </NavLink>

                    <NavLink to='/search' className={navItem}>
                        <AiOutlineSearch size={22}/>
                        <span className='text-lg'>Search</span>
                    </NavLink>

                    <NavLink to='/filter' className={navItem}>
                        <BiFilterAlt size={22}/>
                        <span className='text-lg'>Filter</span>
                    </NavLink>

                    <h3 className='text-xl mt-10 mb-4 font-bold'>PERSONAL</h3>

                    <NavLink to='/history' className={navItem}>
                        <AiOutlineHistory size={22}/>
                        <span className='text-lg'>History</span>
                    </NavLink>
                    
                    <NavLink to='/bookmarked' className={navItem}>
                        <BsBookmarkCheck size={22}/>
                        <span className='text-lg'>Bookmarked</span>
                    </NavLink>
               </div>
               
            </div>
        </div>
     );
}
 
export default Sidebar;