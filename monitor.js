import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true
});

const page = await browser.newPage();

await page.goto(
  "https://aeonretail.com/Form/Product/ProductList.aspx?gspsk=%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%83%89%E3%82%B2%E3%83%BC%E3%83%A0&psc=0&gspss=sell_from%3Adesc",
  {
    waitUntil: "networkidle",
    timeout: 60000
  }
);

console.log(await page.title());

const html = await page.content();

console.log(html.substring(0, 5000));

await browser.close();
