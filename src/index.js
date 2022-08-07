'use strict';

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

/**
 * 用于 url 上传输的字符串编码，尽可能的减少字符数
 * @param {string} text
 * @returns {string}
 */
export function urlEncode(text) {
  if (!text) return '';

  const base64Chars = BASE64_CHARS;
  // 对内容 URI 编码（utf8）
  const URIString = encodeURIComponent(text);

  // 取 utf8 编码后的内容（去掉 %）的二进制字符串 10101...
  let binaryString = '';
  for (let i = 0, len = URIString.length; i < len; i++) {
    const char = URIString[i];
    if (char === '%') {
      const hex = URIString[i + 1] + URIString[i + 2];
      binaryString += parseInt(hex, 16).toString(2).padStart(8, '0');
      i += 2;
    } else {
      binaryString += char.charCodeAt().toString(2).padStart(8, '0')
    }
  }

  // binaryString 为 8 的倍数，按 base64 6 位读取的方式（可能）需要补全
  let remainderBit = binaryString.length % 6;
  let padEndBase64CharNum = 0; // base64 最后补充符号 = 的个数
  if (remainderBit !== 0) {
    let padEndBit = 0;

    while (remainderBit % 6 !== 0) { // 补全后能整除，最多会有 2 次
      remainderBit += 8;
      padEndBit += 8;
    }
    // 最后的 000000 不要补到 binaryString 后，而是在 base64 最后补 = 符
    padEndBase64CharNum = Math.floor(padEndBit / 6);
    binaryString += ''.padEnd(padEndBit - padEndBase64CharNum * 6, '0');
  }

  // 从 10101... 中按 6 位读取转 base64
  let base64String = '';
  for (let i = 0, len = binaryString.length; i < len; i += 6) {
    const bit6Str= binaryString.substr(i, 6);
    base64String += base64Chars[parseInt(bit6Str, 2)];
  }

  return base64String + ''.padEnd(padEndBase64CharNum, '=');
}

/**
 * 解码 urlEncode 生成的 base64 串
 * @param {string} base64
 * @returns {string}
 */
export function urlDecode(base64) { // '8J_SqfCfkqnwn5Kp'
  const base64Chars = BASE64_CHARS;
  const base64CharMap = {}; // A => 0 的 map 结构
  Object.values(base64Chars).forEach((val, i) => {
    base64CharMap[val] = i;
  });

  let binaryString = ''; // 原 base64 最后可能有 = 符号，得到的 binaryString 是除去最后的（补位 0）* 6
  for (let i = 0, len = base64.length; i < len; i++) {
    const char = base64[i];
    if (char !== '=') {
      binaryString += base64CharMap[char].toString(2).padStart(6, '0'); // base64 每 6 个 bit 读取和填充
    }
  }

  let URIString = '';
  for (let i = 0, len = binaryString.length; i + 8 <= len; i += 8) {
    const charBinaryStr = binaryString.substr(i, 8);
    const n = parseInt(charBinaryStr, 2);
    URIString += (n < 128 && ~~n !== 37) ? String.fromCodePoint(n) : `%${n.toString(16)}`;
  }
  return decodeURIComponent(URIString);
}
