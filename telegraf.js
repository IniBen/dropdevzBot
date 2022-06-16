const express = require("express");
const Telegraf = require("telegraf");

const session = require('telegraf/session');

const product = require('./api/product')

const app = express();

const bot = new Telegraf("5328813328:AAHBBWNkaW4Rpct3ST00Ff75_mgQVxvo_m0");

app.use("/api/product", product);

bot.use(session())
bot.start((ctx, next) => {
  ctx.reply( `Hello! ${ctx.chat.first_name}, how may I help you today, have you gotten your PVC?`, { reply_markup: { keyboard: [['Yes'],['⬅️ No']], resize_keyboard: true } })
    return next()
})
bot.hears('Yes', (ctx) => {
    ctx.reply('Great Job, go vote a good candidate')
  })
bot.hears('⬅️ No', (ctx) => {
    ctx.reply('Go get yours today and save your country')
  })

bot.launch()