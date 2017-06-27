/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.boolean
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.to docs](https://github.com/imaginate/vitals/wiki/vitals.to)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('to.boolean', 'to.bool', function() {

  should('convert value to boolean', function() {

    test(null, function() {
      var result = vitals.to.bool(null);
      assert( result === false );
    });

    test(undefined, function() {
      var result = vitals.to.bool(undefined);
      assert( result === false );
    });

    test(true, function() {
      var result = vitals.to.bool(true);
      assert( result === true );
    });

    test('', function() {
      var result = vitals.to.bool('');
      assert( result === false );
    });

    test('str', function() {
      var result = vitals.to.bool('str');
      assert( result === true );
    });

    test(0, function() {
      var result = vitals.to.bool(0);
      assert( result === false );
    });

    test(10, function() {
      var result = vitals.to.bool(10);
      assert( result === true );
    });

    test(NaN, function() {
      var result = vitals.to.bool(NaN);
      assert( result === false );
    });

    test({ a: 1, b: 2 }, function() {
      var result = vitals.to.bool({ a: 1, b: 2 });
      assert( result === true );
    });

    test([ 1, 2, 3 ], function() {
      var result = vitals.to.bool([ 1, 2, 3 ]);
      assert( result === true );
    });

    test('<function>', function() {
      var result = vitals.to.bool(function(){});
      assert( result === true );
    });

    test(/regex/g, function() {
      var result = vitals.to.bool(/regex/g);
      assert( result === true );
    });

    test('<arguments>', function() {
      var args = (function(){ return arguments; })(1, 2, 3);
      var result = vitals.to.bool(args);
      assert( result === true );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.bool();
      }, validErr);
    });
  });
});
