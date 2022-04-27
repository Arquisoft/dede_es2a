import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/productos", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The cart is empty', ({given,when,then}) => {
    
    let email:string;
    let username:string;

    given('The empty Cart',async () => {

    });

    when('I press the add to cart item button', async () => {
      await expect(page).toClick('span', { text: 'Añadir al carrito' })
    });

    then('The cart should have an item', async () => {
      //En consecuencia, debería aparecer la palabra precio.
      await expect(page).toMatch('Precio')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

