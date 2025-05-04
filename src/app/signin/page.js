'use client'
import ImagePlacement from "../../components/profiles/ImagePlacement"
import { Spinner, SVGLocker } from "../../components/static/Statics"
import { useState } from "react"
import axios from "axios"
import { validateEntries } from "../../../lib/serverFunctions"

export default function Page() {
  const [phoneNum, setPhoneNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [resStatus, setStatus] = useState(undefined)
  const [imageFile, setImageFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData(e.currentTarget)
      formData.append('imageFile', imageFile)
      const isValid = validateEntries(formData)
      if(!isValid) {
        setStatus({
          message: 'املأ كل البيانات',
          status: 404
        })
        return
      }
      const response = await axios.post('/api/profile', formData)
      setStatus({
        message: response.data,
        status: response.status
      })
      console.log(resStatus)
    } catch (error) {
      setStatus({
        message: 'حاول مره اخرى',
        status: 404
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <form 
        dir="rtl"
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center justify-center z-10 mt-[200px] lg:mt-[340px]"
      >
        <ImagePlacement setImage={setImageFile} />
        <div className=" w-40 h-40 lg:w-64 lg:h-64 bg-[#0a0a0a] relative -top-36 lg:-top-[236px] rounded-full -z-10" />
        <div className={`
          bg-[#221e41]
          w-[340px] sm:w-[500px]
          relative -z-20
          -top-48 lg:-top-[330px]
          rounded-2xl py-12 lg:pt-24
          flex flex-col
          items-center
          gap-7
        `}>
          <div className=" flex flex-col w-full items-center ">
            <label htmlFor="name" className="w-full font-bigX text-2xl text-white mr-24 mb-2 sm:mr-36">ضع اسمك</label>
            <input
              type="text" 
              name='name'
              id='name'
              className="w-3/4 rounded-md text-2xl py-3 text-center focus:outline-none font-bigX"
              placeholder="الاسم"
            />
          </div>
          <div className=" flex flex-col w-full items-center">
            <label htmlFor="phone" className="w-full font-bigX text-2xl text-white mr-24 mb-2 sm:mr-36">ضع رقم الهاتف</label>
            <input
              type='tel'
              name="phone"
              id='phone'
              className="w-3/4 rounded-md py-3 text-center focus:outline-none"
              placeholder="12345678910"
              onChange={e => {
                if (/^\d*\.?\d*$/.test(e.target.value) && e.target.value.length <= 11) {
                  setPhoneNum(e.target.value)
                }
              }}
              value={phoneNum}
            />
          </div>
          <div className=" flex flex-col w-full items-center ">
            <label htmlFor="password" className="w-full font-bigX text-2xl flex items-center gap-3 text-white mr-24 mb-2 sm:mr-36">
              ضع كلمة مرور <SVGLocker />
            </label>
            <input
              type="password" 
              name='password'
              id='password'
              placeholder='##########'
              className="w-3/4 rounded-md text-lg py-3 text-center focus:outline-none"
            />
          </div>
          {
            loading ?
              <Spinner spinnerSize="64" spinnerColor="white" /> :
              <button 
                className=" text-white font-bigX text-4xl bg-violet-900 rounded-lg px-4 mt-10"
              >
                تسجيل
              </button>
          }
        </div>
      </form>
    </div>
  )
}
