import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import { CiSettings, CiUser } from "react-icons/ci";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import userApi from "../services/userApi";

const User = () => {
  // const refUsername = useRef(null);
  // const navigate = useNavigate();
  // const username = localStorage.getItem("username");
  // const userId = localStorage.getItem("movie_userId");
  // const accessToken = localStorage.getItem("movie_access_token");

  // const { data: userInfo, refetch } = useQuery(
  //   ["userInfo", userId],
  //   () => userApi.getUserById(userId),
  //   {
  //     enabled: false,
  //   }
  // );

  // useEffect(() => {
  //   if (userId && accessToken) {
  //     refetch();
  //   }
  // }, []);


  return (
    <div className="md:grid lg:grid-cols-5 lg:gap-6 md:grid-cols-4">
      <div className="hidden bg:block md:block col-start-1 col-end-2 h-screen">
        <Sidebar />
      </div>
      <div className="md:col-start-2 md:col-span-3 md:overflow-y-scroll md:no-scrollbar h-screen">
        <Header />

        <div className="px-5 md:px-6 lg:px-0 flex justify-between items-end">
          <h4 className="hidden lg:inline-block text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">
            Chỉnh sửa thông tin cá nhân
          </h4>
        </div>

        <div className="w-[500px]">
          <UploadImage/>
          {/* <div>
            <h3 className="my-3 text-lg">Username: </h3>

            <input
              type="text"
              ref={refUsername}
              defaultValue={username}
              className="bg-zinc-800 w-full outline-none py-3 pl-5 rounded-2xl placeholder-gray-400 placeholder-opacity-75"
            />
          </div>

          <div>
            <h3 className="my-3 text-lg">Avatar: </h3>
            <UploadImage
              avatarDefault={userInfo?.user?.avatar}
              username={refUsername?.current?.value ?? username}
            />
          </div> */}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-1">
        <SidebarSuggestions />
      </div>
    </div>
  );
};

export default User;
