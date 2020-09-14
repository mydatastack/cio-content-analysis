const { chromium } = require("playwright")

const constructPage = async (isHeadless = true) => {
  const browser = await chromium.launch({
    headless: isHeadless,
    timeout: 30000,
    waitUntil: "networkidle",
    args: [
      //"--prox-server=" + proxy,
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920x1080"
    ]
  })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    viewport: {
      width: 1200,
      height: 1000
    }
  })
  const page = await context.newPage()
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
});
  return {page, browser}
}


module.exports = { constructPage }
