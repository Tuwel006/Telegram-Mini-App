const { Telegraf } = require('telegraf');
const crypto = require('crypto');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, set } = require('firebase/database');

// Firebase configuration
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Initialize the Telegram bot using Telegraf
const botToken = '7459072025:AAFmkYKr2sZSUL35KGNMvxSt8F7vh315XYU';
const bot = new Telegraf(botToken);

bot.start(async (ctx) => {
  const telegramID = ctx.from.id;
  const userName = encodeURIComponent(ctx.from.first_name || 'Unknown');

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

    // Construct the URL to your app with the token parameter
    const appUrl = `https://tarbocoin.vercel.app?telegramID=${telegramID}`;

    // Send a message to the user with a button to access the app
    await ctx.reply('Click the "Go" button below to access the app:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Go', url: appUrl }]
        ]
      }
    });

  } catch (error) {
    console.error('Error while processing the user:', error);
    await ctx.reply('An error occurred. Please try again later.');
  }
});

// Launch the bot
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
