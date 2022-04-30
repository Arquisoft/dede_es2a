import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/pay-process.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 150 });
      //: await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/productos", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Paying an item', ({given,when,then}) => {
    

    given('An item is in the cart',async () => {
    //Nos registramos en la pagina
    const registerButton =await page.$('button#registerButton');
    await registerButton!.click();
    await registerButton!.click();

    
    //Clickamos el primer boton añadir al carrito que encontremos
      const addToCart =await page.$('button#botonAnadirAlCarrito');
      await addToCart!.click();
      await addToCart!.click();
      //Clickamos el boton que despliega el carrito
      const botonCarrito2 =await page.$('button#botonCarritoDesplegar');
      await botonCarrito2!.click();
    });

    when('We press the order button', async () => {
       //Clickamos el boton de realizar pedido
       await expect(page).toClick("a[href='confirmar-pedido']");
       await page.waitForNavigation();
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
