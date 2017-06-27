/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.value
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
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

method('cut.value', 'cut.val', function() {

  should('delete props from obj where value === val', function() {

    test('<object>', 'd', function() {
      var obj1 = { a: 'd', b: 'e', c: 'f' };
      var obj2 = vitals.cut.val(obj1, 'd');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    test('<object>', 2, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut.val(obj1, 2);
      assert(  hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    test('<object>', /d/g, function() {
      var obj1 = { a: 'd', b: 'e', c: 'f' };
      var obj2 = vitals.cut.val(obj1, /d/g);
      assert( hasOwn(obj2, 'a') );
      assert( hasOwn(obj2, 'b') );
      assert( hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });
  });

  should('splice props from array where value === val', function() {

    test('<array>', 1, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.val(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    test('<array>', 'b', function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.cut.val(arr1, 'b');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 'a' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    test('<array>', /a/g, function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.cut.val(arr1, /a/g);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 'a' );
      assert( arr2[1] === 'b' );
      assert( arr2[2] === 'c' );
      assert( arr2.length === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.val();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.cut.val({});
      }, validErr);
    });

    test(null, 1, function() {
      assert.throws(function() {
        vitals.cut.val(null, 1);
      }, validTypeErr);
    });
  });
});
