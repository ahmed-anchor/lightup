'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@/components/Statics";
import Image from "next/image";

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
      <h1 className="text-4xl text-center font-bold mt-10 absolute md:top-10 top-4">مستقليين</h1>
      {
        loading? <Spinner spinnerColor="white" />:
        error? <h1 className="text-4xl">{error}</h1>:
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-32 sm:mt-28 ">
          {workers.map((worker) => (
            <div
              key={worker._id} 
              className=" w-[300px] p-4 rounded-sm shadow bg-[#0000008d]"
            >
              <Image width={400} height={400} src={worker.image} alt={worker.name} className="w-full h-auto " />
              <h2 className="text-3xl font-bold mt-2">{worker.name}</h2>
              <p className="text-2xl">+2{worker.phone}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
