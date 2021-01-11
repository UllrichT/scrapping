const puppeteer = require('puppeteer');

const a = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1366, height: 768},
    });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.tokopedia.com', ['notifications']);
    const page = await browser.newPage();
    page.setViewport();
    await page.goto('https://www.tokopedia.com/discovery/kejar-diskon');
    console.log('waiting');
    await page.waitForXPath('/html/body/div[2]/div/main/div/div[4]/div/div/div[1]/div/div/div/div/div/div/div/button[1]')
    console.log('found');
    for(let index = 1; index <= 4; index++){
        const [timestamp] = await page.$x(`/html/body/div[2]/div/main/div/div[4]/div/div/div[1]/div/div/div/div/div/div/div/button[${index}]/div`);
        const button = await timestamp.getProperty('textContent');
        const texts = await button.jsonValue()
        const text = texts.split('\n')
        console.log(text[0]);
        if(text[0] !== 'Besok 08:00') console.log(false);
        else console.log(true);
        timestamp.click();
        await page.waitForNavigation()
        await page.waitForXPath('/html/body/div[2]/div/main/div[1]/div[4]/div/div/div[3]/div/div/div/div/div[6]/div');
        const [category] = await page.$x('/html/body/div[2]/div/main/div[1]/div[4]/div/div/div[3]/div/div/div/div/div[6]/div');
        category.click();
        await page.waitForTimeout(5000);
    }
}

console.log('start');
a();
