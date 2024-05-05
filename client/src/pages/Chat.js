import { useQuery } from "react-query";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BsSearch } from "react-icons/bs";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SidebarSuggestions from "../components/SidebarSuggestions";
import film_animation from "../assets/images/film_animation.gif";
import movieApi from "../services/movieApi";
import MovieItem from "../components/MovieItem";
import socketIOClient from "socket.io-client";
import moment from "moment";
const host = "http://localhost:5000";

const SearchMovie = () => {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [totalUserActive, setTotalUserActive] = useState(0);
  const userId = localStorage.getItem("movie_userId");

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("getId", (data) => {
      setId(data);
    });

    socketRef.current.on("sendDataServer", (data) => {
      console.log(data);
      setMess(data.chatsHistory);
      scrollToBottom();
    });

    socketRef.current.on("userActive", (data) => {
      setTotalUserActive(data.totalUserActive);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        userId: userId,
        content: message,
        id: id,
      };
      socketRef.current.emit("sendDataClient", msg);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  //   const renderMess = mess.map((m, index) => (
  //     <div
  //       key={index}
  //       className={`${
  //         m.userId._id === userId ? "your-message" : "other-people"
  //       } chat-item`}
  //     >
  //       {m.message}
  //     </div>
  //   ));

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      sendMessage();
    }
  };

  return (
    <div className="grid lg:grid-cols-5 lg:gap-6 md:grid-cols-4">
      <div className="hidden bg:block md:block col-start-1 col-end-2 h-screen">
        <Sidebar />
      </div>
      <div className="md:col-start-2 md:col-span-3 md:overflow-y-scroll md:no-scrollbar h-screen">
        <Header />

        <div className="px-5 md:px-6 lg:px-0">
          <h2 className="inline-block lg:ml-0 text-2xl md:text-3xl font-bold pb-3 mb-6 mt-8 border-b-[1px] border-red-400">
            Chat room - Online: {totalUserActive}
          </h2>
        </div>

        <div className="box-chat">
          <div className="box-chat_message">
            {mess.map((m, index) => (
              <div
                key={index}
                className={`${
                  m.userId._id === userId ? "your-message" : "other-people"
                } chat-item`}
              >
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <img
                      src={m.userId.avatar}
                      className="w-[30px] h-[30px] rounded-full"
                    />
                    <h3 className="text-sm">{m.userId.username}</h3>
                  </div>

                  <h3 className="italic text-[10px] text-gray-100">{moment(m?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</h3>
                </div>
                <div className="mt-1 ml-2">{m.message}</div>
              </div>
            ))}

            <div
              style={{ float: "left", clear: "both" }}
              ref={messagesEnd}
            ></div>
          </div>

          <div className="send-box">
            <textarea
              value={message}
              onKeyDown={onEnterPress}
              onChange={handleChange}
              placeholder="Nhập tin nhắn ..."
              className="text-black p-2"
            />
            <button className="btn-send-message" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <SidebarSuggestions />
      </div>
    </div>
  );
};

export default SearchMovie;
