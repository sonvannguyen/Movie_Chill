import logo from '../assets/images/logo.png'

const Footer = () => {
    return ( 
        <div className=' mt-12 pt-3 '>
            <div className='w-60 h-1 mb-3 bg-red-400 opacity-60 rounded-xl my-0 mx-auto'></div>
            <div className='px-[3px] md:px-5 flex flex-col md:flex-row lg:px-24 md:pt-4 md:justify-between items-center md:gap-5 bg-[#27272a9c]'>
                <img src={logo} alt="logo" className='hidden md:block w-24 ml-4' />
                <p className='text-gray-200 md:italic text-center md:text-start text-sm md:text-base'>
                    Website chỉ nhằm phục vụ nhu cầu học tập, không có tính thương mại. 
                    Nguồn phim được sử dụng từ bên thứ 3.

                </p>
            </div>
            <h4 className='text-center italic text-sm py-2 text-gray-400 bg-[#27272a9c]'>
                Developed by sonvng &hearts;
            </h4>
        </div>
     );
}
 
export default Footer;