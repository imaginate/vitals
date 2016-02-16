/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.BOOLEAN
 * -----------------------------------------------------------------------------
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/wiki/vitals.to}
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

describe('vitals.to.boolean (section:base)', function() {
  var title;

  title = titleStr('should convert value to boolean');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.to.bool(null);
      assert( result === false );
    });

    title = callStr(undefined);
    it(title, function() {
      var result = vitals.to.bool(undefined);
      assert( result === false );
    });

    title = callStr(true);
    it(title, function() {
      var result = vitals.to.bool(true);
      assert( result === true );
    });

    title = callStr('');
    it(title, function() {
      var result = vitals.to.bool('');
      assert( result === false );
    });

    title = callStr('str');
    it(title, function() {
      var result = vitals.to.bool('str');
      assert( result === true );
    });

    title = callStr(0);
    it(title, function() {
      var result = vitals.to.bool(0);
      assert( result === false );
    });

    title = callStr(10);
    it(title, function() {
      var result = vitals.to.bool(10);
      assert( result === true );
    });

    title = callStr(NaN);
    it(title, function() {
      var result = vitals.to.bool(NaN);
      assert( result === false );
    });

    title = callStr({ a: 1, b: 2 });
    it(title, function() {
      var result = vitals.to.bool({ a: 1, b: 2 });
      assert( result === true );
    });

    title = callStr([ 1, 2, 3 ]);
    it(title, function() {
      var result = vitals.to.bool([ 1, 2, 3 ]);
      assert( result === true );
    });

    title = callStr(function(){});
    it(title, function() {
      var result = vitals.to.bool(function(){});
      assert( result === true );
    });

    title = callStr(/regex/g);
    it(title, function() {
      var result = vitals.to.bool(/regex/g);
      assert( result === true );
    });

    title = callStr( (function(){ return arguments; })(1, 2, 3) );
    it(title, function() {
      var args = (function(){ return arguments; })(1, 2, 3);
      var result = vitals.to.bool(args);
      assert( result === true );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.to.bool();
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
  return testCall('to.bool', arguments, 3);
}
