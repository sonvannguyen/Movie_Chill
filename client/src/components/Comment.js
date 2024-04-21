import {GoVerified} from 'react-icons/go'
import {MdClear} from 'react-icons/md'
import { MdOutlineReportProblem } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import moment from 'moment';
import { useState } from 'react';
import { useMutation } from 'react-query';
import userApi from '../services/userApi';

const Comment = ({commentData, handleOpenModal}) => {
    const commentId = commentData?._id
    const userId = localStorage.getItem('movie_userId')
    const accessToken = localStorage.getItem('movie_access_token')
    const [ totalReport, setTotalReport] = useState(commentData?.totalReport)
    
    const reportComment = useMutation(
        userApi.reportComment,
    )

    const onClickDeleteComment = () => {
        handleOpenModal(commentId)
    }
    const handleReport = () => {
        setTotalReport(totalReport + 1)
        commentData?.usersReport.push(userId)
        reportComment.mutate({commentId: commentId, userReport: userId})
    }
    return (
        <div>
            <div className="bg-[#3f3f46ad] inline-block rounded-xl mt-4 relative">
                <div className="flex md:pl-6 md:pr-12 px-2 py-3 gap-2 md:gap-6 md:max-w-[570px] overflow-hidden">
                    <img  
                        className="w-12 h-12 object-cover rounded-full"
                        src={commentData?.userComment?.avatar} 
                        alt="avatar"
                    />
                    <div>
                        <div className='md:flex md:gap-1 md:items-center'>
                            <span className="flex font-bold text-gray-200 md:text-lg">
                                {commentData?.userComment?.username}
                                {
                                    (commentData?.userComment?._id === "63eca9fea099b1e86a2b748a") &&
                                    <GoVerified className='md:hidden ml-1 text-red-400' size={15}/>
                                }
                            </span>

                            {
                                (commentData?.userComment?._id === "63eca9fea099b1e86a2b748a") &&
                                <GoVerified className='hidden md:block ml-1 text-red-400' size={15}/>
                            }

                            <span className="italic text-xs ml-3 text-zinc-400">
                                {moment(commentData?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                            </span>

                        </div>
                        <p className="text-sm md:text-base text-[#ffffffa1] mt-1">{commentData?.commentContent}</p>

                        <div className='border-t border-[rgba(255,255,255,0.27)] mt-3 text-sm text-slate-300 italic flex items-center justify-between'>
                            <div className='flex items-center gap-1 mt-1'>
                                <MdOutlineReportProblem/>
                                <span>{ `Total report: ${totalReport}`}</span>
                            </div>

                            {
                                (userId !== commentData?.userComment?._id) && !commentData?.usersReport?.includes(userId) && accessToken &&
                                <div className='flex items-center gap-1 mt-1'>
                                    <BiDislike />
                                    <button className="cursor-pointer hover:text-red-400" onClick={handleReport}>Report</button>
                                </div>
                            }

                            {
                                (userId !== commentData?.userComment?._id) && commentData?.usersReport?.includes(userId) && accessToken &&
                                <div className='flex items-center gap-1 mt-1'>
                                    <BiDislike />
                                    <h3>Reported</h3>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {
                    (userId == commentData?.userComment?._id) &&
                    <div 
                        onClick={onClickDeleteComment}
                        className=' hover:bg-red-400 p-2 rounded-full cursor-pointer absolute top-1 right-1 '
                    >
                        <MdClear/>
                    </div>
                }
            </div>
        </div>
    );
}
export default Comment;