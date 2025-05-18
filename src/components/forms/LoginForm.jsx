"use client";
import { Spinner } from '@/components/Statics';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if(success) {
      const timer = setTimeout(() => window.location.reload(), 2500);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handlePhoneNumberChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, '');
    if (cleanedValue.length <= 11) setPhoneNumber(cleanedValue);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.replace(/\s/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      setLoading(true)
      const response = await axios.post(
        '/api/profile/login',
        { phone: phoneNumber, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessageType('success');
      setMessage(response.data.message);

      if(response.status==200) setSuccess(true)

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'حدث خطأ غير متوقع، يرجى المحاولة لاحقًا';
      setMessageType('error');
      setMessage(errorMessage);
    } finally {
      setLoading(false)
    }
  };

  return (
    <form
      className='w-full h-screen flex flex-col justify-center items-center font-bigX'
      onSubmit={handleSubmit}
    >
      <div className="w-[300px] mt-10 p-6 bg-white rounded-lg shadow-md">
        {/* Message Display */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center text-xl ${
            messageType === 'success' 
              ? 'bg-green-200 text-green-600' 
              : 'bg-red-200 text-red-600'
          }`}>
            {message}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-center text-3xl font-medium text-gray-700 mb-2">
            رقم الهاتف
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="w-full px-3 py-2 text-2xl border text-center border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
            placeholder="1234567890"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-center text-3xl font-medium text-gray-700 mb-2">
            كلمه المرور
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border text-center border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
            placeholder="••••••••"
          />
        </div>

        <div className='mt-10 text-center flex justify-center items-center'>
          {
            loading?
            <Spinner spinnerColor="green-500" />
            :
            <button
            type="submit"
            className='text-2xl text-white bg-purple-900 pb-1 px-3 rounded-lg hover:bg-purple-800 transition-colors'
          >
            تسجيل الدخول
          </button>
          }
        </div>
      </div>
      <Link 
        href='/profile/sign'
        className='text-purple-300 text-xl mt-20'
      >
        انشاء حساب ؟
      </Link>
    </form>
  );
}