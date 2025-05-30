'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from '@/components/Statics';

export default function OrderForm() {
  const [loading, setLoading] = useState(null);
  const [res, setRes] = useState({
    message: '',
    status: ''
  })
  const [data, setData] = useState({
    name: '',
    phone: '',
    description: ''
  })

  const postOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/jobs', data);
      setRes({
        message: response.data.message || 'تم ارسال الطلب بنجاح',
        status: response.status
      });
    } catch(error) {
      console.log(error)
      setRes({
        message: error.response.data.message || 'فشل اثناء الطلب افحص الانترنت',
        status: error.response.status
      })
    } finally {
      setLoading(null)
    }
  };

  useEffect(()=> {
    if(res) {
      const timer = setTimeout(() => setRes({
        message: '',
        status: ''
      }), 2000);
      return () => clearTimeout(timer);
    }
  }, [res])

  return (
    <div 
      className='w-full h-screen flex justify-center items-center font-bigX'
    >
      <form
        className='flex flex-col items-end gap-12 px-5 py-9 sm:p-16 bg-white'
        onSubmit={postOrder}
        dir='rtl'
      >
        <input
          type='text'
          name='name'
          placeholder='الاسم'
          onChange={e=> setData({...data, name: e.target.value.trim()})}
          value={data.name}
          className='px-3 h-12 w-full text-xl focus:outline-none focus:border-black focus:border-b-2 focus:border-r-0 border-slate-300 border-r-2 transition ease-out duration-500'
        />
        <input
          type='tel'
          name='phone'
          placeholder='01031412343'
          onChange={e=> {
            if (/^\d*$/.test(e.target.value) && e.target.value.length <= 11) {
              setData({...data, phone: e.target.value})}
            }
          }
          value={data.phone}
          className='px-3 h-12 w-full text-end text-xl focus:outline-none focus:border-black focus:border-b-2 focus:border-r-0 border-slate-300 border-r-2 transition ease-out duration-500'
        />
        <textarea
          type='text'
          name='description'
          placeholder='الوصف'
          onChange={e=> setData({...data, description: e.target.value})}
          value={data.description}
          className='w-[330px] sm:w-[400px] md:w-[580px] p-2 h-36 text-lg focus:outline-none focus:border-black focus:border-2 border-r-2 border-slate-300 transition ease-out duration-500'
        />
        { loading? <Spinner spinnerColor='black' /> : <button className='text-lg px-1 focus:outline-none border-white focus:border-black border-2 w-fit'>Submit</button> } 
        <h1 className={`text-xl text-${res.status===200?'green-500': 'red-500'}`}>{res.message}</h1>
      </form>
    </div>
  )
}
