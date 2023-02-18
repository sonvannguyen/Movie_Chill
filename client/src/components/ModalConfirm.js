import {IoMdClose} from 'react-icons/io'

const ModalConfirm = ({onConfirm, handleCloseModal, message}) => {

  const handleOnCancel = () => {
    handleCloseModal()
  }
  const handleOnConfirm = () => {
    onConfirm()
  }
  return (
    <div className="fixed z-[9999] top-[160px] md:bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-zinc-700 opacity-75"></div>
      </div>
      <div className="open-modal bg-white md:w-[420px] rounded-lg px-8 pt-8 pb-6 overflow-hidden shadow-xl transform transition-all">
        <div 
          onClick={handleOnCancel}
          className='hover:bg-gray-300 cursor-pointer inline-block p-1 rounded-full absolute right-2 top-2'
        >
          <IoMdClose size={30} className='text-zinc-800'/>
        </div>
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {message}
          </h3>
        </div>
        <div className="flex gap-7 mt-5 sm:mt-6">
            <button
              onClick={handleOnCancel}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-300 text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Hủy
            </button>
            <button
              onClick={handleOnConfirm}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Xác nhận
            </button>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirm;
