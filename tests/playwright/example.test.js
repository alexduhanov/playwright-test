const playwright = require('playwright');

let browser;

describe('Example playwright setup', () => {
  beforeAll(async () => {
    browser = await playwright['chromium'].launch({
      headless: false,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('1', async () => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://www.example.com');
    await context.close();
  });

  test('2', async () => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://www.example.com');
    await context.close();
  });
});
