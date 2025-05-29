'use client'
import { Spinner, SVGLocker, SVGPhone, SVGProfile } from "../Statics"
import { useState, useEffect, useRef } from "react"
import axios from "axios"

export default function SignInForm() {
  const [phoneNum, setPhoneNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [resStatus, setStatus] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData(e.currentTarget)
      formData.append('imageFile', imageFile)
        
      // Client-side validation
      const { name, phone, password } = Object.fromEntries(formData)

      if (!name || !phone || !password || !imageFile) {
        setStatus({ message: 'املأ كل البيانات', status: 300 })
        return
      }

      if (phone.length !== 11) {
        setStatus({ message: 'الرقم خاطئ', status: 300 })
        return
      }

      if (password.length <= 8) {
        setStatus({ message: 'كلمة المرور يجب الا تقل عن  8 رموز', status: 300 })
        return
      }
      

      const response = await axios.post('/api/profile', formData)
      
      setStatus({
        message: response.data.message,
        status: response.status
      })
      // reset the form
      e.target.reset();
      setPhoneNum('');
      setPreview(null);
      setImageFile(null);

    } catch (error) {
      if (error.response) {
        // Use server's error message
        setStatus({
          message: error.response.data.message || 'حاول مره اخرى',
          status: error.response.status
        });
      } else {
        setStatus({
          message: 'حاول مره اخرى',
          status: 404
        });
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setStatus({}), 4500)
    } finally {
      setLoading(false)
      
    }
  }

  return (
    <div className="flex flex-col items-center justify-center max-h-screen overflow-hidden w-full">
      <form 
        dir="rtl"
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center z-10 mt-[200px] lg:mt-[360px]"
      >
        <div className="flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="file-upload"
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className={`
              w-36 h-36
              lg:w-56 lg:h-56
              border-2 border-gray-300
              profile-glow
              rounded-full
              cursor-pointer
              transition-colors
              flex items-center justify-center
              overflow-hidden
              ${!preview ? 'bg-gray-50' : ''}
            `}
          >
            {preview ? (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${preview})` }}
              />
            ) : (
              <div className="text-gray-300 text-center">
                <SVGProfile />
              </div>
            )}
          </label>
        </div>
        <div className="w-40 h-40 lg:w-64 lg:h-64 bg-[#0a0a0a] relative -top-36 lg:-top-[236px] rounded-full -z-10" />
        
        <div className="
          bg-[#221e41]
          w-[340px] sm:w-[500px]
          relative -z-20
          -top-48 lg:-top-[330px]
          rounded-2xl py-12 lg:pt-24
          flex flex-col
          items-center
          gap-4
        ">
          <div className="flex flex-col w-full items-center">
            <label htmlFor="name" className="w-full font-bigX text-2xl text-white mr-24 mb-2 sm:mr-36">
            اسمك
            </label>
            <input
              type="text" 
              name='name'
              id='name'
              className="w-3/4 rounded-md text-2xl py-3 text-center focus:outline-none font-bigX"
              placeholder="الاسم"
            />
          </div>

          <div className="flex flex-col w-full items-center">
            <label htmlFor="phone" className="w-full font-bigX text-2xl text-white mr-24 mb-2 sm:mr-36">
               رقم الهاتف<SVGPhone />
            </label>
            <input
              type='tel'
              name="phone"
              id='phone'
              className="w-3/4 rounded-md py-3 text-center focus:outline-none"
              placeholder="12345678910"
              onChange={e => {
                if (/^\d*$/.test(e.target.value) && e.target.value.length <= 11) {
                  setPhoneNum(e.target.value)
                }
              }}
              value={phoneNum}
            />
          </div>

          <div className="flex flex-col w-full items-center">
            <label htmlFor="password" className="w-full font-bigX text-2xl flex items-center gap-3 text-white mr-24 mb-2 sm:mr-36">
              كلمة مرور <SVGLocker />
            </label>
            <input
              type="password" 
              name='password'
              id='password'
              placeholder='##########'
              className="w-3/4 rounded-md text-lg py-3 text-center focus:outline-none"
            />
          </div>

          {loading ? (
            <Spinner spinnerColor="white" />
          ) : (
            <button 
              type="submit"
              className="text-white font-bigX text-4xl bg-violet-900 rounded-lg px-4 mt-2"
            >
              تسجيل
            </button>
          )}

          {resStatus.message && (
            <div className={`text-3xl font-bigX ${
              resStatus.status === 200? 'text-green-500'
              : resStatus.status === 404? 'text-red-500':
              'text-yellow-400'
            }`}>
              {resStatus.message}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}