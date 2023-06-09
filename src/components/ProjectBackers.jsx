import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import Identicons from 'react-identicons'
import { truncate } from '../store/Index'
import Moment from 'react-moment'

const ProjectBackers = ({ backers }) => {

  return (
    <div className='flex flex-col justify-center items-start md:w-2/3 px-6 mx-auto'>
        <div className="max-h-[calc(100vh_-_25rem)] overflow-auto shadow-md rounded-md w-full mb-10">
            <table className='min-w-full'>
                <thead className='border-b'>
                    <tr>
                        <th scope="col" className='text-sm font-md px-6 py-4 text-left '>
                            Donors
                        </th>

                        <th scope="col" className='text-sm font-md px-6 py-4 text-left '>
                            Donations
                        </th>

                        <th scope="col" className='text-sm font-md px-6 py-4 text-left '>
                            Refunded
                        </th>

                        <th scope="col" className='text-sm font-md px-6 py-4 text-left '>
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {backers.map((backer, i) => (
                        <Backer key={i} backer={backer} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

const Backer = ({ backer, i }) => (
    <tr key={i} className='border-b border-gray-200'>
                        <td className='text-sm font-light px-6 py-4 whitespace-nowrap'>
                            <div className='flex justify-start items-center space-x-2'>
                                <Identicons className="h-10 w-10 object-contain rounded-full shadow-md" 
                                string={backer?.owner} size={25} />
                                <span>{truncate(backer?.owner, 4, 4, 11)}</span>
                            </div>
                        </td>
                        <td className='text-sm font-light px-6 py-4 whitespace-nowrap'>
                            <small className='flex justify-start items-center'>
                                <FaEthereum />
                                <span className='text-gray-700 font-medium'>{backer?.contribution} ETH</span>
                            </small>
                        </td>
                        <td className='text-sm font-light px-6 py-4 whitespace-nowrap'>
                            {backer?.refunded ? 'Yes' : 'No'}
                        </td>
                        <td className='text-sm font-light px-6 py-4 whitespace-nowrap'>
                            <Moment fromNow>{backer?.timestamp}</Moment>
                        </td>
    </tr>
)

export default ProjectBackers