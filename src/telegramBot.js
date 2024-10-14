// telegramBot.js
const TelegramBot = require('node-telegram-bot-api');
const crypto = require('crypto');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, set } = require('firebase/database');

// Firebase configuration
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Initialize the Telegram bot
const botToken = '7515305256:AAEF4w-ZIUxw-v7be3vRJvejTbakBBkpZDo';
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const telegramID = msg.from.id;
  const userName = encodeURIComponent(msg.from.first_name || 'Unknown');

  try {
    const date = new Date();
    // Check if the user already exists in Firebase
    const userRef = ref(database, 'markCoinMining/' + telegramID);
    const snapshot = await get(userRef);

    let token;
    if (snapshot.exists()) {
      // User already exists, retrieve the existing token
      const existingUser = snapshot.val();
      token = existingUser.token;
    } else {
      // New user, generate a unique token
      token = crypto.randomBytes(16).toString('hex');

      // Store the new user data in Firebase
      const newUser = {
        telegramID,
        name: userName,
        token,
        coin: 0,
        balance: 0,
        level: 1,
        startDate: date,
        dateCount: 0,
        levelPoints: 0,
        maxPoints: 100
      };

      await set(userRef, newUser);
    }

    // Construct the URL to your Netlify app with the token parameter
    const appUrl = `https://telegram-mini-j7vjhpsxm-sabbirs-projects-23d9d54a.vercel.app/=${telegramID}`;

    bot.sendMessage(telegramID, 'Click the "Go" button below to access the app:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Go', url: appUrl }]
        ]
      }
    });

  } catch (error) {
    console.error('Error while processing the user:', error);
    bot.sendMessage(telegramID, 'An error occurred. Please try again later.');
  }
});
