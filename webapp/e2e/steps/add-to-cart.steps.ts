import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should display "google" text on page', async () => {
    await expect(page).toMatch('google')
  })
})




/*
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
/*
  it("navigates to the about page", async () => {
    await page.goto("http://localhost:3000/productos");
    await page.click("#botonAnadirAlCarrito");
    await page.waitForSelector(".App-welcome-text");
    const text = await page.$eval(".App-welcome-text", (e) => e.textContent);
    expect(text).toContain("This is the about page.");
  });
  afterAll(() => browser.close());


  test('The cart is empty', async ()=> {
    await page.click('button#botonAnadirAlCarrito');
    
  })

  test('The cart is empty', ({given,when,then} )=> {
    

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
  */

