import logo from '../assets/images/logo.png'

const Footer = () => {
    return ( 
        <div className=' mt-12 pt-3 '>
            <div className='w-60 h-1 mb-3 bg-red-400 opacity-60 rounded-xl my-0 mx-auto'></div>
            <div className='flex px-24 pt-4 justify-between items-center gap-5 bg-zinc-800'>
                <img src={logo} alt="logo" className='w-24 ml-4' />
                <p className='text-gray-200 italic'>
                    Website chỉ nhằm phục vụ nhu cầu học tập, không có tính thương mại. 
                    Nguồn phim được sử dụng từ bên thứ 3.

                </p>
            </div>
            <h4 className='text-center italic text-sm py-2 text-gray-400 bg-zinc-800'>Developed by sonvng &hearts;</h4>
        </div>
     );
}
 
export default Footer;