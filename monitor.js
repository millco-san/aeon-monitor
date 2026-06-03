import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true
});

const page = await browser.newPage({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
});

await page.goto(
  "https://aeonretail.com/Form/Product/ProductList.aspx?gspsk=%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%83%89%E3%82%B2%E3%83%BC%E3%83%A0&psc=0&gspss=sell_from%3Adesc",
  {
    waitUntil: "domcontentloaded",
    timeout: 60000
  }
);

const products = await page.$$eval(
  ".product__item--name a",
  links =>
    links.map(link => ({
      name: link.textContent.trim(),
      url: new URL(link.getAttribute("href"), "https://aeonretail.com").href
    }))
);

console.log("COUNT:", products.length);
console.log(JSON.stringify(products.slice(0, 5), null, 2));

await browser.close();
