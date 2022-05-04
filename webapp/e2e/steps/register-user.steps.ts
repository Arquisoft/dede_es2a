import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-user.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;


defineFeature(feature, test => {
  
  jest.setTimeout(100000)
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo: 150 });
      //: await puppeteer.launch({ headless: true });
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
    let numeroUsuario = Math.random()*100000;

    given('The application without user in session',async () => {
        email = "usuarioPrueba"+ numeroUsuario +"@gmail.com"
        password = "usuarioPrueba-000"
    });

    when('We press the register button and fill the form', async () => {

      // Presionamos el botón de registro de la barra de navegación
      const registerButton = await page.$('button#registerButton');
      await registerButton!.click();
      await page.waitForNavigation();

      //Clickamos el boton de registro pero de auth0 esta vez
      //await expect(page).toClick("a[href='#']");
      //await expect(page).toClick('a', { text: 'Sign Up' })
      const signupButton = await page.$('a[href="#"]');
      await signupButton!.click();
      await signupButton!.click();
      await page.$('a[href="#"]')
      // Rellenamos el formulario
      await expect(page).toFill("input[name='email']", email);
      await expect(page).toFill("input[name='password']", password);

      // Clickamos el submit sign up
      await expect(page).toClick("button[name='submit']");
      await page.waitForNavigation();

      // Clickamos el submit "Aceptar" para dar permisos en nuestra aplicacion
      await expect(page).toClick("button[value='accept']");
      await page.waitForNavigation();
    });

    then('Disconnection text appears', async () => {
      //En consecuencia, debería aparecer la palabra desconectar.
      await delay(1500);
      await expect(page).toMatch('Desconectarse');
    });
  })

  afterAll(async ()=>{
    browser.close()
  })


});
  

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
