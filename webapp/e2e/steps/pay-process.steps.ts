import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/pay-process.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
     // : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/productos", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Paying an item', ({given,when,then}) => {
    let email:string;
    let password:string;

    given('An item is in the cart',async () => {
      email = "prueba1@gmail.com";
      password = "Prueba1!";
      //Iniciamos en sesión auth0
      const registerButton = await page.$('button#registerButton');
      await registerButton!.evaluate(a => {
        if (a instanceof HTMLElement) {
          a.click();
        }
      });
      await page.waitForNavigation();

      await expect(page).toClick("a");

      await expect(page).toFill("input[name='email']", email);
      await expect(page).toFill("input[name='password']", password);
      await expect(page).toClick("button[name='submit']");
      await page.waitForTimeout(10000);
    //Volvemos a la pestaña de los productos
    const linkProductos =await page.$("a[href='productos']");
    await linkProductos!.evaluate(a =>  {
      if(a instanceof HTMLElement) {
        a.click();
      }
    });
    await page.waitForNavigation();

    //Clickamos el primer boton añadir al carrito que encontremos
      const addToCart =await page.$('button#botonAnadirAlCarrito');
      await addToCart!.evaluate(a =>  {
        if(a instanceof HTMLElement) {
          a.click();
        }
      });
      //Clickamos el boton que despliega el carrito
      const botonCarrito2 =await page.$('button#botonCarritoDesplegar');
      await botonCarrito2!.evaluate(a =>  {
        if(a instanceof HTMLElement) {
          a.click();
        }
      });
    });

    when('We press the order button', async () => {
      await delay(2000);
       //Clickamos el boton de realizar pedido
       await expect(page).toClick("a[href='confirmar-pedido']",{timeout:6000});
       await page.waitForNavigation();
       await page.waitForTimeout(10000);
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
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}