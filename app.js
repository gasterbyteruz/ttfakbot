const { Telegraf } = require("telegraf");
const { chromium } = require("playwright");

(async () => {
  const bot = new Telegraf("5314704018:AAF2Hvb38HjHXygnV0SZt3LEhetUgskSvY8");
  const getVideoUrl = await createGetVideoUrl();

  bot.start((ctx) => ctx.reply("link tashlang 😉"));
  bot.url((ctx) => {
    ctx.reply("hozi...");
    getVideoUrl(ctx.update.message.text).then((video) => {
      ctx.reply(`[video](${video.downloadAddr})`, { parse_mode: "MarkdownV2" });
    });
  });

  bot.launch();
})();

async function createGetVideoUrl() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  return async function getVideoUrl(url) {
    await page.goto(url);
    const innerHTML = await (await page.$("#SIGI_STATE")).innerHTML();
    const { video } = Object.values(JSON.parse(innerHTML).ItemModule)[0];
    return video;
  };
}

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
