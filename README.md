# url-encode-base64

[![npm version](https://img.shields.io/npm/v/url-encode-base64.svg?style=flat)](https://www.npmjs.com/package/url-encode-base64)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jobyrao/url-encode-base64/Continuous%20integration)
[![codecov](https://codecov.io/gh/jobyrao/url-encode-base64/branch/master/graph/badge.svg?token=OK5M7HAAU7)](https://codecov.io/gh/jobyrao/url-encode-base64)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/url-encode-base64)
[![GitHub issues](https://img.shields.io/github/issues/jobyrao/url-encode-base64)](https://github.com/jobyrao/url-encode-base64/issues)
[![license](https://img.shields.io/github/license/jobyrao/url-encode-base64.svg)](https://tldrlegal.com/license/mit-license)

## Introduction
Better than "encodeURIComponent" to reduce character overhead.

## Getting Started
### Install
Browser:
```html
<script src="dist/url-encode-base64.umd.min.js"></script>
```
<details>
  <summary><b>CDN Availability</b> (click to show)</summary>

|  |  |
| ---------- | -----------|
| unpkg   | https://unpkg.com/url-encode-base64/ |
| jsDelivr | https://jsdelivr.com/package/npm/url-encode-base64 |

</details>

With npm:

```bash
$ npm i url-encode-base64 --save
```

### Usage

Commonjs
```JavaScript
const { urlEncode, urlDecode } = require('url-encode-base64');
const encoded = urlEncode('💩💩💩');
console.log(encoded, encoded.length); // '8J_SqfCfkqnwn5Kp' 16
console.log(urlDecode(encoded)); // '💩💩💩'

const encoded2 = encodeURIComponent('💩💩💩');
console.log(encoded2, encoded2.length); // '%F0%9F%92%A9%F0%9F%92%A9%F0%9F%92%A9' 36

```
ES Module
```js
import { urlEncode, urlDecode } from 'url-encode-base64';
```
UMD
```html
<script src="dist/url-encode-base64.umd.min.js"></script>

<script type="text/javascript">
  const { urlEncode, urlDecode } = urlEncodeBase64;
</script>
```

## License

[MIT](LICENSE)
