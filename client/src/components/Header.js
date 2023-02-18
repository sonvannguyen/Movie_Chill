import { useState , useRef, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineCaretDown, AiOutlineUser, AiOutlineMenuUnfold} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {MdClose} from 'react-icons/md'

import logo from '../assets/images/logo.png'
import Sidebar from './Sidebar'


const categoryData = [
    "Tình Cảm",
    "Hài Hước",
    "Hành Động",
    "Tâm Lý",
    "Cổ Trang",
    "Gia Đình",
    "Học Đường",
    "Khoa Học",
    "Viễn Tưởng",
    "Kinh Dị"
]
const countryData = [
    "Âu Mỹ",
    "Hàn Quốc",
    "Trung Quốc",
]

const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const username = localStorage.getItem('username')

    // handle menu
    const menuRef = useRef(null)
    const handleToggleMenu = () => setIsOpenMenu(!isOpenMenu)

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpenMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true)
        return () => {
          document.removeEventListener('click', handleOutsideClick, true)
        }
    })

    return ( 
        <div 
            className='sticky top-0 left-0 right-0 py-1 px-3 md:px-0 md:py-4 bg-[#1c1c1e] z-10 md:flex md:justify-between items-center border-b-[1px] border-[rgba(255,255,255,0.17)] md:pl-5'
        >
            <div className="hidden md:flex justify-between gap-3">
                <Link to='/filter?type=single' className="tag-primary">Phim Lẻ</Link>
                <Link to='/filter?type=series' className="tag-primary">Phim Bộ</Link>

                <div className="relative tag-primary flex items-center gap-2 group">
                    <span>Thể Loại</span>
                    <AiOutlineCaretDown/>
                    <div className='hidden group-hover:flex absolute top-[50px] right-0 w-[200px] bg-zinc-700 z-20 justify-between p-2 rounded-md'>
                        <div>
                            {
                                categoryData.map((category, index) => {
                                    if(index <= 4){
                                        return (
                                            <Link to={`/filter?category=${category}`} 
                                                key={index} 
                                                className='block p-2 opacity-80 bg-[#00000016] mb-1 text-center rounded-md hover:bg-red-500 hover:opacity-100 transition duration-300 ease-in-out'
                                            >
                                                {category}
                                            </Link>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className='realative z-10'>
                            {
                                categoryData.map((category, index) => {
                                    if(index > 4){
                                        return (
                                            <Link to={`/filter?category=${category}`}  
                                                key={index} 
                                                className='block p-2 opacity-80 bg-[#00000016] mb-1 text-center rounded-md hover:bg-red-500 hover:opacity-100 transition duration-300 ease-in-out'
                                            > 
                                            {category}
                                            </Link>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className='absolute right-[10px] top-[-3px] w-10 h-10 bg-zinc-700 rotate-45 z-0'></div>
                        <div className='absolute top-[-14px] left-[30px] right-0 h-5 z-0'></div>
                    </div>
                </div>

                <div className="relative tag-primary flex items-center gap-2 group">
                    <span>Quốc Gia</span>
                    <AiOutlineCaretDown/>
                    <div className='hidden group-hover:block absolute top-[50px] right-0 w-[120px] bg-zinc-700 z-20 p-2 rounded-md text-center'>
                        {
                            countryData.map((country, index) => (
                                <Link 
                                    to={`/filter?country=${country}`} 
                                    key={index} 
                                    className='block relative z-10 p-2 opacity-80 bg-[#00000016] mb-1 text-center rounded-md hover:bg-red-500 hover:opacity-100 transition duration-300 ease-in-out'>
                                    {country}
                                </Link>
                            ))
                        }
                        <div className='absolute right-[16px] top-[-6px] w-7 h-7 bg-zinc-700 rotate-45 z-0'></div>
                        <div className='absolute top-[-14px] left-0 right-0 h-5 z-0'></div>
                    </div>
                </div>
            </div>

            {
                username ? 
                (
                    <div className='hidden lg:flex lg:items-center lg:gap-2 bg-neutral-800 p-2 cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out rounded-md '>
                        <AiOutlineUser/>
                        <span>{username}</span>
                    </div>
                ):
                (
                    <Link to='/login' className='hidden lg:flex lg:items-cente lg:gap-2 bg-neutral-800 p-2 cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out rounded-md '>
                        <AiOutlineUser/>
                        <span>Đăng nhập</span>
                    </Link>
                )
            }

            {/* for mobile */}
            <div className='flex justify-between items-center'>
                <Link to='/'>
                    <img src={logo} alt="logo" className='md:hidden w-24' />
                </Link>
                <div className='md:hidden flex items-center gap-2'>
                    <Link to='/search' className='p-3'>
                        <BsSearch size={20}/>
                    </Link>
                    <div className=' py-2 pl-3 pr-0' onClick={handleToggleMenu}>
                        {
                            isOpenMenu ? 
                            (
                                <MdClose size={32}/>
                            ):(
                                <AiOutlineMenuUnfold size={32}/>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={`${isOpenMenu? '' : 'hidden'} md:hidden fixed left-0 bottom-0 h-screen bg-[#15151577] w-full`}>
                <div 
                    className={`${isOpenMenu && 'open'} w-[68%] h-screen bg-[#151515] pt-20 pl-5`}
                    ref={menuRef}
                >
                    <Sidebar/>
                </div>
            </div>

        </div>
     );
}
 
export default Header;