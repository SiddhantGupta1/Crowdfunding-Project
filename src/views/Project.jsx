import React, { useEffect, useState } from 'react'
import ProjectDetails from '../components/ProjectDetails'
import ProjectBackers from '../components/ProjectBackers'
import UpdateProject from '../components/UpdateProject'
import BackProject from '../components/BackProject'
import DeleteProject from '../components/DeleteProject'
import RefundProject from '../components/RefundProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../store/Index'

const Project = () => {

  const {id} = useParams()
  const [loaded, setLoaded] = useState(false)
  const project = useGlobalState('project')
  const backers = useGlobalState('backers')

  useEffect(async () => {
    await loadProject(id)
    await getBackers(id)
    setLoaded(true)
  }, [])

  return loaded ? (
    <>
      <ProjectDetails project={project[0]} />
      <ProjectBackers backers={backers[0]} />
      <UpdateProject project={project[0]} />
      <BackProject project={project[0]} />
      <DeleteProject project={project[0]} />
      <RefundProject project={project[0]}/>
    </>
  ) : null
}

export default Project