'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Spinner } from '../Statics'

export default function JobsPage() {

  const [loading, setLoading] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/jobs');
        setJobs(response.data)
      } catch (error) {
        setError(error.response?.data?.message)
      } finally {
        setLoading(null)
      }
    };

    fetchWorkers();
  }, [])

  return (
    <div 
      className='w-full min-h-screen flex flex-col justify-start items-center'
    >
      {
        !loading? <Spinner spinnerColor='white' />:
        error? <h1 className='text-4xl text-red-500'>{error}</h1>: jobs?.map(job=>(
          <div
            key={job._id}
            className='w-[90vw] h-fit bg-slate-400'
          >
            <h1>{job.name}</h1>
            <p>{job.description}</p>
          </div>
        ))
      } 
    </div>
  )
}
