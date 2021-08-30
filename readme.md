# Dopamyn Json-LD extractor

A damn simple tool to extract json-ld metadata from webpage using jquery like api (jQuery, Cheerio, CashDom ...).

## Installation

```
npm install --save @dopamyn/jsonld-extract
```

## Tested APIs

* jQuery
* Cheerio
* CashDom

## Usage example (Nodejs)

```javascript
import jsonldextract from '@dopamyn/jsonld-extract';
import cheerio from 'cheerio';

const $ = cheerio.load( html );
const $jsonld = jsonldextract($);

const data = $jsonld('product.name');

console.log('Extracted data:', data);
```
