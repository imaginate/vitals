/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.string
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.to docs](https://github.com/imaginate/vitals/wiki/vitals.to)
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

method('to.string', 'to.str', function() {

  should('convert value to string', function() {

    test(null, function() {
      var result = vitals.to.str(null);
      assert( result === 'null' );
    });

    test(undefined, function() {
      var result = vitals.to.str(undefined);
      assert( result === 'undefined' );
    });

    test(true, function() {
      var result = vitals.to.str(true);
      assert( result === 'true' );
    });

    test('str', function() {
      var result = vitals.to.str('str');
      assert( result === 'str' );
    });

    test(10, function() {
      var result = vitals.to.str(10);
      assert( result === '10' );
    });

    test(NaN, function() {
      var result = vitals.to.str(NaN);
      assert( result === 'NaN' );
    });

    test({ a: 1, b: 2 }, function() {
      var result = vitals.to.str({ a: 1, b: 2 });
      assert( result === '[object Object]' );
    });

    test([ 1, 2, 3 ], function() {
      var result = vitals.to.str([ 1, 2, 3 ]);
      assert( result === '1,2,3' );
    });

    test('<function>', function() {
      var result = vitals.to.str(function(){});
      assert( result === 'function (){}' );
    });

    test(/regex/g, function() {
      var result = vitals.to.str(/regex/g);
      assert( result === '/regex/g' );
    });

    test('<arguments>', function() {
      var args = (function(){ return arguments; })(1, 2, 3);
      var result = vitals.to.str(args);
      assert( result === '[object Arguments]' );
    });
  });

  should('join array with separator', function() {

    test([ 1, 2, 3 ], '--', function() {
      var result = vitals.to.str([ 1, 2, 3 ], '--');
      assert( result === '1--2--3' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.str();
      }, validErr);
    });

    test([], false, function() {
      assert.throws(function() {
        vitals.to.str([], false);
      }, validTypeErr);
    });
  });
});
