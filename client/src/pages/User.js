import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import UploadImage from "../components/UploadImage";

const User = () => {
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
          <UploadImage />
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-1">
        <SidebarSuggestions />
      </div>
    </div>
  );
};

export default User;
