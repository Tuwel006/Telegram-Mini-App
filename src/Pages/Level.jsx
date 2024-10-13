import React, {useState} from 'react'
import Footer from '../MyComponents/Footer'
import Main from '../MyComponents/Main'
import opendLock from '../icon/opendLock.png'
import openingLock from '../icon/openingLock.png'
import closeLock from '../icon/closeLock.png'
import dollar_sign from '../icon/dolar_sign.png'

export default function Level() {
    let isDisabled;
    let value;
    const [dollarLeval, setDollarLevel] = useState(0);
  return (
    <>
        <div>
          <p className='text-3xl'>Level:</p>
          <p className='flex text-xl  mt-2 mb-2'>Earn 
          <img alt='dollar_sign' src={dollar_sign} className='' style={{height: '35px', width: '40px',position:'relative',top:'0px',left: '0px'}}></img><p className='text-yellow-400 text-2xl mr-2'>12.75</p> Complete 50 Levels.
          </p>
        </div>
      <main className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-5 p-1 gap-1">
          {Array.from({ length: 50 }).map((_, index) => (
            isDisabled = index >= 9,
            value = (index+1)*0.01,
            value = parseFloat(value.toFixed(10)),
            <button
              key={index}
              className={`rounded-xl bg-green-600 h-20 flex flex-col items-center text-white font-bold ${isDisabled ? 'bg-gray-500 text-gray-300 opacity-50' : 'bg-blue-500 text-white'}`}
            >
              <p>{`Level ${index + 1}`}</p>
              <p className='text-yellow-400'>${value}</p>
              {isDisabled?<img alt='closeLock' src={closeLock} className='' style={{height: '35px', width: '40px',position:'relative',top:'-3px',left: '0px'}}></img>:<img alt='opendLock' src={opendLock} className='' style={{height: '35px', width: '40px',position:'relative',top:'-3px',left: '0px'}}></img>}
              
            </button>
          ))}
        </div>
      </main>
    </>
  )
}