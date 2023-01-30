import {AiOutlineCaretDown, AiOutlineUser} from 'react-icons/ai'

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
    return ( 
        <div 
            className='sticky top-0 left-0 right-0 py-4 bg-[#1c1c1e] z-10 flex justify-between items-center border-b-[1px] border-[rgba(255,255,255,0.17)]'
        >
            <div className="flex justify-between gap-3">
                <div className="tag-primary">Phim Lẻ</div>
                <div className="tag-primary">Phim Bộ</div>

                <div className="relative tag-primary flex items-center gap-2 group">
                    <span>Thể Loại</span>
                    <AiOutlineCaretDown/>
                    <div className='hidden group-hover:flex absolute top-[50px] right-0 w-[200px] bg-zinc-700 z-20 justify-between p-2 rounded-md'>
                        <div>
                            {
                                categoryData.map((category, index) => {
                                    if(index <= 4){
                                        return (
                                            <h4 
                                                key={index} 
                                                className='p-2 opacity-80 bg-[#00000016] mb-1 text-center rounded-md hover:bg-red-500 hover:opacity-100 transition duration-300 ease-in-out'
                                            >
                                                {category}
                                            </h4>
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
                                            <h4 
                                                key={index} 
                                                className='p-2 opacity-80 bg-[#00000016] mb-1 text-center rounded-md hover:bg-red-500 hover:opacity-100 transition duration-300 ease-in-out'
                                            > 
                                            {category}
                                            </h4>
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
                                <h4 key={index} className='relative z-10 p-2 opacity-80 bg-[#00000016] mb-1 text-center rounded-md hover:bg-red-500 hover:opacity-100 transition duration-300 ease-in-out'>
                                    {country}
                                </h4>
                            ))
                        }
                        <div className='absolute right-[16px] top-[-6px] w-7 h-7 bg-zinc-700 rotate-45 z-0'></div>
                        <div className='absolute top-[-14px] left-0 right-0 h-5 z-0'></div>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2 bg-neutral-800 p-2 cursor-pointer hover:bg-red-500 '>
                <AiOutlineUser/>
                <span>Account</span>
            </div>
        </div>
     );
}
 
export default Header;