/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.type
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
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

method('cut.type', function() {

  should('delete props from obj where is(type, value)', function() {

    test('<object>', 'string', function() {
      var obj1 = {
        a:  1,   b:  2,
        c: 'd',  e: 'f',
        g: null, h: null
      };
      var obj2 = vitals.cut.type(obj1, 'string');
      assert(  hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( !hasOwn(obj2, 'e') );
      assert(  hasOwn(obj2, 'g') );
      assert(  hasOwn(obj2, 'h') );
      assert( obj1 === obj2 );
    });

    test('<object>', 'number', function() {
      var obj1 = {
        a:  1,   b:  2,
        c: 'd',  e: 'f',
        g: null, h: null
      };
      var obj2 = vitals.cut.type(obj1, 'number');
      assert( !hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert(  hasOwn(obj2, 'e') );
      assert(  hasOwn(obj2, 'g') );
      assert(  hasOwn(obj2, 'h') );
      assert( obj1 === obj2 );
    });

    test('<object>', 'object', function() {
      var obj1 = {
        a:  1,   b:  2,
        c: 'd',  e: 'f',
        g: null, h: null
      };
      var obj2 = vitals.cut.type(obj1, 'object');
      assert(  hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert(  hasOwn(obj2, 'e') );
      assert( !hasOwn(obj2, 'g') );
      assert( !hasOwn(obj2, 'h') );
      assert( obj1 === obj2 );
    });

    test('<object>', 'string|number', function() {
      var obj1 = {
        a:  1,   b:  2,
        c: 'd',  e: 'f',
        g: null, h: null
      };
      var obj2 = vitals.cut.type(obj1, 'string|number');
      assert( !hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( !hasOwn(obj2, 'e') );
      assert(  hasOwn(obj2, 'g') );
      assert(  hasOwn(obj2, 'h') );
      assert( obj1 === obj2 );
    });
  });

  should('splice props from array where is(type, value)', function() {

    test('<array>', 'string', function() {
      var arr1 = [ 1, 2, 'a', 'b', null, null ];
      var arr2 = vitals.cut.type(arr1, 'string');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === null );
      assert( arr2[3] === null );
      assert( arr2.length === 4 );
    });

    test('<array>', 'number', function() {
      var arr1 = [ 1, 2, 'a', 'b', null, null ];
      var arr2 = vitals.cut.type(arr1, 'number');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 'a' );
      assert( arr2[1] === 'b' );
      assert( arr2[2] === null );
      assert( arr2[3] === null );
      assert( arr2.length === 4 );
    });

    test('<array>', 'object', function() {
      var arr1 = [ 1, 2, 'a', 'b', null, null ];
      var arr2 = vitals.cut.type(arr1, 'object');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 'a' );
      assert( arr2[3] === 'b' );
      assert( arr2.length === 4 );
    });

    test('<array>', 'string|number', function() {
      var arr1 = [ 1, 2, 'a', 'b', null, null ];
      var arr2 = vitals.cut.type(arr1, 'string|number');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === null );
      assert( arr2[1] === null );
      assert( arr2.length === 2 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.type();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.cut.type({});
      }, validTypeErr);
    });

    test({}, 1, function() {
      assert.throws(function() {
        vitals.cut.type({}, 1);
      }, validTypeErr);
    });

    test({}, 'a', function() {
      assert.throws(function() {
        vitals.cut.type({}, 'a');
      }, validRangeErr);
    });

    test(null, 'string', function() {
      assert.throws(function() {
        vitals.cut.type(null, 'string');
      }, validTypeErr);
    });
  });
});
