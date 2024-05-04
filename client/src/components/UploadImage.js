import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useQuery } from "react-query";
import cloudinaryUpload from "../services/upload";
import userApi from "../services/userApi";

const UploadImage = () => {
  const refUsername = useRef(null);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("movie_userId");
  const accessToken = localStorage.getItem("movie_access_token");

  const { data: userInfo, refetch } = useQuery(
    ["userInfo", userId],
    () => userApi.getUserById(userId),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (userId && accessToken) {
      refetch();
    }
  }, []);

  const [fileUrl, setFileUrl] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  const handleUploadImage = async (e) => {
    if (e.target.files[0]) {
      const uploadData = new FormData();
      uploadData.append("file", e.target.files[0], "file");
      setFileUpload(uploadData);

      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  useEffect(() => {
    return () => {
      fileUrl && URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handleSubmitUpload = async () => {
    if (fileUpload) {
      const urlImageCloud = await cloudinaryUpload(fileUpload);
      console.log({
        fileUpload: fileUpload,
        username: refUsername.current.value,
        avatar: urlImageCloud,
      });
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
                className="uploadImage__image w-[200px] h-[200px] rounded-full"
                src={fileUrl}
                alt=""
              />
            ) : (
              <img
                className="uploadImage__image w-[200px] h-[200px] rounded-full"
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
          <button
            onClick={handleSubmitUpload}
            className="mt-6 px-3 py-1 md:px-3 md:text-lg rounded-xl border-[1px] border-[rgba(255,255,255,0.27)] hover:bg-red-500"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
