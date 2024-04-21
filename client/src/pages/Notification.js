import { useEffect } from "react";
import { useQuery } from "react-query";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import { CiSettings, CiUser } from "react-icons/ci";
import notificationApi from "../services/notificationApi";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("movie_userId");
  const accessToken = localStorage.getItem("movie_access_token");

  const { data: notiData, refetch } = useQuery(
    ["notification", userId],
    () => notificationApi.getNotification(userId, "byUser"),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (userId && accessToken) {
      refetch();
    }
  }, []);

  const handleGoToWatch = (urlMovie) => {
    console.log({ urlMovie });
    if (urlMovie) {
      navigate(urlMovie);
    }
  };

  return (
    <div className="md:grid lg:grid-cols-5 lg:gap-6 md:grid-cols-4">
      <div className="hidden bg:block md:block col-start-1 col-end-2 h-screen">
        <Sidebar />
      </div>
      <div className="md:col-start-2 md:col-span-3 md:overflow-y-scroll md:no-scrollbar h-screen">
        <Header />

        <div className="px-5 md:px-6 lg:px-0 flex justify-between items-end">
          <h4 className="hidden lg:inline-block text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">
            {`Thông báo ( ${notiData?.length ?? 0} )`}
          </h4>
        </div>

        <div>
          {notiData &&
            notiData?.map((noti) => (
              <div
                className="flex items-center gap-3 bg-[#373737] p-3 rounded-2xl mb-5 cursor-pointer"
                onClick={() => handleGoToWatch(noti.notificationId.urlMovie)}
              >
                <div>
                  {noti.notificationId.type == "ALL" ? (
                    <CiSettings size="50" className="text-red-400 " />
                  ) : (
                    <CiUser size="50" className="text-red-400 " />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-8">
                    <h4 className="text-2xl mb-2 font-bold">
                      {noti.notificationId.type == "ALL"
                        ? "Thông báo hệ thống"
                        : "Thông báo user"}
                    </h4>
                    <span className="italic text-sm">
                      {" "}
                      {moment(noti?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                  </div>

                  {noti.notificationId.type == "ALL" ? (
                    <h4 className="text-lg">{noti.notificationId.content}</h4>
                  ) : (
                    <h4 className="text-lg hover:text-red-400">
                      {noti.notificationId.content}
                    </h4>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* <div className="px-5 md:px-6 lg:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-7">
          {moviesData &&
            moviesData?.map((movie) => (
              <MovieItem
                key={movie._id}
                inPageEdit="true"
                movieData={movie}
                handleOpenModalDeleteAMovie={handleOpenModalDeleteAMovie}
              />
            ))}
        </div>

        {moviesData?.length === 0 && (
          <div className="flex flex-col w-full mx-auto items-center min-h-[260px]">
            <img
              className="w-40 md:w-60 object-cover"
              src={icon_addmovie}
              alt="icon"
            />
            <p className="text-center md:text-lg italic text-gray-400 mt-[-10px]">
              Bạn chưa xem phim nào.
              <br /> Hãy trải nghiệm ngay với Movie Chill nhé !
            </p>
          </div>
        )}

        {moviesData?.length > 0 && <Footer />} */}
      </div>
      <div className="hidden lg:block lg:col-span-1">
        <SidebarSuggestions />
      </div>
    </div>
  );
};

export default Notification;
