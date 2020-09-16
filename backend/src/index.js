const { constructPage } = require("./init.js")
const { delay, autoScroll } = require("./utils.js")
const fs = require("fs")

const cioUrl = "https://www.xing.com/news/pages/cio-de-203"
const mmUrl = "https://www.xing.com/news/pages/manager-magazin-93"


const articleHeadlineSelector = "div.article__text > h3 > span"
const numberOfLikes = "span[class='icon__counter']"
const consentButton = "#consent-accept-button"
const showMore = "#ls-articles > div > nav > a"
const beforeMore = "#ls-articlelist__identifier > li:nth-child(10)"
const dateSelector = "div.article-subheader > div > time"
const commentsSelector = "span.icon__counter--comments"

async function scrollOnElement(page, selector) {
  await page.$eval(selector, element => element.scrollIntoView())
}

const getHeadline = async page => {
  return await page.$$eval(articleHeadlineSelector, 
    html => html.map(el => el.textContent))
}

const getLikes = async page => {
  return await page.$$eval(numberOfLikes, 
    html => html.map(el => el.textContent))
}

const getDates = async page => {
  return await page.$$eval(dateSelector,
    html => html.map(el => el.textContent))
}

const getComments = async page => {
  return await page.$$eval(commentsSelector,
    html => html.map(el => el.textContent))
}


const main = async () => {
  const { page, browser } = await constructPage(true)
  console.log("go to page")
  await page.goto(mmUrl, {
    timeout: 10000
  })
  console.log("click on consent button")
  await page.click(consentButton)

  console.log("start scrolling")
  await scrollOnElement(page, beforeMore)
  await delay(5000)
  await scrollOnElement(page, showMore)
  await page.click(showMore)
  await scrollOnElement(page, showMore)
  await autoScroll(page)
 
  console.log("start quering html strings")
  const headline = await getHeadline(page)
  const likes = await getLikes(page)
  const dates = await getDates(page)
  const comments = await getComments(page)

  
  const combined = headline.map((h, i) => ({
    headline: h,
    likes: likes[i],
    comments: comments[i],
    date: dates[i]
  }))

  console.log("saving the file")
  fs.writeFile("../mm-output.json", JSON.stringify(combined), (err, d) =>
    err ? console.log(err) : console.log("file saved to output.json"))

  await browser.close()
}


if (require.main === module && process.env.NODE_ENV === "development") {

  const testMain = async () => {
    await main()
  }

  testMain()
}

