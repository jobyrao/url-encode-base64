'use strict';

const { expect } = require('chai');
const { urlEncode, urlDecode } = require('../dist/url-encode-base64.cjs.min');

describe('测试小码点字符', function() {
  const encoded = urlEncode('hi, ok');

  it('编码正常', function() {
    expect(encoded).to.be.equal('aGksIG9r');
  });
  it('解码正常', function() {
    const decoded = urlDecode(encoded);
    expect(decoded).to.be.equal('hi, ok');
  });
  it('空验证', function() {
    const decoded = urlEncode('');
    expect(decoded).to.be.equal('');
  });
});

describe('测试大码点字符', function() {
  const encoded = urlEncode('💩');

  it('编码正常', function() {
    expect(encoded).to.be.equal('8J_SqQ==');
  });
  it('解码正常', function() {
    const decoded = urlDecode(encoded);
    expect(decoded).to.be.equal('💩');
  });
});
