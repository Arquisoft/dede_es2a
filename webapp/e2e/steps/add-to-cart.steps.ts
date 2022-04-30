import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;


defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 150 });
     // : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/productos", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The cart is empty', ({given,when,then} )=> {
    

    given('The empty Cart',async () => {

    });

    when('I press the add to cart item button', async () => {

      //Clickamos el primer boton añadir al carrito que encontremos
/*
      const addToCart = await page.$('button#botonAnadirAlCarrito');
      const espera1=await addToCart!.click();
      console.log(espera1);
 */

      //Clickamos el boton que despliega el carrito
      const addToCart =await page.$('button#botonAnadirAlCarrito');
      await addToCart!.click();
      await addToCart!.click();


      //Clickamos el boton que despliega el carrito
      const botonCarrito2 =await page.$('button#botonCarritoDesplegar');
      await botonCarrito2!.click();
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
  

