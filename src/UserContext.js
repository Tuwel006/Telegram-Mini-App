// UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from './firebase'; // Import Firebase configuration
import { ref, push, set, onValue, update } from 'firebase/database';

// Create User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve telegramID from the URL parameters
  const telegramID = new URLSearchParams(window.location.search).get('telegramID');

  const userRef = ref(database, 'markCoinMining');
    const newUserRef = push(userRef);
    const date = new Date();
    set(newUserRef, {
      telegramID,
          name: "",
          coin: 0,
          balance: 0,
          level: 1,
          startDate: date,
          dateCount: 0,
          levelPoints: 0,
          maxPoints: 100
    });

  useEffect(() => {
    if (telegramID) {
      const userRef = ref(database, 'markCoinMining/' + telegramID);

      // Listen for changes in user data
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        }
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [telegramID]);

  const updateCoins = async (addCoin) => {
    if (user) {
      const userRef = ref(database, 'markCoinMining/' + telegramID);
      if (parseInt(user.levelPoints) + addCoin > parseFloat(user.maxPoints)) {
        await update(userRef, {
          coin: parseInt(user.coin) + addCoin,
          levelPoints: parseInt(user.levelPoints) + addCoin - parseInt(user.maxPoints),
          level: parseInt(user.level) + 1,
          maxPoints: parseInt(user.maxPoints) + 10 * parseInt(user.level),
        });
      } else {
        await update(userRef, {
          coin: parseInt(user.coin) + addCoin,
          levelPoints: parseInt(user.levelPoints) + addCoin,
        });
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, updateCoins }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
