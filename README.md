[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads-per-month]][npm-trends]
![Geins][mit-shield]

[![Start Geins Free Trial][geins-tiral-img]][geins-tiral-url] [![Geins Docs][geins-docs-img]][geins-docs-url]

[![geins-klavyio](https://raw.githubusercontent.com/geins-io/resources/master/images/banners/repos/geins-klaviyo.jpg)](https://www.geins.io)

# Klaviyo Marketing Automation module for Geins PWA Storefront

A module for Geins PWA Storefront Ralph that adds Klaviyo marketing automation to your storefront in seconds.

## Pre-requisites

- Geins Account and PWA Storefront Ralph. [Get a free trial here](https://www.geins.io)
- Klaviyo Account. [Get account here](https://www.klaviyo.com/)

## Description

This module will seamlessly integrate Klaviyo's powerful marketing automation capabilities into your Geins Storefront. With this module, you effortlessly boost your marketing efforts and customer engagement.

## Installation

### 1. Install the module

```bash
npm i @geins/ralph-module-klaviyo
```

### 2. Add the module to your Geins PWA Storefront Ralph

Add the module to your Geins PWA Storefront Ralph by adding the following line to your `nuxt.config.json` file:

```js
...
  modules: [
    [
      '@geins/ralph-module-klaviyo',
      {
          enabled: true,
          debug: true,
          companyId: 'your-klaviyo-site-id'
      }
    ]
  ]
```

h ## To use with Geins CMS (no-code)

#### 1. Add the module to your Geins PWA Storefront Ralph

Use the [@geins/ralph-module-cms-json-container](https://www.npmjs.com/package/@geins/ralph-module-cms-json-container)

```bash
npm i @geins/ralph-module-cms-json-container
```

#### 2. Add the module to your Geins PWA Storefront Ralph

Add module to your `nuxt.config.json` file:

```js
// nuxt.config.js

...
    modules: [
      '@geins/ralph-module-cms-json-container'
    ]
..
```

Set the `widgetRenderTypesComponents` in your `nuxt.config.json` file to use the `GeinsWidgetJsonContainer` component for the `JSON` widget type.

```js
// nuxt.config.js

...
  publicRuntimeConfig: {
      widgetRenderTypesComponents: {
        JSON: 'GeinsWidgetJsonContainer'
      },
  }
...
```

## Module Options

Add extra options to module configuration in `nuxt.config.json` file.
| Parameter | Default | Required | Example |
|-|-|-|-|
| enabled | `true` | Yes | Enables the module|
| debug | `false` | No | Enables debug info to console |
| companyId | none | Yes | Your Klaviyo Site ID [Klaviyo Account Settings](https://www.klaviyo.com/settings/account/api-keys) |

## Usage (event tracking)

The module will track activity on your site related to your users.

| Type of activity  | Event tracked                                        | Information tracked |
| ----------------- | ---------------------------------------------------- | ------------------- |
| Identify customer | User Login/Register, Newletter signup, Cart checkout | E-mail              |
| Viewed product    | Product clicked, Product page viewed                 | Product name & ID   |
| Added to cart     | Product added to cart                                | Product name & ID   |
| Checkout started  | User clicks to checkout cart                         | Products in cart    |

## Usage (sign-up forms)

Add a sign-up form to any desired page of your storefront. Either by cms or as a component. Add an id to the component to identify which Klaviyo form to render.

Currently only `Embed` type forms are possible. [Read here about sign-up forms in Klaviyo](https://help.klaviyo.com/hc/en-us/articles/360026474752)

## Components

Module adds two components to your storefront. `GeinsKlaviyoForm` and `GeinsWidgetKlaviyoForm`.

### GeinsKlaviyoForm

This component is used to show a specific sign-up form from Klaviyo. It is used by the `GeinsWidgetKlaviyoForm` component. You can use it directly in your page if you want to add the player directly to your page as a component. If you

```vue
<GeinsKlaviyoForm formId="your-form-id" />
```

### GeinsWidgetKlaviyoForm

The widget is a wrapper around the `GeinsKlaviyoForm` component. It is used to add the component via CMS. It is not needed if you add the component directly to your page.

#### Use with Geins CMS

Add a `JSON Widget` to your page in the [Geins CMS](https://docs.geins.io/docs/launchpads/web/content). Add the following JSON to your widget. Replace `your-form-id` with the id of Klaviyo sing-up form you want to register. You can find the id in your Klaviyo dashboard (Sign-up forms).

```json
{
  "renderWidget": "GeinsWidgetKlaviyoForm",
  "data": {
    "id": "your-form-id"
  }
}
```

## User consent - **Important!**

The Klaviyo module will only track customers activity if all cookies have been allowed. To be compliant add information about Klaviyo's tracking on your `cookies` page.

[npm]: https://img.shields.io/npm/v/@geins/ralph-module-klaviyo
[npm-url]: https://www.npmjs.com/package/@geins/ralph-module-klaviyo
[npm-downloads-per-month]: https://img.shields.io/npm/dm/@geins/ralph-module-klaviyo.svg
[npm-trends]: https://npmtrends.com/@geins/ralph-module-klaviyo
[geins-docs-url]: https://docs.geins.io
[geins-docs-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-docs-read-v3.json
[geins-tiral-url]: https://www.geins.io
[geins-tiral-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-fee-tiral.json
[mit-shield]: https://img.shields.io/badge/license-MIT-green
[mit-url]: https://en.wikipedia.org/wiki/MIT_License
