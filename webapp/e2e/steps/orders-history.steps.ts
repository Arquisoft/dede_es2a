import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/orders-history.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
    beforeAll(async () => {
  
      browser = process.env.GITHUB_ACTIONS
        ? await puppeteer.launch()
        : await puppeteer.launch({ headless: false, slowMo:100 });
        //: await puppeteer.launch({ headless: true });
      page = await browser.newPage();
  
      await page
        .goto("http://localhost:3000/productos", {
          waitUntil: "networkidle0",
        })
        .catch(() => {});
    });
    test('The orders history has orders', ({given,when,then} )=> {
      let email:string;
      let password:string;

        given('A user with some orders',async () => {
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
        });
    
        when('I click the orders history button', async () => {
    
          //Clickamos el primer boton añadir al carrito que encontremos
    /*
          const addToCart = await page.$('button#botonAnadirAlCarrito');
          const espera1=await addToCart!.click();
          console.log(espera1);
     */
    
          //Clickamos el boton que despliega el carrito
          const addToCart =await page.$('button#botonAnadirAlCarrito');
          await addToCart!.evaluate(a =>  {
            if(a instanceof HTMLElement) {
              a.click();
            }
          });
           
    
    
          //Clickamos el boton que despliega el carrito
          const botonCarrito =await page.$('button#botonCarritoDesplegar');
          await botonCarrito!.evaluate(a =>  {
            if(a instanceof HTMLElement) {
              a.click();
            }
          });
        }
      );
    
        then('Orders must be seen', async () => {
          //En consecuencia, debería aparecer la palabra precio.
          await expect(page).toMatch('Precio')
        });
      })
    
      afterAll(async ()=>{
        browser.close()
      })
    
    
    });
      