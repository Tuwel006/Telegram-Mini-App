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
import { database } from './firebase'; // Import the database reference
import { ref, get, update, set } from 'firebase/database'; // Modular imports for database operations
import Task from './Pages/Task';


function App() {
  const tele = window.Telegram.WebApp;

  const postData = async () => {
      //e.preventDefault();
      const telegramID = new URLSearchParams(window.location.search).get('telegramID') || 'Unknown User';
      const userRef = ref(database, `UserDb`);
      //const existingUserQuery = query(userRef, child(telegramID));
      try {
        // Retrieve all user data once
        const snapshot = await get(userRef);
        let userExists = false;

        // Check if the snapshot has data and find the telegramID
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.telegramID === telegramID) {
                    userExists = true; // User exists
                }
            });
        }

        if (userExists) {
            console.log("User data already exists. No action taken.");
        } else {
            // If the user does not exist, create new user data
            const newUserRef = ref(database, `UserDb/${telegramID}`);
            const date = new Date();
            await set(newUserRef, {
                telegramID,
                name: "",
                coin: 0,
                balance: 0,
                level: 1,
                startDate: date.toISOString(), // Store date in ISO format
                dateCount: 0,
                levelPoints: 0,
                maxPoints: 100,
                levelReward: [],
            });
            console.log("New user data stored successfully.");
        }
    } catch (error) {
        console.error("Error checking user data:", error);
    }
        
    }

    if(window.open() || window.location.reload) {
      postData();
    }

  return (
      <UserProvider>
        <Router>
      <div className="bg-white flex justify-center">
        <div className="w-full bg-gray-800 text-white h-screen font-bold flex flex-col max-w-xl">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/widthdraw" element={<Widthdraw/>} />
            <Route path="/level" element={<Level/>} />
            <Route path="/airdrop" element={<Airdrop/>} />
            <Route path="/guide" element={<Guide/>} />
            <Route path="/Task" element={<Task/>} />

          </Routes>
          <Footer/>
        </div>
      </div>
    </Router>
      </UserProvider>

    
  );
}

export default App;
