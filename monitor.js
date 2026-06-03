import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true
});

const page = await browser.newPage({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
});

try {
  await page.goto(
    "https://aeonretail.com/Form/Product/ProductList.aspx?gspsk=%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%83%89%E3%82%B2%E3%83%BC%E3%83%A0&psc=0&gspss=sell_from%3Adesc",
    {
      waitUntil: "domcontentloaded",
      timeout: 60000
    }
  );

  await page.waitForTimeout(5000);

  const title = await page.title();

  console.log("TITLE:", title);

  const html = await page.content();

  console.log("HTML_START");
  console.log(html.substring(0, 3000));
  console.log("HTML_END");
} catch (e) {
  console.error("ERROR:", e);
}

await browser.close();
