import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-user.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;


defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
     // : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/home", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Register a user', ({given,when,then} )=> {
    
    let email:string;
    let password:string;

    given('The application without user in session',async () => {
        email = "usuarioPrueba@gmail.com"
        password = "usuarioPrueba"
    });

    when('We press the register button and fill the form', async () => {

      // Presionamos el botón de registro de la barra de navegación
      const registerButton = await page.$('button#registerButton');
      await registerButton!.click();
      await page.waitForNavigation();

      //Clickamos el span de signup
      //await expect(page).toClick("a[href='#']");
      await expect(page).toClick('a', { text: 'Sign Up' })
      await page.waitForNavigation();

      // Rellenamos el formulario
      await expect(page).toFill("input[name='email']", email);
      await expect(page).toFill("input[name='password']", password);

      // Clickamos el submit
      await expect(page).toClick("button[name='submit']");
      //await page.waitForNavigation();

      // Clickamos el botón "Aceptar" para dar permisos en nuestra aplicacion
    });

    then('Disconnection text appears', async () => {
      //En consecuencia, debería aparecer la palabra desconectar.
      await expect(page).toMatch('Email is invalid.');
    });
  })

  afterAll(async ()=>{
    browser.close()
  })


});
  

