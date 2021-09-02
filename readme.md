# Json-LD Extractor

A damn simple tool to extract json-ld metadata from webpage using jquery like api (jQuery, Cheerio, CashDom ...).

[![npm](https://img.shields.io/npm/v/jsonld-extract)](https://www.npmjs.com/package/jsonld-extract)

## Installation

```bash
npm install --save jsonld-extract
```

## Tested APIs

* jQuery
* Cheerio
* CashDom

## Usage example (Nodejs)

```javascript
import jsonldextract from 'jsonld-extract';
import cheerio from 'cheerio';

const $ = cheerio.load( html );
const $jsonld = jsonldextract($);

const data = $jsonld('product.name');

console.log('Extracted data:', data);
```
