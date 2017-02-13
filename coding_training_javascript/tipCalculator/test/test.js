var assert = require('assert');
// var tipCalculator = require('../tipCalculator');
import tipCalculator from '../tipCalculator';
var CONFIG = require('../config');
let test = new tipCalculator(10, 15);

describe('tipCalculator', function() {
  describe('test #1', function() {
    it('should print out bill amount to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE.amount,
            test.getAmount()
        );
    });
    
    it('should print out tip rate to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE.rate,
            test.getRate()
        );
    });
  });
});