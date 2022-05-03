import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/pay-process.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo: 100 });
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
    const registerButton =await page.$('button#registerButton');
    await registerButton!.evaluate(a =>  {
      if(a instanceof HTMLElement) {
        a.click();
      }
    });
    await page.waitForNavigation();

    //await expect(page).toClick("a");

    await expect(page).toFill("input[name='email']", email);
    await expect(page).toFill("input[name='password']", password);
    await expect(page).toClick("button[name='submit']");
    await page.waitForNavigation();
    //Volvemos a la pestaña de los productos
    await expect(page).toClick("a[href='productos']");
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
