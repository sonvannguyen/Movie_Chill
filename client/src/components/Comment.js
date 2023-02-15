import {GoVerified} from 'react-icons/go'
import {MdClear} from 'react-icons/md'
import moment from 'moment';

const Comment = ({commentData, handleOpenModal}) => {
    const commentId = commentData?._id
    const userId = localStorage.getItem('movie_userId')
    
    const onClickDeleteComment = () => {
        handleOpenModal(commentId)
    }
    return (
        <div>
            <div className="bg-[#3f3f46ad] inline-block rounded-xl mt-4 relative">
                <div className="flex pl-6 pr-12 py-3 gap-6 max-w-[570px] overflow-hidden">
                    <img 
                        className="w-12 h-12 object-cover rounded-full"
                        src={commentData?.userComment?.avatar} 
                        alt="avatar"
                    />
                    <div>
                        <div className='flex gap-1 items-center'>
                            <span className="font-bold text-gray-200 text-lg">
                                {commentData?.userComment?.username}
                            </span>

                            {
                                (commentData?.userComment?._id === "63eca9fea099b1e86a2b748a") &&
                                <GoVerified className='ml-1 text-red-400' size={15}/>
                            }

                            <span className="italic text-xs ml-3 text-zinc-400">
                                {moment(commentData?.createAt).format('MMMM Do , h:mm a')}
                            </span>

                        </div>
                        <p className="text-[#ffffffa1] mt-1">{commentData?.commentContent}</p>
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