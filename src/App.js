import './App.css';
import Home from './Pages/Home';
import Widthdraw from './Pages/Widthdraw';
import Level from './Pages/Level';
import Guide from './Pages/Guide';
import Airdrop from './Pages/Airdrop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import React, {useEffect} from 'react';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';


function App() {
  const tele = window.Telegram.WebApp;
  // const postData = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch("https://console.firebase.google.com/project/mark-coin-mining/database/mark-coin-mining-default-rtdb/data/~2F/markCoinMining.json",
  //     {method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         //Data Post to DB
  //       })
  //     }
  //  )
 // }




  return (
      <UserProvider>
        <Router>
      <div className="bg-white flex justify-center">
        <div className="w-full bg-gray-800 text-white h-screen font-bold flex flex-col max-w-xl">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/widthdraw" element={<Widthdraw/>} /> */}
            <Route path="/level" element={<Level/>} />
            <Route path="/airdrop" element={<Airdrop/>} />
            <Route path="/guide" element={<Guide/>} />
          </Routes>
          <Footer/>
        </div>
      </div>
    </Router>
      </UserProvider>

    
  );
}

export default App;
