import cnab from '../index.js'

QUnit.module('add', hooks => {
  QUnit.test('two numbers', assert => {
    assert.equal(1 + 2, 3);
  });
});
