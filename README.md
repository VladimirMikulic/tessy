# Tessy

![Version](https://img.shields.io/npm/v/tessy)
![Cypress](https://img.shields.io/badge/Cypress-Yes-success)
![Selenium](https://img.shields.io/badge/Selenium-Absolutely-success)
![Pupeteer](https://img.shields.io/badge/Puppeteer-You%20know%20it!-success)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/VladimirMikulic/tessy)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](#)
[![Twitter: VladoDev](https://img.shields.io/twitter/follow/VladoDev.svg?style=social)](https://twitter.com/VladoDev)

> 🧪 Advanced Web Monetization testing library with powerful declarative API.

## Introduction

Tessy is [Web Monetization](https://webmonetization.org/) testing library. This guide assumes that you are familiar with Web Monetization and it's [core concepts](https://webmonetization.org/docs/explainer). Just to be clear, this is a testing library & **no real money** is ever transmitted. Library emulates "real" Web Monetization API which is currently available only with the Coil extension. I refer it to as "real" because it's not yet implemented by the browsers. It's still under development, so it will take quite some time until it becomes a standard.

The way that the library works is by firing fake Web Monetization events identical to the events from the "real" Web Monetization API. This allows you to test your website/app in Web Monetization enabled environment. It's especially useful if your website/app provides additional features to the users of Web Monetization and you want to make sure that those features are **bug-free** & **working as expected**.

## :package: Installation

```shell
# Installs the plugin and saves it as a development dependency
npm i tessy --save-dev
```

## :cloud: Usage

Currently, Tessy integrates with the 3 most popular e2e (end-to-end) testing frameworks. Don't let this fool you, Tessy is not limited to these frameworks only! The library exposes an API which allows you to use it with/without any framework/library. These integrations just provide "syntatic sugar" so you can focus on your tests rather than setting up the library.

### Cypress

You can wire up Tessy with Cypress by passing the object that Cypress gives us, `cy` to Tessy. The library will attach an additional method to `cy`, `visitMonetized` which allows you to open a web page with Web Monetization enabled (streaming).

- `visitMonetized(url, [visitOptions], [monetizationOptions])`

  **url** - URL to load (String)

  **visitOptions** - `visitMonetized` is just a wrapper with some magic around Cypress's `visit` method. Options that you would normally pass to `visit`, you pass here. (Object)

  **[monetizationOptions](#books-api)** (Object)

**Example usage:**

```javascript
// cypress/integration/your_test.js
require('tessy/api/cypress')(cy);

describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visitMonetized('https://testwebmonetization.com').then(window => {
      const monetizationEnabled =
        window.document.monetization.state === 'started';

      expect(monetizationEnabled).equal(true);
    });
  });
});
```

### Selenium

Passing Selenium's `driver` object to Tessy, `getMonetized` method is added to the `driver` object. `getMonetized`, opens the page with Web Monetization API enabled and streaming money. If you want to modify Web Monetization behavior, you can do so by passing options object as the second argument.

- `getMonetized(url, [monetizationOptions])` (async function)

  **url** - URL to load (String)

  **[monetizationOptions](#books-api)** (Object)

**Example usage:**

```javascript
// test_file.js
const tessy = require('tessy/api/selenium');
const { Builder } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  tessy(driver);

  await driver.getMonetized('https://testwebmonetization.com');
})();
```

### Puppeteer

Tessy integrates with Puppeteer by extending the `browser` object with an additional `newMonetizedPage` method. Just like with the previous two frameworks, Tessy tries to maintain a consistent & declarative API for each framework's ecosystem. Options can be passed as a second argument.

- `newMonetizedPage(url, [monetizationOptions])` (async function)

  **url** - URL to load (String)

  **[monetizationOptions](#books-api)** (Object)

**Example usage:**

```javascript
// test_file.js
const tessy = require('tessy/api/puppeteer');
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({
  args: ['--no-sandbox'],
  headless: false
});

const page = await browser.newMonetizedPage();
await page.goto('https://testwebmonetization.com');
```

### Standalone Usage

Apart from the framework integrations above, Tessy can be used standalone. This proves useful with older setups. (eg. fixtures)

**Example usage**:

```javascript
// index.js (This needs to be bundled to be used in a browser with a module bundler like Parcel or Webpack)
import {
  initPluginOptions,
  initWebMonetizationAPI,
  simulateWebMonetization
} from 'tessy';

const {
  initPluginOptions,
  initWebMonetizationAPI,
  simulateWebMonetization
} = require('../src/index');

initMonetizationAPI(window);

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    // initPluginOptions(); OPTIONAL
    simulateWebMonetization(window);
  }
};
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tessy Example</title>
    <!-- Make sure to load Tessy in the <head> before your web monetization listeners (example below) -->
    <script src="tessy-bundle.js"></script>
  </head>

  <body>
    <h1>Tessy</h1>

    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore natus
      ut alias fugit, eaque ipsa voluptatem. Soluta inventore, nihil doloribus
      placeat eligendi, illum deserunt facere laudantium aliquam vero veniam
      commodi.
    </p>

    <script>
      if (document.monetization) {
        // Monetization Start Event.
        document.monetization.addEventListener('monetizationstart', function (
          event
        ) {
          // e.g "Thank you" modal for supporting web monetization ...
          console.log('monetizationstarted', event);
        });

        // Monetization Progress Event.
        document.monetization.addEventListener(
          'monetizationprogress',
          function (event) {
            // e.g. Unlock bonus content ...
            console.log('monetizationprogress', event);
          }
        );
      }
    </script>
  </body>
</html>
```

## :books: API

### Tessy

- `monetizationOptions`

  ```javascript
  {
      // Amount of money to stream every second (default: "1000")
      amount: "0.0001",
      // Currency (default: "USD")
      assetCode: "AUD",
      // The scale of the amount (default: 9)
      assetScale: 5,
      // Pointer to the test wallet (default: web monetization meta tag on the page)
      paymentPointer "$coil.xrptipbot.com/LKAS89_AFOI82"
  }
  ```

### Web Monetization

Tessy exposes some useful methods on `document.monetization` API that allow you to completely be in the charge of your Web Monetized environment.

- `pauseMonetization([ms])`

  **ms** - number of milliseconds to pause monetization events (progressevent)

  Pauses monetization for a number of `ms`. If it's not specified, then monetization is paused until it is explicitly resumed again. (resumeMonetization())

- `resumeMonetization()`

  Resumes previously paused monetization.

- `emit(event)`

  **event** - Monetization event to emit. Web Monetization has 4 main events (`monetizationstart`, `monetizationprogress`, `monetizationpending`, `monetizationstopped`)

  This is a very powerful function and you can test any state of the web monetization in your app to see how it behaves and identify potential bugs.

## :sparkles: Run tests

The library uses [Jest](https://jestjs.io/) for running tests.

Jest will execute all `.test.js` files in the `test` folder.

```sh
npm test
```

## :man: Author

**Vladimir Mikulic**

- Twitter: [@VladoDev](https://twitter.com/VladoDev)
- Github: [@VladimirMikulic](https://github.com/VladimirMikulic)
- LinkedIn: [@vladimirmikulic](https://www.linkedin.com/in/vladimir-mikulic/)

## :handshake: Contributing

Contributions, issues and feature requests are welcome!

## :pencil: License

This project is licensed under [MIT](https://opensource.org/licenses/MIT) license.

## :man_astronaut: Show your support

Give a ⭐️ if this project helped you!
