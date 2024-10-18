const { Telegraf } = require('telegraf');
// const { initializeApp } = require('firebase/app');
// const { getDatabase, ref, get, set } = require('firebase/database');
//const { database } = require('./firebase'); // Import the database reference
//const { ref, push, set } =  require('firebase/database'); // Modular imports for database operations

let appUrl;
let newUser;

const botToken = '7459072025:AAFmkYKr2sZSUL35KGNMvxSt8F7vh315XYU';
const bot = new Telegraf(botToken);

bot.start(async (ctx) => {
  const user = ctx.from;
  const userName = encodeURIComponent(ctx.from.first_name || 'Unknown');
  const lastName = encodeURIComponent(ctx.from.last_name || "Unknown");
console.log("user name: "+userName);
     try {
    // Construct the URL to your app with the token parameter
    appUrl = `https://tarbocoin.vercel.app?telegramID=${userName} ${lastName}`;

    // Send a message to the user with a button to access the app
    await ctx.reply(`Hello, ${userName} ${lastName} Click the "Go" button below to access the app:`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Go', web_app:{url: appUrl}}]
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
