/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.value
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

describe('vitals.cut.value (section:base)', function() {
  var title;

  title = titleStr('should delete props from obj where value === val');
  describe(title, function() {

    title = callStr('<object>', 'd');
    it(title, function() {
      var obj1 = { a: 'd', b: 'e', c: 'f' };
      var obj2 = vitals.cut.val(obj1, 'd');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', 2);
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut.val(obj1, 2);
      assert(  hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', /d/g);
    it(title, function() {
      var obj1 = { a: 'd', b: 'e', c: 'f' };
      var obj2 = vitals.cut.val(obj1, /d/g);
      assert( hasOwn(obj2, 'a') );
      assert( hasOwn(obj2, 'b') );
      assert( hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });
  });

  title = titleStr('should splice props from array where value === val');
  describe(title, function() {

    title = callStr('<array>', 1);
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.val(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    title = callStr('<array>', 'b');
    it(title, function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.cut.val(arr1, 'b');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 'a' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    title = callStr('<array>', /a/g);
    it(title, function() {
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

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.val();
      }, validTypeErr);
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.cut.val({});
      }, validErr);
    });

    title = callStr(null, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.val(null, 1);
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
  return testCall('cut.val', arguments, 3);
}
