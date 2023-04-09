import React, { useEffect, useState } from 'react'
import ProjectDetails from '../components/ProjectDetails'
import ProjectBackers from '../components/ProjectBackers'
import UpdateProject from '../components/UpdateProject'
import BackProject from '../components/BackProject'
import DeleteProject from '../components/DeleteProject'
import { loadProject } from '../services/blockchain'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../store/Index'

const Project = () => {

  const {id} = useParams()
  const [loaded, setLoaded] = useState(false)
  const project = useGlobalState('project')

  useEffect(async () => {
    await loadProject(id)
    setLoaded(true)
  }, [])

  return loaded ? (
    <>
      <ProjectDetails project={project[0]} />
      <ProjectBackers />
      <UpdateProject project={project[0]} />
      <BackProject project={project[0]} />
      <DeleteProject project={project[0]} />
    </>
  ) : null
}

export default Project