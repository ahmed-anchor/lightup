'use client'
import ButtonsCollection from '../components/buttons/ButtonsCollection'
import ModelViewer from '../components/model/ModelViewer'
import { useState } from 'react'

export default function page() {
  const [clickState, setClickState] = useState(false);

  return (
    <>
      <ModelViewer clickerState={clickState} />
      <div className='absolute top-0 left-0 w-full h-screen z-20 flex justify-center items-center'>
        { clickState && <ButtonsCollection handleCard={setClickState} /> }
        <button 
           className={`
            font-bigX text-6xl
            text-yellow-300 bg-purple-950 rounded-md
            mt-64 px-6 pb-4
            transition ease-out ${clickState?'opacity-0 cursor-default':'opacity-100'}

            `}
           onClick={()=>setClickState(true)}
           >
            البدء
          </button>
        {/* <button className='text-2xl p-3 font-bigX bg-yellow-400 rounded-md text-white mt-64'>اضغط هنا</button> */}
      </div>
    </>
  )
}
