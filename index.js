import fs from 'fs/promises';
import puppeteer from "puppeteer";

async function openWebPage() {
   const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400
   });
   const page =  await browser.newPage();

    await page.goto("https://www.flashscore.co/?rd=mismarcadores.com");

    await browser.close();

}

//openWebPage();

async function captureScreenShot() {
    const browser = await puppeteer.launch({
     headless: false,
     slowMo: 400
    });
    const page =  await browser.newPage();
 
     await page.goto("https://www.flashscore.co/?rd=mismarcadores.com");
     await page.screenshot({ path: 'example.png' });
     await browser.close();
 
 }

 //captureScreenShot();

 async function navigateWebPage() {
    const browser = await puppeteer.launch({
     headless: false,
     slowMo: 400
    });
    const page =  await browser.newPage();
 
     await page.goto("https://quotes.toscrape.com/");
     await page.click('a[href="/login"]');     
     await new Promise(r => setTimeout(r,3000));
     await browser.close();
 
 }

 //navigateWebPage();


 async function getDataFromWebPage() {
    const browser = await puppeteer.launch({
     headless: false,
     slowMo: 400
    });
    const page =  await browser.newPage();
 
     await page.goto("https://www.example.com");

    const result = await page.evaluate(()=>{
       const title =  document.querySelector('h1').innerText;
       const description =  document.querySelector('p').innerText;
       const more =  document.querySelector('a').innerText;
       return{
        title,
        description,
        more
       }
    });
    console.log(result);
     await browser.close();
 
 }

 //getDataFromWebPage();

 async function handleDynamicWebPage() {
    const browser = await puppeteer.launch({
     headless: false,
     slowMo: 200
    });
    const page =  await browser.newPage();
 
     await page.goto('https://quotes.toscrape.com');

    const result = await page.evaluate(()=>{
        const quotes = document.querySelectorAll('.quote');
        const data = [...quotes].map(quotes =>{
            const quoteText = quotes.querySelector('.text').innerText;
            const author = quotes.querySelector('.author').innerText;
            const tags = [...quotes.querySelectorAll('.tags')].map((tag)=> tag.innerText);
            return {
                quoteText,
                author,
                tags
            }
        });
      return data;
    
    }); 
 console.log(result);
 await fs.writeFile('quotes.json', JSON.stringify(result,null,2));

     await browser.close();
 
 }

 handleDynamicWebPage();