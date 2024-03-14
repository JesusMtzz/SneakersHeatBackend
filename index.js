const express = require('express');
const app = express();
const port = 3000;


const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const { stringify } = require('nodemon/lib/utils');

app.get('/', async (req, res) => {
  try{
    /*
    
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    const response = await page.goto('https://www.nike.com/mx/launch?s=upcoming');
    const body = await response.text();
    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const { window: { document } } = new jsdom.JSDOM(body);
    // Seleccionamos los títulos y lo mostramos en consola
    //document.querySelectorAll('.upcoming')
      //.forEach(element => console.log(element));

    await page.waitForSelector('.upcoming-section');

    const elements = await page.evaluate(() => {
      const div = document.querySelector('.upcoming-section'); // Replace 'your-div-class' with your actual class name
      const children = div.children; // Get all the children elements of the div
      const elementsData = []; // Array to store elements data
  
      // Loop through the children elements
      // Function to extract and separate text nodes
    const extractTextNodes = (node) => {
      let text = '';

      // Loop through child nodes
      node.childNodes.forEach(childNode => {
        if (childNode.nodeType === Node.TEXT_NODE) {
          text += childNode.textContent.trim() + ' '; // Add text content and trim
        } else if (childNode.nodeType === Node.ELEMENT_NODE) {
          text += extractTextNodes(childNode); // Recursively extract text from child elements
        }
      });

      return text;
    };
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      const elementText = extractTextNodes(element); // Extract and separate text nodes within the element

      // Push the text content to the array
      elementsData.push(elementText.trim());
    }

    return elementsData;// Return the array of elements data
    });

    console.log(elements);
    // Cerramos el puppeteer
    await browser.close();

    */

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nike.com/mx/launch?s=upcoming');

    await page.waitForSelector('.product-card');

    const items = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('.upcoming-card').forEach(item => {
            const name = item.querySelector('.headline-5 ').innerText.trim();
            const price = item.querySelector('.available-date-component').innerText.trim();
            const imageSrc = item.querySelector('.image-component').getAttribute('src').trim();
            const productLink = item.querySelector('.card-link').getAttribute('href').trim();
            items.push({ name, price, imageSrc, productLink });
        });
        return items;
    });

    console.log(items);
    res.send(items);
    await browser.close();
  } catch (error){
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});