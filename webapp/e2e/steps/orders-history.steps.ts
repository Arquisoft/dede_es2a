import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/orders-history.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  jest.setTimeout(100000)
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    //: await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/productos", {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });
  test('The orders history has orders', ({ given, when, then }) => {
    let email: string;
    let password: string;

    given('A user with some orders', async () => {
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

    });

    when('I click the orders history button', async () => {

      //Nos desplazamos a pedidos
      
      await expect(page).toClick("a[href='pedidos']");
      await page.waitForNavigation();
    });

    then('Orders must be seen', async () => {
      //En consecuencia, debería aparecer la palabra bakugan, ya que este usuario de prueba tenia un pedido con bakugans
      await expect(page).toMatch('Bakugan',{timeout:6000})
    });
  })

  afterAll(async () => {
    browser.close()
  })


});
