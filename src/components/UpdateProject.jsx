import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store/Index'
import { updateProject } from '../services/blockchain'
import { toast } from 'react-toastify'

const UpdateProject = ({ project }) => {

    const [updateModal] = useGlobalState('updateModal')

    const [title, setTitle] = useState(project?.title)
    const [description, setDescription] = useState(project?.description)
    const [date, setDate] = useState(project?.date)
    const [imageURL, setImageURL] = useState(project?.imageURL)
    
    const toTimeStamp = (dateStr) => {
        const dateObj = Date.parse(dateStr)
        return dateObj/1000
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title || !description || !date || !imageURL)
        {
            return 
        }
        
        const params = {
            id: project?.id,
            title,
            description,
            expiresAt: toTimeStamp(date),
            imageURL,
        }

        await updateProject(params)
        toast.success('Project updated successfully, will reflect under a minute.')
        onClose()
    }

    const onClose = () => {
        setGlobalState('updateModal', 'scale-0')
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen 
        flex justify-center items-center bg-black bg-opacity-50 
        transform transition-transform duration-300 ${updateModal}`}>
        <div className='bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className="flex justify-between items-center">
                    <p className='font-semibold'>Edit Post</p>
                    <button type='button' className='border-0 bg-transparent focus:outline-none' 
                        onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className='flex justify-center items-center mt-5'>
                    <div className='rounded-xl overflow-hidden h-20 w-20'>
                    
                        <img src={imageURL || "https://intigate.co.in/wp-content/uploads/2021/07/healthcare.jpg"} 
                        alt="project title" className='h-full w-full object-cover cursor-pointer'/>

                    </div>
                </div>

                <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                    <input className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0' 
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required    
                    />
                </div>

                <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                    <input className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0' 
                        type='date'
                        name='date'
                        placeholder='Expires'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required    
                    />
                </div>

                <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                    <input className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0' 
                        type='url'
                        name='imageURL'
                        placeholder='Image URL'
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        required    
                    />
                </div>

                <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                    <textarea className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0' 
                        type='text'
                        name='description'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required    
                    ></textarea>
                </div>

                <button type='submit' className='inline-block px-6 py-2.5 
                    bg-green-600 text-white font-medium text-md leading-tight 
                    rounded-full shadow-md hover:bg-green-700 mt-5'>
                    Update Post
                </button>
            </form>
        </div>
    </div>
  )
}

export default UpdateProject