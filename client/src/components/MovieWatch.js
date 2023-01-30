import {BiMessageDetail} from 'react-icons/bi';
import {RiMovieLine} from 'react-icons/ri'
import MovieGroup from './MovieGroup';

const movieData = {
    "name": "Hòn Đảo Ma Quái",
"origin_name": "Island",
"content": "<p>Won Mi Ho là con gái duy nhất của cha cô, người điều hành tập đoàn Daehan. Thái độ kiêu ngạo và ích kỷ của cô đã khiến cô mắc phải một sai lầm lớn khiến cha cô tức giận và trục xuất cô đến đảo Jeju. Ở đó, cô được phân công làm giáo viên đạo đức trung học. Cô ấy không hề hay biết, hòn đảo là nơi ác quỷ lang thang tự do. Cô gặp những cá nhân khác trên đảo và cùng nhau, các nhân vật hợp lực để sống.</p>",
"type": "series",
"status": "ongoing",
"thumb_url": "https://img.hiephanhthienha.com/uploads/movies/hon-dao-ma-quai-thumb.jpg",
"poster_url": "https://img.hiephanhthienha.com/uploads/movies/hon-dao-ma-quai-poster.jpg",
"is_copyright": "off",
"sub_docquyen": "off",
"chieurap": false,
"trailer_url": "https://www.youtube.com/watch?v=ep5ogWZm9lE",
"time": "70 phút/tập",
"episode_current": "Tập 4",
"episode_total": "8 Tập",
"quality": "FHD",
"lang": "Vietsub",
"notify": "",
"showtimes": "",
"slug": "hon-dao-ma-quai",
"year": 2022,
"actor": [
"Kim Nam-Gil",
"Lee Da-Hee",
"Cha Eun-Woo",
"Sung Joon"
],
"director": [
"Bae Jong"
],
"category": [
{
"name": "Hành Động"
},
{
"name": "Viễn Tưởng"
},
{
"name": "Phiêu Lưu"
}
],
"country": [
{
"name": "Hàn Quốc"
}
]
}

