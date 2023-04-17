import React from 'react'
import {FaTimes} from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store/Index'
import { deleteProject } from '../services/blockchain'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DeleteProject = ({ project }) => {

    const [deleteModal] = useGlobalState('deleteModal')
    const nav = useNavigate()

    const handleSubmit = async () => {

        await deleteProject(project?.id)
        toast.success('Project deleted successfully, will reflect under a minute.')
        setGlobalState('deleteModal', 'scale-0')
        nav('/')
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen 
        flex justify-center items-center bg-black bg-opacity-50 
        transform transition-transform duration-300 ${deleteModal}`}>
        <div className='bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <div className='flex flex-col'>
                <div className="flex justify-between items-center">
                    <p className='font-semibold'>{project?.title}</p>
                    <button type='button' className='border-0 bg-transparent focus:outline-none' 
                        onClick={() => setGlobalState('deleteModal', 'scale-0')}>
                        <FaTimes />
                    </button>
                </div>

                <div className='flex justify-center items-center mt-5'>
                    <div className='rounded-xl overflow-hidden h-20 w-20'>
                    
                        <img src={project?.imageURL || "https://intigate.co.in/wp-content/uploads/2021/07/healthcare.jpg"} 
                        alt={project?.title} className='h-full w-full object-cover cursor-pointer'/>

                    </div>
                </div>

                <div className='flex flex-col justify-center items-center rounded-xl mt-5'>
                    <p>Are you sure?</p>
                    <small className='text-red-500'>This is irreversible.</small>
                </div>

                <button className='inline-block px-6 py-2.5 
                    bg-red-600 text-white font-medium text-md leading-tight 
                    rounded-full shadow-md hover:bg-red-700 mt-5'
                    onClick={handleSubmit}>
                    Delete Post
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteProject