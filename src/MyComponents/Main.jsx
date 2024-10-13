
import task_logo from '../icon/task_logo.png';
import React, { useState, useEffect } from 'react';
import dollar_coin from '../icon/dollar-coin.png';
import reward_logo from '../icon/reward_logo.png';
import bonusDollar_logo from '../icon/bonusDollar_logo.png';
import airDrop_logo from '../icon/airDrop_logo.webp';
import FarmingBox from './FarmingBox';
import { useUser } from '../UserContext';
export default function Main() {



  //max points
  const [maxPoints,setMaxPoints] = useState(100);
  const {user} = useUser();
  // // const coin = user.coin;
  // const levelPoints = user.levelPoints;
  // const level = user.level;

  const [level, setLevel] = useState(1);
  const [levelPoints,setLevelPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const [coin, setCoin] = useState(0);


  // const levelPointsUpdate = (points)=>{
  //   if(levelPoints+points<maxPoints){
  //   setLevelPoints((prevPoints) => prevPoints+ points);
  //   }
  //   else{
  //     setLevelPoints((prevpoints) => points-maxPoints+prevpoints);
      
  //     setMaxPoints(maxPoints+(10*level));
  //     setLevel(level+1);
  //   }
    
  // }

  // const handlePointsClaimed = (points) => {
  //   setTotalPoints((prevTotal) => prevTotal + points);
  // };

  const [timeLeft, setTimeLeft] = useState(null);
  
  useEffect(() => {
    const now = new Date();
    const countdownEnd = new Date(now);
    countdownEnd.setDate(now.getDate() + 90);  // Set for 90 days later

    const interval = setInterval(() => {
      const diffTime = countdownEnd - new Date();
      setTimeLeft(diffTime > 0 ? diffTime : 0);
    }, 1000);

    return () => clearInterval(interval);  // Cleanup on unmount
  }, []);

  // Convert milliseconds to days, hours, minutes, and seconds
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}D ${hours}H ${minutes}M ${seconds}S`;
  };
 // Current level based on totalPoints
  const pointsInCurrentLevel = levelPoints % maxPoints; // Points in the current level
  const progressPercentage = (pointsInCurrentLevel / maxPoints) * 100;

  return (
    <> 
    <div className='flex-grow overflow-y-auto mt-3 pt-3 h-full w-full bg-gray-800 border-t-4 border-yellow-300 rounded-tl-3xl rounded-tr-3xl'>
        <div className='ml-3 mr-3 h-24 w-88 rounded-xl flex px-1 justify-between'>
            <div className='shadow-inner bg-slate-900 h-24 w-[calc(33%-0.5rem)] rounded-xl flex flex-col items-center'>
            <div className='flex justify-center items-center animate-pulse h-4 w-4 rounded-full bg-red-900' style={{position:'relative',bottom:'5px',left:'55px'}}>
              <p className='text-white'>5</p>      
            </div>
                
            <img alt='reward_logo' src={reward_logo} className='' style={{height: '120px', width: '120px',position:'relative',top:'-30px',left: '-3px'}}></img>
            <p className='text-xs' style={{position: 'relative', bottom:'51px'}}>Daily Reward</p>
            </div>
            <div className='shadow-inner bg-slate-900 h-24 w-[calc(33%-0.5rem)] rounded-xl flex flex-col items-center'>
            <div className='flex justify-center items-center animate-pulse h-4 w-4 rounded-full bg-red-900' style={{position:'relative',bottom:'5px',left:'55px'}}>
              <p className='text-white'>5</p>      
            </div>
                
            <img alt='task_logo' src={task_logo} className='' style={{height: '80px', width: '80px',position:'relative',top:'-16px',left: '0px'}}></img>
            <p className='text-xs' style={{position: 'relative', bottom:'20px'}}>Daily Task</p>
            </div>
            <div className='shadow-inner bg-slate-900 h-24 w-[calc(33%-0.5rem)] rounded-xl flex flex-col items-center'>
            <div className='flex justify-center items-center animate-pulse h-4 w-4 rounded-full bg-red-900' style={{position:'relative',bottom:'5px',left:'55px'}}>
              <p className='text-white'>5</p>      
            </div>
                
            <img alt='bonusDollar_logo' src={bonusDollar_logo} className='' style={{height: '98px', width: '98px',position:'relative',top:'-27px',left: '0px'}}></img>
            <p className='text-xs' style={{position: 'relative', bottom:'37px'}}>Bonus Dollar</p>
            </div>
        </div>
{user?(
        // {/*LevelBox*/}
        <div className="mt-2 flex items-center justify-center flex-col">
          <div className='flex mb-3'>
          <img alt='dollar_coin' src={dollar_coin} className='' style={{height: '25px', width: '25px',position:'relative',top:'7px'}}></img>
          <p className='text-3xl'>00</p>
          </div>
      <div className="w-full max-w-sm">
        <div className="h-8 w-full bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center">Level: {level}</p>
        <p className="text-center">Mark Coin: {levelPoints}/{maxPoints}</p>
      </div>     
    </div>)
:<h1>User Not Found</h1>}
    {/* Air Drop */}
{user?(      <div className='h-full, w-full mt-3 flex items-center justify-center flex-col'>
        <img alt='airDrop_logo' src={airDrop_logo} className='animate-bounce' style={{height: '120px', width: '120px',position:'relative',top:'7px'}}></img>
      </div>
):<></>}
{user?( 
      <div className="text-center bg-gray-800 text-white p-3 pt-0 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-3">Air Drop will Open After....</h1>
      <p className="text-2xl text-blue-500">{timeLeft !== null ? formatTime(timeLeft) : 'Loading...'}</p>
    </div>
):<></> }
    {user?(<FarmingBox/>):<></>}
    </div>
    </>
  )
}
