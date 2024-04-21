import {NavLink, Link, useNavigate} from 'react-router-dom'
import {AiOutlineHome, AiOutlineSearch,AiOutlineHistory} from 'react-icons/ai'
import {BiFilterAlt} from 'react-icons/bi'
import {BsBookmarkCheck} from 'react-icons/bs'
import { CiLogout, CiLogin} from 'react-icons/ci'
import { IoIosNotificationsOutline } from "react-icons/io";

import logo from '../assets/images/logo.png'

const Sidebar = () => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('movie_access_token')
    // change class name nav link when active
    const navItem = ({ isActive }) => {
        return isActive ? 'menu-item menu-item-active' : 'menu-item'
    }

    const handleLogout = () => {
        localStorage.removeItem('movie_userId')
        localStorage.removeItem('movie_access_token')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return ( 
        <div className='md:relative w-auto h-full border-r-[1px] border-[#ffffff1d] '>
            <div className='md:fixed left-5 top-2 lg:left-8 '>
                <Link to='/'>
                    <img className='hidden md:block w-36 cursor-pointer' src={logo} alt="logo" />
                </Link>

               <div>
                    <h3 className='text-xl mt-6 mb-4 font-bold'>MENU</h3>

                    <NavLink to='/' className={navItem}>
                        <AiOutlineHome size={22}/>
                        <span className='lg:text-lg'>Trang chủ</span>
                    </NavLink>

                    <NavLink to='/search' className={navItem}>
                        <AiOutlineSearch size={22}/>
                        <span className='lg:text-lg'>Tìm kiếm phim</span>
                    </NavLink>

                    <NavLink to='/filter' className={navItem}>
                        <BiFilterAlt size={22}/>
                        <span className='lg:text-lg'>Lọc phim</span>
                    </NavLink>

                    <h3 className='text-xl mt-10 mb-4 font-bold'>PERSONAL</h3>

                    <NavLink to='/history' className={navItem}>
                        <IoIosNotificationsOutline size={26}/>
                        <div className='flex flex-col'>
                            <span className='lg:text-lg'>Thông báo</span>
                            {
                                !accessToken && 
                                <span className='text-[13px] font-thin text-white italic'>( Yêu cầu đăng nhập )</span>  
                            }
                        </div>
                    </NavLink>

                    <NavLink to='/history' className={navItem}>
                        <AiOutlineHistory size={22}/>
                        <div className='flex flex-col'>
                            <span className='lg:text-lg'>Lịch sử xem</span>
                            {
                                !accessToken && 
                                <span className='text-[13px] font-thin text-white italic'>( Yêu cầu đăng nhập )</span>  
                            }
                        </div>
                    </NavLink>
                    
                    <NavLink to='/bookmarked' className={navItem}>
                        <BsBookmarkCheck size={22}/>
                        <div className='flex flex-col'>
                             <span className='lg:text-lg'>Phim đã lưu</span>
                            {
                                !accessToken && 
                                <span className='text-[13px] font-thin text-white italic'>( Yêu cầu đăng nhập )</span>  
                            }  
                        </div>
                    </NavLink>

                    {
                        accessToken ?
                        (
                            <div className='menu-item' onClick={handleLogout}>
                                <CiLogout size={24}/>
                                <span className='lg:text-lg'>Log out</span>
                            </div>
                        ) :
                        (
                            <Link to='/login' className='menu-item'>
                                <CiLogin size={26}/>
                                <span className='lg:text-lg'>Log in</span>
                            </Link>
                        )
                    }
               </div>
               
            </div>
        </div>
     );
}
 
export default Sidebar;