const episodeData = {
    "episodes": [
        {
        "server_name": "Vietsub #1",
        "server_data": [
        {
        "name": "1",
        "slug": "1",
        "filename": "Revenge.of.Others.S01E01.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.1080phim.com/share/e9527aec68523b8ceb74e12b8685b96a",
        "link_m3u8": "https://hd.1080phim.com/20221111/28048_f8c36958/index.m3u8"
        },
        {
        "name": "2",
        "slug": "2",
        "filename": "Revenge.of.Others.S01E02.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.1080phim.com/share/ddf20ca99b0ddd9a0e505ed7830ea299",
        "link_m3u8": "https://hd.1080phim.com/20221111/28049_9080ac33/index.m3u8"
        },
        {
        "name": "3",
        "slug": "3",
        "filename": "Revenge.of.Others.S01E03.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.hdbophim.com/share/8803f7fa56465a59d0c1a12ec666f533",
        "link_m3u8": "https://hd.hdbophim.com/20221118/26172_3b2c3b10/index.m3u8"
        },
        {
        "name": "4",
        "slug": "4",
        "filename": "Revenge.of.Others.S01E04.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.hdbophim.com/share/0594763bf6171668f8bc4cd79ebcbd63",
        "link_m3u8": "https://hd.hdbophim.com/20221118/26173_56949791/index.m3u8"
        },
        {
        "name": "5",
        "slug": "5",
        "filename": "Revenge.of.Others.S01E05.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.hdbophim.com/share/22b880633e6c3b3c7bccc56c59ff11b9",
        "link_m3u8": "https://hd.hdbophim.com/20221126/26426_1aaba25f/index.m3u8"
        },
        {
        "name": "6",
        "slug": "6",
        "filename": "Revenge.of.Others.S01E06.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.hdbophim.com/share/7061e05fd01005f38567bfe463f680ed",
        "link_m3u8": "https://hd.hdbophim.com/20221126/26427_3e73b37d/index.m3u8"
        },
        {
        "name": "7",
        "slug": "7",
        "filename": "Revenge.of.Others.S01E07.2022.Disney.WEB-DL.1080p.H264.DDP-HDCTV (1)",
        "link_embed": "https://hd.1080phim.com/share/f82eedc57df33f85b6938f71ed72032f",
        "link_m3u8": "https://hd.1080phim.com/20221202/29148_bcf78348/index.m3u8"
        },
        {
        "name": "8",
        "slug": "8",
        "filename": "Revenge.of.Others.S01E08.2022.Disney.WEB-DL.1080p.H264.DDP-HDCTV (1)",
        "link_embed": "https://hd.1080phim.com/share/9d1045d1219ce20574fcc07162f346e6",
        "link_m3u8": "https://hd.1080phim.com/20221202/29149_fbb02053/index.m3u8"
        },
        {
        "name": "9",
        "slug": "9",
        "filename": "Revenge.of.Others.S01E09.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://1080.hdphimonline.com/share/b9539626d37f52bcdf87c0e671329cbb",
        "link_m3u8": "https://1080.hdphimonline.com/20221212/39482_3c98512e/index.m3u8"
        },
        {
        "name": "10",
        "slug": "10",
        "filename": "Revenge.of.Others.S01E10.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://1080.hdphimonline.com/share/55b0dce57b47df0013b6bfdfd5636f3f",
        "link_m3u8": "https://1080.hdphimonline.com/20221212/39483_ba59bebe/index.m3u8"
        },
        {
        "name": "11",
        "slug": "11",
        "filename": "Revenge.of.Others.S01E11.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.hdbophim.com/share/5abad9111ffcd62ba77847ae11e1ae65",
        "link_m3u8": "https://hd.hdbophim.com/20221221/27623_af3b01c9/index.m3u8"
        },
        {
        "name": "12",
        "slug": "12",
        "filename": "Revenge.of.Others.S01E12.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820",
        "link_embed": "https://hd.hdbophim.com/share/0171506e0818c24f1c01d1aafc5de8ff",
        "link_m3u8": "https://hd.hdbophim.com/20221221/27624_9c0efd1b/index.m3u8"
        }
        ]
        }
        ]
}

const MovieWatch = () => {
    return ( 
        <>
            <div>
                <iframe 
                    src="https://hd.hdbophim.com/share/3d9bacb87f3ac79bc833a7c96637ee07" 
                    className="w-full h-[430px] "
                >
                </iframe>
                <div className='mt-5 flex justify-between items-center pr-6 border-b-[0.3px] pb-5 border-zinc-700'>
                    <div>
                        <h3 className="text-4xl font-bold mb-2">{movieData['origin_name']}</h3>
                        <h4 className="text-xl opacity-80">{`( ${movieData["name"]} )`}</h4>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">TẬP 3</h3>
                </div>

                <div className='flex gap-2 items-center mt-5 text-red-400'>
                        <BiMessageDetail size={23}/>
                        <span className='text-lg' >Nội dung: </span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: movieData["content"] }} className='mt-2 px-4 italic opacity-70'></p>

                <div>
                    <div className='flex gap-3 items-center my-6 text-red-400 '>
                        <RiMovieLine size={23}/>
                        <h4 className='text-lg'>Chọn tập phim :</h4>
                    </div>
                    <ul className='flex gap-3 flex-wrap '>
                        {
                            Array.from(Array(episodeData["episodes"][0]["server_data"].length).keys()).map(index => (
                                <li 
                                    key={index} 
                                    className='py-2 px-3 border-[1px] border-neutral-600 rounded-xl text-sm cursor-pointer hover:bg-red-500 transition duration-300 ease-linear'
                                >
                                    Tập {index + 1}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <MovieGroup movieGroupName="Recommend"/>
        </>
    );
}
 
export default MovieWatch;