const { Telegraf } = require('telegraf');
const crypto = require('crypto');
// const { initializeApp } = require('firebase/app');
// const { getDatabase, ref, get, set } = require('firebase/database');
const { database } = require('./firebase'); // Import the database reference
const { ref, push, set } =  require('firebase/database'); // Modular imports for database operations



const botToken = '7459072025:AAFmkYKr2sZSUL35KGNMvxSt8F7vh315XYU';
const bot = new Telegraf(botToken);

bot.start(async (ctx) => {
  const telegramID = ctx.from.id;
  const userName = encodeURIComponent(ctx.from.first_name || 'Unknown');
console.log("user name: "+userName);
     try {
      
    

    // Construct the URL to your app with the token parameter
    const appUrl = `https://tarbocoin.vercel.app?telegramID=${telegramID}`;

    // Send a message to the user with a button to access the app
    await ctx.reply(`Hello, ${userName} Click the "Go" button below to access the app:`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Go', url: appUrl }]
        ]
      }
    });

    const userRef = ref(database, 'UsersDb');
      const newUserRef = push(userRef);
      if(telegramID){
        set(newUserRef, {
          telegramID,
          name: userName,
          coin: 0,
          balance: 0,
          level: 1,
          startDate: date,
          dateCount: 0,
          levelPoints: 0,
          maxPoints: 100
        })
          .then(() => {
            console.log("User data saved successfully.");
            alert("Data submitted successfully!");
            setUser({ name: "", password: "" }); // Clear form after submission
          })
      }
      // Store the new user data in Firebase
      await set(userRef, newUser);

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

