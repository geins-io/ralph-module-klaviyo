[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads-per-month]][npm-trends]

[![Start Geins Free Trial][geins-tiral-img]][geins-tiral-url] [![Geins Docs][geins-docs-img]][geins-docs-url]

# Klaviyo Marketing Automation module for Geins PWA Storefront

A module for Geins PWA Storefront Ralph that adds Klaviyo marketing automation to your storefront in seconds.

## Pre-requisites

- Geins Account and PWA Storefront Ralph. [Get a free trial here](https://www.geins.io)
- Klaviyo Account. [Get account here](https://www.klaviyo.com/)

## Description

This module will seamlessly integrate Klaviyo's powerful email marketing and automation capabilities into your Geins Storefront. With this module, you effortlessly boost your marketing efforts and customer engagement.

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
      '@geins/ralph-module-streamify',
      {
          enabled: true,
          debug: true,
          companyId: 'your-klaviyo-site-id'
          apiKey: 'your-private-klaviyo-api-key'
      }
    ]
  ]
```

## Module Options

Add extra options to module configuration in `nuxt.config.json` file.
| Parameter | Default | Required | Example |
|-|-|-|-|
| enabled | `true` | Yes | Enables the module|
| debug | `false` | No | Enables debug info to console |
| companyId | none | Yes | Your Klaviyo Site ID [Klaviyo Account Sttings](https://www.klaviyo.com/settings/account/api-keys) |
| apiKey | none | No | Your private Klaviyo API-key [Klaviyo Account Sttings](https://www.klaviyo.com/settings/account/api-keys)|

## Usage

The module will track activity on your site related to your users.

| Type of activity | Event tracked | Information tracked |
|-|-|-|
| Identify customer | User Login/Register, Newletter signup, Cart checkout | E-mail, telephone number |
| Viewed product | Product clicked, Product page viewed | Product name & ID |
| Added to cart | Product added to cart | Product name & ID |
| Checkout started | User clicks to checkout cart | Products in cart |
| Purchase completed | User completes a purchase | All purchased products |

## User consent **(important!)**

Klaviyo will only track customers activity if all cookies have been allowed. Please add information about Klaviyo's tracking on your `/cookies` page.


[npm]: https://img.shields.io/npm/v/@geins/ralph-module-streamify
[npm-url]: https://www.npmjs.com/package/@geins/ralph-module-streamify
[npm-downloads-per-month]: https://img.shields.io/npm/dm/@geins/ralph-module-streamify.svg
[npm-trends]: https://npmtrends.com/@geins/ralph-module-streamify
[geins-docs-url]: https://docs.geins.io
[geins-docs-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-docs-read-v3.json
[geins-tiral-url]: https://www.geins.io
[geins-tiral-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-fee-tiral.json