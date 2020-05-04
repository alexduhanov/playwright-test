const express = require('express');
const path = require('path');
const playwright = require('playwright');

jest.setTimeout(30000);

describe('Example playwright setup', () => {
  let browser;

  beforeAll(async () => {
    const app = express();

    app.get('/test.html', (req, res) => res.sendFile(path.join(__dirname + '/test.html')));

    httpServer = require('http').createServer(app);
    httpServer.listen('3000');

    browser = await playwright['chromium'].launch({
      headless: false,
    });
  });

  afterAll(async () => {
    httpServer.close();
    await browser.close();
  });

  test('Example test', async () => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('localhost:3000/test.html');

    await page.waitForTimeout(20000);

    await context.close();
  });
});
