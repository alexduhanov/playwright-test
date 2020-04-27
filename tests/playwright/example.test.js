const express = require('express');
const path = require('path');
const playwright = require('playwright');

jest.setTimeout(30000);

describe('Example playwright setup', () => {
  beforeAll(async () => {
    const app = express();

    app.get('/test.html', (req, res) => res.sendFile(path.join(__dirname + '/test.html')));

    httpServer = require('http').createServer(app);
    httpServer.listen('3000');
  });

  afterAll(async () => {
    httpServer.close();
  });

  test('Example test', async () => {
    const browser = await playwright['chromium'].launch({
      headless: false,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('localhost:3000/test.html');

    await page.waitForSelector('"Hello World"');

    await Promise.all([
      context.waitForEvent('page'),
      page.click('"Submit"'),
    ]);

    const page2 = await context.pages()[1];
    await page2.waitForSelector('"Example Domain"');

    await Promise.all([
      context.waitForEvent('page'),
      page.click('"Submit"'),
    ]);

    await browser.close();
  });
});
