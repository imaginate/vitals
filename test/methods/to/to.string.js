/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.STRING
 * -----------------------------------------------------------------------------
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/blob/master/src/methods/to.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.to.string (section:base)', function() {
  var title;

  title = titleStr('should convert value to string');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.to.str(null);
      assert( result === 'null' );
    });

    title = callStr(undefined);
    it(title, function() {
      var result = vitals.to.str(undefined);
      assert( result === 'undefined' );
    });

    title = callStr(true);
    it(title, function() {
      var result = vitals.to.str(true);
      assert( result === 'true' );
    });

    title = callStr('str');
    it(title, function() {
      var result = vitals.to.str('str');
      assert( result === 'str' );
    });

    title = callStr(10);
    it(title, function() {
      var result = vitals.to.str(10);
      assert( result === '10' );
    });

    title = callStr(NaN);
    it(title, function() {
      var result = vitals.to.str(NaN);
      assert( result === 'NaN' );
    });

    title = callStr({ a: 1, b: 2 });
    it(title, function() {
      var result = vitals.to.str({ a: 1, b: 2 });
      assert( result === '[object Object]' );
    });

    title = callStr([ 1, 2, 3 ]);
    it(title, function() {
      var result = vitals.to.str([ 1, 2, 3 ]);
      assert( result === '1,2,3' );
    });

    title = callStr(function(){});
    it(title, function() {
      var result = vitals.to.str(function(){});
      assert( result === 'function (){}' );
    });

    title = callStr(/regex/g);
    it(title, function() {
      var result = vitals.to.str(/regex/g);
      assert( result === '/regex/g' );
    });

    title = callStr( (function(){ return arguments; })(1, 2, 3) );
    it(title, function() {
      var args = (function(){ return arguments; })(1, 2, 3);
      var result = vitals.to.str(args);
      assert( result === '[object Arguments]' );
    });

  });

  title = titleStr('should join array with separator');
  describe(title, function() {

    title = callStr([ 1, 2, 3 ], '--');
    it(title, function() {
      var result = vitals.to.str([ 1, 2, 3 ], '--');
      assert( result === '1--2--3' );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.to.str();
      });
    });

    title = callStr([], false);
    it(title, function() {
      assert.throws(function() {
        vitals.to.str([], false);
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(shouldMsg) {
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('to.str', arguments, 3);
}
