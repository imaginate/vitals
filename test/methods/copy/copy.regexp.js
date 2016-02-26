/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.regexp
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('copy.regexp', function() {

  should('return a clone of the regex', function() {

    test(/re/, function() {
      var re = freeze(/re/);
      var cp = vitals.copy.regex(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === false );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });

    test(/re/ig, function() {
      var re = freeze(/re/ig);
      var cp = vitals.copy.regex(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === true );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });
  });

  should('override the global regex flag', function() {

    test(/re/, true, function() {
      var re = freeze(/re/);
      var cp = vitals.copy.regex(re, true);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === true );
      assert( cp.source === re.source );
      assert( cp.global !== re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });

    test(/re/ig, false, function() {
      var re = freeze(/re/ig);
      var cp = vitals.copy.regex(re, false);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === false );
      assert( cp.source === re.source );
      assert( cp.global !== re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.copy.regex();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.copy.regex(null);
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.copy.regex({});
      }, validTypeErr);
    });

    test(/re/, 'fail', function() {
      assert.throws(function() {
        vitals.copy.regex(/re/, 'fail');
      }, validTypeErr);
    });
  });
});
