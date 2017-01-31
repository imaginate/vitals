/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('copy', function() {

  should('return a clone of the primitive', function() {

    test(null, function() {
      var val = vitals.copy(null);
      assert( val === null );
    });

    test(undefined, function() {
      var val = vitals.copy(undefined);
      assert( val === undefined );
    });

    test(true, function() {
      var val = vitals.copy(true);
      assert( val === true );
    });

    test('string', function() {
      var val = vitals.copy('string');
      assert( val === 'string' );
    });

    test(5, function() {
      var val = vitals.copy(5);
      assert( val === 5 );
    });

    test(NaN, function() {
      var val = vitals.copy(NaN);
      assert( is.nan(val) );
    });
  });

  should('return a clone of the object', function() {

    test('<object>', function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy(obj);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b === cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });

    test('<object>', true, function() {
      var obj = freeze({ a: 1, b: { d: 2 }, c: 3 }, true);
      var cp = vitals.copy(obj, true);
      assert( obj !== cp );
      assert( obj.a === cp.a );
      assert( obj.b !== cp.b );
      assert( obj.c === cp.c );
      assert( obj.b.d === cp.b.d );
    });
  });

  should('return a clone of the regex', function() {

    test(/re/, function() {
      var re = freeze(/re/);
      var cp = vitals.copy(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === false );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });

    test(/re/ig, function() {
      var re = freeze(/re/ig);
      var cp = vitals.copy(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === true );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });
  });

  should('return a clone of the array', function() {

    test('<array>', function() {
      var arr = freeze([ 1, { b: 2 }, 3 ], true);
      var cp = vitals.copy(arr);
      assert( arr !== cp );
      assert( arr[0] === cp[0] );
      assert( arr[1] === cp[1] );
      assert( arr[2] === cp[2] );
      assert( arr[1].b === cp[1].b );
    });

    test('<array>', true, function() {
      var arr = freeze([ 1, { b: 2 }, 3 ], true);
      var cp = vitals.copy(arr, true);
      assert( arr !== cp );
      assert( arr[0] === cp[0] );
      assert( arr[1] !== cp[1] );
      assert( arr[2] === cp[2] );
      assert( arr[1].b === cp[1].b );
    });
  });

  should('return a clone of the function', function() {

    test('<function>', function() {
      var func = newFunc();
      var cp = vitals.copy(func);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b === cp.b );
      assert( func.b.c === cp.b.c );
    });

    test('<function>', true, function() {
      var func = newFunc();
      var cp = vitals.copy(func, true);
      assert( func !== cp );
      assert( func() === cp() );
      assert( func.a === cp.a );
      assert( func.b !== cp.b );
      assert( func.b.c === cp.b.c );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.copy();
      }, validErr);
    });

    test({}, 'fail', function() {
      assert.throws(function() {
        vitals.copy({}, 'fail');
      }, validTypeErr);
    });
  });
});

/**
 * @private
 * @return {function}
 */
function newFunc() {

  /** @type {function} */
  var func;

  func = function testFunc() { return 5; };
  func.a = 1
  func.b = { c: 2 };
  return freeze(func, true);
}
