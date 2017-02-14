var assert = require('assert');
// var tipCalculator = require('../tipCalculator');
import tipCalculator from '../tipCalculator';
var CONFIG = require('../config');
let test = new tipCalculator(CONFIG.INPUT_VALUE.AMOUNT, CONFIG.INPUT_VALUE.RATE);
let test2 = new tipCalculator(CONFIG.INPUT_VALUE_2.AMOUNT, CONFIG.INPUT_VALUE_2.RATE);

describe('tipCalculator', function() {
  describe('test #1', function() {
    it('should print out bill amount to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE.AMOUNT,
            test.getAmount()
        );
    });
    
    it('should print out tip rate to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE.RATE,
            test.getRate()
        );
    });
    
    it('should print out tip amount to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE.TIP,
            test.getTip()
        );
    });
    
    it('should print out total amount to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE.TOTAL,
            test.getTotal()
        );
    });
  });
  
  describe('test #2', function() {
    it('should print out bill amount to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE_2.AMOUNT,
            test2.getAmount()
        );
    });
    
    it('should print out tip rate to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE_2.RATE,
            test2.getRate()
        );
    });
    
    it('should print out tip amount to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE_2.TIP,
            test2.getTip()
        );
    });
    
    it('should print out total amount to command line', function() {
      assert.equal(
            CONFIG.EXPECT_VALUE_2.TOTAL,
            test2.getTotal()
        );
    });
  });
});