import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import CreateProject from '../components/CreateProject'
import AddButton from '../components/AddButton'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store/Index'

const Home = () => {

  const [projects] = useGlobalState('projects')

  useEffect( async () => {
    await loadProjects()
  }, [])

  return (
    <>
        <Hero />
        <Projects projects={projects} />
        <div className="flex justify-center items-center my-5">
            <button type='button' className='inline-block px-6 py-2.5 
                bg-green-600 text-white font-medium text-xs leading-tight 
                uppercase rounded-full shadow-md hover:bg-green-700'>
                Load more
            </button>
        </div>
        <CreateProject />
        <AddButton />
    </>
  )
}

export default Home