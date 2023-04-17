import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store/Index'
import { toast } from 'react-toastify'
import { refundProject } from '../services/blockchain'

const RefundProject = ({ project }) => {
    const [refundModal] = useGlobalState('refundModal')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await refundProject(project?.id)
        toast.success('Project refunded successfully, will reflect under a minute.')
        setGlobalState('refundModal', 'scale-0')
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen 
        flex justify-center items-center bg-black bg-opacity-50 
        transform transition-transform duration-300 ${refundModal}`}>
        <div className='bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className="flex justify-between items-center">
                    <p className='font-semibold'>{project?.title}</p>
                    <button type='button' className='border-0 bg-transparent focus:outline-none' 
                        onClick={() => setGlobalState('refundModal', 'scale-0')}>
                        <FaTimes />
                    </button>
                </div>

                <div className='flex justify-center items-center mt-5'>
                    <div className='rounded-xl overflow-hidden h-20 w-20'>
                    
                        <img src={project?.imageURL || "https://intigate.co.in/wp-content/uploads/2021/07/healthcare.jpg"} 
                        alt={project?.title} className='h-full w-full object-cover cursor-pointer'/>

                    </div>
                </div>

                <button type='submit' className='inline-block px-6 py-2.5 
                    bg-green-600 text-white font-medium text-md leading-tight 
                    rounded-full shadow-md hover:bg-green-700 mt-5'>
                    Refund to Donors
                </button>
            </form>
        </div>
    </div>
  )
}

export default RefundProject