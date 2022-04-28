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

    given('An item is in the cart',async () => {
      await expect(page).toClick('span', { text: 'Añadir al carrito' })
    });

    when('We press the order button', async () => {
      await expect(page).toClick('a', { text: 'Realizar pedido' })
    });

    then('The pay page appears', async () => {
      //En consecuencia, debería aparecer un texto indicandonos el total
      await expect(page).toMatch('Total productos(Imp. incluidos):')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

