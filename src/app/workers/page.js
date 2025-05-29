'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@/components/Statics";

export default function page() {

  const [workers, setWorkers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)


  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/profile');
        setWorkers(response.data)
      } catch (error) {
        setError(error.response?.data?.message)
      } finally {
        setLoading(null)
      }
    };

    fetchWorkers();
  }
  , [])

  return (
    <div className="flex flex-col justify-center items-center text-white w-screen min-h-screen font-bigX absolute left-0 z-20 top-0">
      <h1 className="text-4xl text-center font-bold mt-10 absolute top-10">مستقليين</h1>
      {
        loading? <Spinner spinnerColor="white" />:
        error? error:
        <div className="flex justify-around items-center mt-10 ">
          {workers.map((worker) => (
            <div 
              key={worker._id} 
              className=" w-[300px] p-4 rounded-lg shadow bg-[#deb1ff65] "
            >
              <img src={worker.image} alt={worker.name} className="w-full h-auto rounded" />
              <h2 className="text-3xl font-bold mt-2">{worker.name}</h2>
              <p className="text-2xl">{worker.phone}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
