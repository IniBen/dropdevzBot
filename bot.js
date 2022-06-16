// const Telegraf = require('telegraf');

// const bot = new Telegraf('5328813328:AAHBBWNkaW4Rpct3ST00Ff75_mgQVxvo_m0')
// bot.start((ctx) => ctx.reply('Welcome ' + ctx.from.first_name))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch()

// bot.command('oldschool', (ctx) => ctx.reply('Hello'))
// bot.command('modern', ({ reply }) => reply('Yo'))
// bot.command('hipster', Telegraf.reply('λ'))
// bot.launch()

const telegramBot = require('node-telegram-bot-api');
const token = '5328813328:AAHBBWNkaW4Rpct3ST00Ff75_mgQVxvo_m0';

//Initialize bot
const bot = new telegramBot (token, {polling:true});

let reminder;

//Event listener for start
bot.onText(/\/start/,(msg,match)=>{
  bot.sendMessage(
     msg.chat.id,
     `Hello! ${msg.chat.first_name}, 
      What do you want to be reminded of? [Start next message with /save]`
      )
      .then(() => {
         //For save
         bot.onText(/\/save (.+)/, (message, match)=>{
           reminder = match[1];
           if(reminder){
             bot.sendMessage(
               message.chat.id,
               `Got it! What time? [example: /time (HH:MM:SS:AM|PM)]`
               )
               .then(() => {
                 bot
                   .onText(/\/time ([01]\d|2[0-3]):([0-5]\d:[0-5]\d):(AM|PM)/,(message,match)=>{
                        const time = match[0].split(' ')[1];
                        bot.sendMessage(
                            message.chat.id,
                            `Thank you ${message.chat.first_name}, 
                             your reminder for time ${time} has been saved.`
                        );
                    })
                            
                 })
                 .catch(() =>{
                     bot.sendMessage(msg.chat.id,`Oops! An error has occured. Try again`);
                  })
            }
        });
      }) 
      .catch(e => {
          bot.sendMessage(msg.chat.id,`Oops! An error has occured. Try again`);
      }) 
});