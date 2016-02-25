/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.type
 * -----------------------------------------------------------------------------
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.cut.type (section:base)', function() {
  var title;

  title = titleStr('should delete props from obj where is(type, value)');
  describe(title, function() {

    title = callStr('<object>', 'string');
    it(title, function() {
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

    title = callStr('<object>', 'number');
    it(title, function() {
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

    title = callStr('<object>', 'object');
    it(title, function() {
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

    title = callStr('<object>', 'string|number');
    it(title, function() {
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

  title = titleStr('should splice props from array where is(type, value)');
  describe(title, function() {

    title = callStr('<array>', 'string');
    it(title, function() {
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

    title = callStr('<array>', 'number');
    it(title, function() {
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

    title = callStr('<array>', 'object');
    it(title, function() {
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

    title = callStr('<array>', 'string|number');
    it(title, function() {
      var arr1 = [ 1, 2, 'a', 'b', null, null ];
      var arr2 = vitals.cut.type(arr1, 'string|number');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === null );
      assert( arr2[1] === null );
      assert( arr2.length === 2 );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type();
      }, validTypeErr);
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type({});
      }, validTypeErr);
    });

    title = callStr({}, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type({}, 1);
      }, validTypeErr);
    });

    title = callStr({}, 'a');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type({}, 'a');
      }, validRangeErr);
    });

    title = callStr(null, 'string');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type(null, 'string');
      }, validTypeErr);
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
  return testCall('cut.type', arguments, 3);
}
