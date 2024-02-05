/* eslint-disable @typescript-eslint/no-var-requires */
const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path');

const { JSDOM } = jsdom;


// read file 
const homePageHtml = fs.readFileSync(path.resolve(__dirname, './pages/connect.html'), 'utf8');
const dom = new JSDOM(homePageHtml);

// read json data
const homeJson = fs.readFileSync(path.resolve(__dirname,'./data/connect.json'));
const homeData = JSON.parse(homeJson);


for (let cmpId of Object.keys(homeData)) {
    const cmpData = homeData[cmpId];
    const cmpElm = dom.window.document.querySelector(`[data-cmp-id="${cmpId}"]`);
    const type = cmpElm.dataset['cmpType'];
    
    let cmpHtml = fs.readFileSync(path.resolve(__dirname,`./components/${type}.html`), 'utf-8');
    for (let prop of Object.keys(cmpData)) {
        cmpHtml = cmpHtml.replace(`**${prop}**`, cmpData[prop]);
    }

    cmpElm.innerHTML = cmpHtml;
}

console.log(dom.window.document.documentElement.outerHTML);

fs.writeFileSync(path.resolve(__dirname,'../src/pages/connect.html'), dom.window.document.documentElement.outerHTML);
