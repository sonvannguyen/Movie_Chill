import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useQuery, useMutation } from "react-query";
import cloudinaryUpload from "../services/upload";
import userApi from "../services/userApi";
import { ToastContainer, toast } from "react-toastify";

const optionToast = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const UploadImage = () => {
  const refUsername = useRef(null);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("movie_userId");
  const accessToken = localStorage.getItem("movie_access_token");

  const { data: userInfo, refetch: refetchGetUserInfo } = useQuery(
    ["userInfo", userId],
    () => userApi.getUserById(userId),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (userId && accessToken) {
      refetchGetUserInfo();
    }
  }, []);

  const [fileUrl, setFileUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    return () => {
      fileUrl && URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  // handle update info
  const updateInfo = useMutation(userApi.updateUserInfo, {
    onSuccess: () => {
      localStorage.setItem("username", refUsername.current.value);
      refetchGetUserInfo();
      toast.success("Cập nhật thông tin thành công.", optionToast);
      setIsLoading(false);
    },
    onError: (error) => alert(error),
  });

  const handleSubmitUpload = async () => {
    try {
      let urlImageCloud;
      setIsLoading(true);
      if (fileUrl) {
        urlImageCloud = await cloudinaryUpload({
          image_url: fileUrl,
        });
      }

      updateInfo.mutate({
        userId: userId,
        username: refUsername.current.value,
        avatar: urlImageCloud ?? userInfo?.user?.avatar,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
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

        <div className="uploadImage">
          <div className="uploadImage__content">
            {fileUrl ? (
              <img
                className="uploadImage__image w-[200px] h-[200px] rounded-full object-cover"
                src={fileUrl}
                alt=""
              />
            ) : (
              <img
                className="uploadImage__image w-[200px] h-[200px] rounded-full object-cover"
                src={userInfo?.user?.avatar}
                alt=""
              />
            )}
            <input
              className="uploadImage__input mt-5"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleUploadImage}
            />
          </div>
          <div className="flex gap-7 items-center">
            <button
              onClick={handleSubmitUpload}
              className="mt-6 px-3 py-1 md:px-3 md:text-lg rounded-xl border-[1px] border-[rgba(255,255,255,0.27)] hover:bg-red-500"
            >
              Update
            </button>

            {isLoading && (
              <img
                src="https://i.gifer.com/ZKZg.gif"
                className="mt-4 w-[50px] h-[50px]"
              />
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UploadImage;
