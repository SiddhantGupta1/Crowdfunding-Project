import React from 'react'
import { setGlobalState } from '../store/Index'
import { BsPlusLg } from 'react-icons/bs'

const AddButton = () => {
  return (
    <div className='fixed right-10 bottom-10 flex space-x-2 justify-center'>
        <button type='button' className='flex justify-center items-center w-10 h-10
            bg-green-600 text-white rounded-full shadow-md hover:bg-green-700' 
            onClick={() => setGlobalState('createModal', 'scale-100')}>
          <BsPlusLg className='' size={25} />
        </button>
    </div>
  )
}

export default AddButton