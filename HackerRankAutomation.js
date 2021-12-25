// node HackerRankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

// npm init -y
// npm install minimist
// npm install puppeteer -> Puppeteer will also download it's compatible browser, if it isn't already installed

let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let args = minimist(process.argv);
let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);  //Parsed into an JavaScript Object, as we can't manuplate a JSON File.


// Using Promises -> CallBackHell
// let browserPromise = puppeteer.launch({headless:false}); 
// // headless:false will show the automation code being processed where true will just get the work done with showing the processing.
// browserPromise.then(function(browser){
//     let pagePromise = browser.pages();
//     pagePromise.then(function(page){
//         let urlOpenPromise = page[0].goto(args.url);
//         urlOpenPromise.then(function(){
//             let browserClosePromise = browser.close();
//             browserClosePromise.then(function(){
//                 console.log('Browser is Closed!');
//             })
//         })
//     })
// })




async function init() {
    // Launch the browser, in maximized view.
    let browser = await puppeteer.launch({
        headless:false,     // headless:false will show the automation being processed while the default headless:true would just do the processing in bg.
        defaultViewport: null,
        args: ['--start-maximized'] 
    });

    // . for classes, 
    // # for id's,
    // [] for attributes.


    // let pages = await browser.pages(); // .newPage() will open a new tab.
    
    // await pages[0].goto(args.url);
    // await pages[0].click("li#menu-item-2887");
    // await pages[0].waitForNavigation();
    
    // await pages[0].click("a.fl-button[href='https://www.hackerrank.com/login']"); // Syntax -> a.className[href='link']
    // await pages[0].waitForNavigation();


    // Get the tabs(There is only one tab)
    let pages = await browser.pages();
    let page = pages[0];

    await page.goto(args.url);

    // Wait and click on the login on page1
    await page.waitForSelector("a[data-event-action='Login']"); // Would wait till the given selector is found.
    await page.click("a[data-event-action='Login']");
    
    // Wait and click on the login on page2
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");
    
    // Wait respectively for the userId and password
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', configJSO.userId, {delay:50});
    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', configJSO.password), {delay:50};

    // Wait and click on the login button
    await page.waitForSelector('button[data-analytics="LoginPassword"]');
    await page.click('button[data-analytics="LoginPassword"]');

    // Wait and click on contests
    await page.waitForSelector('a[data-analytics="NavBarContests"]');
    await page.click('a[data-analytics="NavBarContests"]');

    // Wait on click on "Manage Contests"
    await page.waitForSelector('a[href="/administration/contests/"]');
    await page.click('a[href="/administration/contests/"]');

    // Wait & Click on the first contest
    await page.waitForSelector('p.mmT');
    await page.click('p.mmT');

    await page.waitForTimeout(3000); // To skip the pop-up
    
    // Wait & Click on the nav's "Moderators"
    await page.waitForSelector('li[data-tab="moderators"]');
    await page.click('li[data-tab="moderators"]');

    // To click on the input textbox
    await page.waitForSelector('input#moderator');
    await page.click('input#moderator');

    // To type the moderator username
    await page.waitForSelector('input#moderator', configJSO.moderators);
    await page.type('input#moderator', configJSO.moderators , {delay: 100});

    // To press Enter
    await page.keyboard.press('Enter');



    
    




    
}
 
init(); // Function Call
