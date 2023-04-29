import abi from '../abis/src/contracts/Genesis.sol/Genesis.json'
import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store/Index'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi

const connectWallet = async () => {
    try{
        if(!ethereum) return alert('Please install metamask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } catch(err){
        reportError(err)
    }
}

const reportError = (err) => {
    console.log(err.message)
    throw new Error('No ethereum object.')
}

const isWallectConnected = async () => {
    try{
      if(!ethereum) return alert('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
  
      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        await isWallectConnected()
      })
  
      if(accounts.length)
      {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      }
      else
      {
        alert('Please connect wallet.')
        console.log('No accounts found.')
      }
    } catch(error){
      reportError(error)
    }
}

const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if(connectedAccount)
  {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    return contract
  }
  else
  {
    return getGlobalState('contract')
  }
}

const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiresAt,
}) => {
  try{
    if(!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    cost = ethers.utils.parseEther(cost)
    await contract.createProject(title, description, imageURL, cost, expiresAt)

    // const connectedAccount = getGlobalState('connectedAccount')
    // const num = ethers.utils.parseEther("0.1")
    // await contract.takeFee(num)
    // console.log("HELLO ",connectedAccount)
    
  } catch(err){
    reportError(err)
  }
}

const updateProject = async ({
  id,
  title,
  description,
  imageURL,
  expiresAt,
}) => {
  try{
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    await contract.updateProject(id, title, description, imageURL, expiresAt)
  } catch(err){
    reportError(err)
  }
}

const deleteProject = async (id) => {
  try{
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEtheriumContract()
    await contract.deleteProject(id)
  } catch(err){
    reportError(err)
  }
}

const backProject = async (id, amount) => {
  try{
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEtheriumContract()
    amount = ethers.utils.parseEther(amount)

    await contract.backProject(id, {
      from: connectedAccount,
      value: amount._hex,
    })
  } catch(err){
    reportError(err)
  }
}

const getBackers = async (id) => {
  try{
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEtheriumContract()
    let backers = await contract.getBackers(id)

    setGlobalState('backers', structuredBackers(backers))
  } catch(err){
    reportError(err)
  }
}

const loadProjects = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const projects = await contract.getProjects()
    const stats = await contract.stats()

    setGlobalState('stats', structureStats(stats))
    setGlobalState('projects', structuredProjects(projects))
  } catch(err){
    reportError(err)
  }
}

const loadProject = async (id) => {
  try{
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEtheriumContract()
    const project = await contract.getProject(id)

    setGlobalState('project', structuredProjects([project])[0])
  } catch(err){
    alert(JSON.stringify(err.message))
    reportError(err)
  }
}

const payoutProject = async (id) => {
  try{
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEtheriumContract()

    tx = await contract.payOutProject(id, {
      from: connectedAccount,
    })
    await tx.wait()
    await getBackers(id)
  } catch(err){
    reportError(err)
  }
}

const structuredBackers = (backers) =>
  backers
    .map((backer) => ({
      owner: backer.owner.toLowerCase(),
      refunded: backer.refunded,
      timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
      contribution: parseInt(backer.contribution._hex) / 10 ** 18,
    }))
    .reverse()

const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner.toLowerCase(),
      title: project.title,
      description: project.description,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: parseInt(project.raised._hex) / 10 ** 18,
      cost: parseInt(project.cost._hex) / 10 ** 18,
      backers: project.backers.toNumber(),
      status: project.status,
    }))
    .reverse()

const toDate = (timestamp) => {
  const date = new Date(timestamp)
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

const structureStats = (stats) => ({
  totalProjects: stats.totalProjects.toNumber(),
  totalBacking: stats.totalBacking.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
})



export {
  connectWallet, 
  isWallectConnected, 
  createProject, 
  loadProjects, 
  loadProject, 
  updateProject, 
  deleteProject, 
  backProject,
  getBackers,
  payoutProject,
  
}

