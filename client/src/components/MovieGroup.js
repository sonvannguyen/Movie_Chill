import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import MovieItem from "./MovieItem";

const moviesData = [
    {
        "_id": "63db8d255b0da6505dabb0ac",
        "name": "Avatar 2: Dòng Chảy Của Nước",
        "origin_name": "Avatar 2",
        "thumb_url": "https://img.hiephanhthienha.com/uploads/movies/avatar-2-dong-chay-cua-nuoc-thumb.jpg",
        "poster_url": "https://img.hiephanhthienha.com/uploads/movies/avatar-2-dong-chay-cua-nuoc-poster.jpg",
        "type": "single",
        "slug": "avatar-2-dong-chay-cua-nuoc",
        "year": 2022,
        "country": "Âu Mỹ",
        "content": "<p>Sau avatar 1 Hai nhân vật chính, Jake Sully và Neytiri, giờ đã thành đôi, nguyện sẽ ở bên nhau. Tuy nhiên, cả hai buộc phải rời khỏi nhà và khám phá những miền đất mới trên mặt trăng Pandora, cũng chính là lúc những mối nguy cũ trở lại với họ.</p>",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Hành Động"
        ],
        "__v": 0
        },
        {
        "_id": "63976201a9e12de2f72fad36",
        "name": "Chiến Binh Báo Đen 2: Wakanda Bất Diệt",
        "origin_name": "Black Panther 2: Wakanda Forever",
        "thumb_url": "http://img.ophim1.cc/uploads/movies/chien-binh-bao-den-2-wakanda-bat-diet-thumb.jpg",
        "poster_url": "http://img.ophim1.cc/uploads/movies/chien-binh-bao-den-2-wakanda-bat-diet-poster.jpg",
        "type": "single",
        "slug": "chien-binh-bao-den-2-wakanda-bat-diet",
        "year": 2022,
        "country": "Âu Mỹ",
        "content": "Black Panther: Wakanda Forever của Marvel Studios sẽ tiếp tục khám phá thế giới có một không hai của Wakanda và tất cả các nhân vật phong phú và đa dạng đã được giới thiệu trong phần phim đầu tiên",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Hành Động",
        "Viễn Tưởng"
        ],
        "__v": 0
        },
        {
        "_id": "63976201a9e12de2f72faca6",
        "name": "Cậu Út Nhà Tài Phiệt",
        "origin_name": "Reborn Rich",
        "thumb_url": "http://img.ophim1.cc/uploads/movies/cau-ut-nha-tai-phiet-thumb.jpg",
        "poster_url": "http://img.ophim1.cc/uploads/movies/cau-ut-nha-tai-phiet-poster.jpg",
        "type": "series",
        "slug": "cau-ut-nha-tai-phiet",
        "year": 2022,
        "country": "Hàn Quốc",
        "content": "Được chuyển thể từ tiểu thuyết The Youngest Son of a Conglomerate, xoay quanh nhân vật Yoon Hyun Woo (Song Joong Ki), một thư ký của Tập đoàn Sunyang. Hyun Woo là một nhân viên trung thành, nhưng lại nhận kết cục thảm khốc bởi chính gia đình mà anh \"cúc cung tận tuỵ\". Sau khi chết thảm, Yoon Hyun Woo sống lại một lần nữa dưới thân xác Jin Do Joon, con trai út của gia đình Sunyang Group. Mang hình hài của Jin Do Joon, Yoon Hyun Woo làm việc tiếp quản công ty cũng như bắt đầu màn trả thù của mình.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Tâm Lý"
        ],
        "__v": 0
        },
        {
        "_id": "63976201a9e12de2f72fad20",
        "name": "Wednesday",
        "origin_name": "Wednesday",
        "thumb_url": "http://img.ophim1.cc/uploads/movies/wednesday-thumb.jpg",
        "poster_url": "http://img.ophim1.cc/uploads/movies/wednesday-poster.jpg",
        "type": "series",
        "slug": "wednesday",
        "year": 2022,
        "country": "Âu Mỹ",
        "content": "Thông minh, hay châm chọc và \"chết trong lòng\" một chút, Wednesday Addams điều tra một vụ giết người liên hoàn trong khi có thêm bạn và cả kẻ thù mới ở Học viện Nevermore.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Bí ẩn"
        ],
        "__v": 0
        },
        {
        "_id": "63db917a5b0da6505dabb0d8",
        "name": "Thời Gian Và Anh, Vừa Hay Đúng Lúc",
        "origin_name": "Time and Him are Just Right",
        "thumb_url": "https://img.hiephanhthienha.com/uploads/movies/thoi-gian-va-anh-vua-hay-dung-luc-thumb.jpg",
        "poster_url": "https://img.hiephanhthienha.com/uploads/movies/thoi-gian-va-anh-vua-hay-dung-luc-poster.jpg",
        "type": "series",
        "slug": "thoi-gian-va-anh-vua-hay-dung-luc",
        "year": 2022,
        "country": "Trung Quốc",
        "content": "Bộ phim là câu chuyện về cô thiếu nữ Lâm Tích bướng bỉnh đáng yêu cố ý tiếp cận thánh học giỏi nham hiểm Quý Quân Hành. Từ \\\"theo đuôi\\\" rồi dần trở thành bạn bè, hai người nảy sinh tình cảm với nhau, cùng nhau trưởng thành. Trong khoảng thời gian ấy, họ không những có thêm nhiều người bạn tốt mà còn thực hiện được ước mơ của chính mình, thể hiện giá trị bản thân trong cuộc sống.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Tình Cảm"
        ],
        "__v": 0
        },
        {
        "_id": "63dbec72ab1bc006e8b2def0",
        "name": "Hòn Đảo Ma Quái",
        "origin_name": "Island",
        "thumb_url": "https://img.hiephanhthienha.com/uploads/movies/hon-dao-ma-quai-thumb.jpg",
        "poster_url": "https://img.hiephanhthienha.com/uploads/movies/hon-dao-ma-quai-poster.jpg",
        "type": "series",
        "slug": "hon-dao-ma-quai",
        "year": 2022,
        "country": "Hàn Quốc",
        "content": "Won Mi Ho là con gái duy nhất của cha cô, người điều hành tập đoàn Daehan. Thái độ kiêu ngạo và ích kỷ của cô đã khiến cô mắc phải một sai lầm lớn khiến cha cô tức giận và trục xuất cô đến đảo Jeju. Ở đó, cô được phân công làm giáo viên đạo đức trung học. Cô ấy không hề hay biết, hòn đảo là nơi ác quỷ lang thang tự do. Cô gặp những cá nhân khác trên đảo và cùng nhau, các nhân vật hợp lực để sống.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Hành Động",
        " Viễn Tưởng",
        " Phiêu Lưu"
        ],
        "__v": 0
        },
        {
        "_id": "639f2378071977bc51e94506",
        "name": "Mùa hè yêu dấu của chúng ta",
        "origin_name": "Our Beloved Summer",
        "thumb_url": "http://img.ophim1.cc/uploads/movies/mua-he-yeu-dau-cua-chung-ta-thumb.jpg",
        "poster_url": "http://img.ophim1.cc/uploads/movies/mua-he-yeu-dau-cua-chung-ta-thumb.jpg",
        "type": "series",
        "slug": "mua-he-yeu-dau-cua-chung-ta",
        "year": 2021,
        "country": "Hàn Quốc",
        "content": "Nhiều năm sau khi quay một bộ phim tài liệu đình đám ở trường cấp ba, hai người yêu cũ hay cãi vã nay bị kéo đến trước ống kính cùng nhau – và lại vướng vào nhau.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Tình Cảm"
        ],
        "__v": 0
        },
        {
        "_id": "63dbf038167ecf108da766da",
        "name": "Huyền thoại Vikings: Valhalla (Phần 2)",
        "origin_name": "Vikings: Valhalla (Season 2)",
        "thumb_url": "https://img.hiephanhthienha.com/uploads/movies/huyen-thoai-vikings-valhalla-phan-2-thumb.jpg",
        "poster_url": "https://img.hiephanhthienha.com/uploads/movies/huyen-thoai-vikings-valhalla-phan-2-poster.jpg",
        "type": "series",
        "slug": "huyen-thoai-vikings-valhalla-phan-2",
        "year": 2023,
        "country": "Âu Mỹ",
        "content": "Kẻ thù cả cũ lẫn mới đang chờ đợi Freydis, Leif và Harald khi họ phân tán đến những nơi xa xôi trên thế giới để theo đuổi quyền lực và chinh phục những thế giới mới.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Hành Động",
        " Chính Kịch",
        " Phiêu Lưu"
        ],
        "__v": 0
        },
        {
        "_id": "63dbf237167ecf108da766de",
        "name": "Thợ săn quái vật: Dòng máu khởi nguồn",
        "origin_name": "The Witcher: Blood Origin",
        "thumb_url": "https://img.hiephanhthienha.com/uploads/movies/tho-san-quai-vat-dong-mau-khoi-nguon-thumb.jpg",
        "poster_url": "https://img.hiephanhthienha.com/uploads/movies/tho-san-quai-vat-dong-mau-khoi-nguon-poster.jpg",
        "type": "series",
        "slug": "tho-san-quai-vat-dong-mau-khoi-nguon",
        "year": 2022,
        "country": "Âu Mỹ",
        "content": "Hơn một nghìn năm trước các sự kiện của  \"Thợ săn quái vật\", bảy kẻ bị ruồng bỏ ở thế giới yêu tinh hợp lực trong nhiệm vụ chống lại một đế chế toàn năng.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Hành Động",
        " Chính Kịch",
        " Phiêu Lưu"
        ],
        "__v": 0
        },
        {
        "_id": "63dbf42c167ecf108da766e4",
        "name": "Người Sói Tuổi Teen (Điện Ảnh)",
        "origin_name": "Teen Wolf: The Movie",
        "thumb_url": "https://img.hiephanhthienha.com/uploads/movies/nguoi-soi-tuoi-teen-dien-anh-thumb.jpg",
        "poster_url": "https://img.hiephanhthienha.com/uploads/movies/nguoi-soi-tuoi-teen-dien-anh-poster.jpg",
        "type": "single",
        "slug": "nguoi-soi-tuoi-teen-dien-anh",
        "year": 2023,
        "country": "Âu Mỹ",
        "content": "Trăng tròn mọc ở Beacon Hills, và cùng với đó là một ác quỷ đáng sợ đã xuất hiện. Những con sói lại hú lên, kêu gọi sự trở lại của Banshees, Werecoyotes, Hellhounds, Kitsunes và mọi kẻ biến hình khác trong đêm. Nhưng chỉ một người sói như Scott McCall, không còn là một thiếu niên nhưng vẫn là một Alpha, mới có thể tập hợp cả hai đồng minh mới và đoàn tụ những người bạn đáng tin cậy để chống lại kẻ thù có thể là mạnh nhất và nguy hiểm nhất mà họ từng đối mặt.",
        "quality": "HD",
        "lang": "Vietsub",
        "category": [
        "Hành Động",
        " Viễn Tưởng"
        ],
        "__v": 0
        }
]
const MovieGroup = ({movieGroupName, icon}) => {
    return ( 
        <div className="mb-4">
            <div className="flex gap-3 items-center">
                <div>{icon}</div>
                <h2 className="inline-block text-2xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">{movieGroupName}</h2>
            </div>
            <div>
                <Swiper 
                    navigation={true} 
                    modules={[Navigation]} 
                    slidesPerView={4.5}
                    spaceBetween={10}
                >
                    {
                        moviesData.map(movie => (
                            <SwiperSlide key={movie._id}>
                                <MovieItem movieData={movie}/>
                            </SwiperSlide>
                        ))
                    }
                    
                </Swiper>
            </div>
        </div>
     );
}
 
export default MovieGroup;