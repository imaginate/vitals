/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut
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

describe('vitals.cut (section:base)', function() {
  var title;

  title = titleStr('should delete props from obj where obj owns key');
  describe(title, function() {

    title = callStr('<object>', 'a');
    it(title, function() {
      var obj1 = { 'a': 1, 'b': 2, 'c': 3 };
      var obj2 = vitals.cut(obj1, 'a');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', 'a', 'b');
    it(title, function() {
      var obj1 = { 'a': 1, 'b': 2, 'c': 3 };
      var obj2 = vitals.cut(obj1, 'a', 'b');
      assert( !hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    // Note that `vitals.cut` decides which method of removing properties from a
    //   non-array object to use based upon the type of the first given value.

    // Below you will see two examples that demonstrate `vitals.cut` only
    //   removing properties where the object [owns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
    //   the key of the string conversion of one of the values
    //   because the first value is a string.

    title = callStr('<object>', 'a', 2);
    it(title, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var obj2 = vitals.cut(obj1, 'a', 2);
      assert( !hasOwn(obj2, 'a')  );
      assert(  hasOwn(obj2, 'b')  );
      assert(  hasOwn(obj2, 'c')  );
      assert(  hasOwn(obj2, '1')  );
      assert( !hasOwn(obj2, '2')  );
      assert(  hasOwn(obj2, '3')  );
      assert(  hasOwn(obj2, 'a1') );
      assert(  hasOwn(obj2, 'b2') );
      assert(  hasOwn(obj2, 'c3') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', [ 'a', 'b', 2, /^[0-9]$/ ]);
    it(title, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var keys = [ 'a', 'b', 2, /^[0-9]$/ ];
      var obj2 = vitals.cut(obj1, keys);
      assert( !hasOwn(obj2, 'a')  );
      assert( !hasOwn(obj2, 'b')  );
      assert(  hasOwn(obj2, 'c')  );
      assert(  hasOwn(obj2, '1')  );
      assert( !hasOwn(obj2, '2')  );
      assert(  hasOwn(obj2, '3')  );
      assert(  hasOwn(obj2, 'a1') );
      assert(  hasOwn(obj2, 'b2') );
      assert(  hasOwn(obj2, 'c3') );
      assert( obj1 === obj2 );
    });
  });

  title = titleStr('should delete props from obj where obj owns matching key');
  describe(title, function() {

    title = callStr('<object>', /a/);
    it(title, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var obj2 = vitals.cut(obj1, /a/);
      assert( !hasOwn(obj2, 'a')  );
      assert(  hasOwn(obj2, 'b')  );
      assert(  hasOwn(obj2, 'c')  );
      assert(  hasOwn(obj2, '1')  );
      assert(  hasOwn(obj2, '2')  );
      assert(  hasOwn(obj2, '3')  );
      assert( !hasOwn(obj2, 'a1') );
      assert(  hasOwn(obj2, 'b2') );
      assert(  hasOwn(obj2, 'c3') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', /^[0-9]$/);
    it(title, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var obj2 = vitals.cut(obj1, /^[0-9]$/);
      assert(  hasOwn(obj2, 'a')  );
      assert(  hasOwn(obj2, 'b')  );
      assert(  hasOwn(obj2, 'c')  );
      assert( !hasOwn(obj2, '1')  );
      assert( !hasOwn(obj2, '2')  );
      assert( !hasOwn(obj2, '3')  );
      assert(  hasOwn(obj2, 'a1') );
      assert(  hasOwn(obj2, 'b2') );
      assert(  hasOwn(obj2, 'c3') );
      assert( obj1 === obj2 );
    });

    // Note that `vitals.cut` decides which method of removing properties from a
    //   non-array object to use based upon the type of the first given value.

    // Below you will see two examples that demonstrate `vitals.cut` only
    //   removing properties where the object [owns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
    //   a key that [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
    //   one of the values because the first value is a regex.

    title = callStr('<object>', /a/, 2);
    it(title, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var obj2 = vitals.cut(obj1, /a/, 2);
      assert( !hasOwn(obj2, 'a')  );
      assert(  hasOwn(obj2, 'b')  );
      assert(  hasOwn(obj2, 'c')  );
      assert(  hasOwn(obj2, '1')  );
      assert( !hasOwn(obj2, '2')  );
      assert(  hasOwn(obj2, '3')  );
      assert( !hasOwn(obj2, 'a1') );
      assert( !hasOwn(obj2, 'b2') );
      assert(  hasOwn(obj2, 'c3') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', [ /a$/, 'b', 3 ]);
    it(title, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var obj2 = vitals.cut(obj1, [ /a$/, 'b', 3 ]);
      assert( !hasOwn(obj2, 'a')  );
      assert( !hasOwn(obj2, 'b')  );
      assert(  hasOwn(obj2, 'c')  );
      assert(  hasOwn(obj2, '1')  );
      assert(  hasOwn(obj2, '2')  );
      assert( !hasOwn(obj2, '3')  );
      assert(  hasOwn(obj2, 'a1') );
      assert( !hasOwn(obj2, 'b2') );
      assert( !hasOwn(obj2, 'c3') );
      assert( obj1 === obj2 );
    });

  });

  title = titleStr('should delete props from obj where value === val');
  describe(title, function() {

    title = callStr('<object>', 3);
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut(obj1, 3);
      assert(  hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', 1, 3);
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut(obj1, 1, 3);
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    // Note that `vitals.cut` decides which method of removing properties from a
    //   non-array object to use based upon the type of the first given value.

    // Below you will see two examples that demonstrate `vitals.cut` only
    //   removing properties where `value === propValue` because the
    //   first value is not a string, regex, or function.

    title = callStr('<object>', 1, 'd');
    it(title, function() {
      var obj1 = {
        a:  1,   b:  2,
        c: 'd',  e: 'f',
        g: null, h: null
      };
      var obj2 = vitals.cut(obj1, 1, 'd');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert(  hasOwn(obj2, 'e') );
      assert(  hasOwn(obj2, 'g') );
      assert(  hasOwn(obj2, 'h') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', [ 2, '1', null, 'a' ]);
    it(title, function() {
      var obj1 = {
        a:  1,   b:  2,
        c: 'd',  e: 'f',
        g: null, h: null
      };
      var obj2 = vitals.cut(obj1, [ 2, '1', null, 'a' ]);
      assert(  hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert(  hasOwn(obj2, 'e') );
      assert( !hasOwn(obj2, 'g') );
      assert( !hasOwn(obj2, 'h') );
      assert( obj1 === obj2 );
    });
  });

  title = titleStr('should delete props from obj where filter returns false');
  describe(title, function() {

    title = callStr('<object>', '<filter>');
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var fltr = function filter() {
        return true;
      };
      var obj2 = vitals.cut(obj1, fltr);
      assert( hasOwn(obj2, 'a') );
      assert( hasOwn(obj2, 'b') );
      assert( hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', '<filter>');
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var fltr = function filter() {
        return null;
      };
      var obj2 = vitals.cut(obj1, fltr);
      assert( !hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', '<filter>');
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      var fltr = function filter(val, key) {
        return val > 2 && key !== 'c';
      };
      var obj2 = vitals.cut(obj1, fltr);
      assert( !hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert(  hasOwn(obj2, 'd') );
      assert(  hasOwn(obj2, 'e') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', '<filter>');
    it(title, function() {

      // unstable example not using the source param
      var obj1 = { a: 'b', b: 'z', c: 'b' };
      var fltr = function filter(val) {
        return hasOwn(obj1, val);
      };
      var obj2 = vitals.cut(obj1, fltr);
      try {
        assert(  hasOwn(obj2, 'a') ); // since iteration order is not guaranteed
        assert( !hasOwn(obj2, 'c') ); // both of these asserts can fail or pass
      }
      catch (err) {}
      assert( !hasOwn(obj2, 'b') );
      assert( obj1 === obj2 );

      // stable example using the source param
      obj1 = { a: 'c', b: 'b', c: 'a' };
      fltr = function filter(val, key, src) {
        return val in src;
      };
      obj2 = vitals.cut(obj1, fltr);
      assert( hasOwn(obj2, 'a') );
      assert( hasOwn(obj2, 'b') );
      assert( hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    title = callStr('<object>', '<filter>', '<this>');
    it(title, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var fltr = function filter(val, key) {
        return hasOwn(this, key);
      };
      var thisArg = { a: 1 };
      var obj2 = vitals.cut(obj1, fltr, thisArg);
      assert(  hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });
  });

  title = titleStr('should splice props from array where index === val');
  describe(title, function() {

    title = callStr('<array>', 1);
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    // Note that `vitals.cut` decides which method of removing properties from
    //   an array to use based upon the type of the first or all given values.

    // Below you will see two examples that demonstrate `vitals.cut`
    //   only removing properties where `value === index`
    //   because all of the values are a number.

    title = callStr('<array>', 1, 3);
    it(title, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut(arr1, 1, 3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    title = callStr('<array>', [ 0, 1 ]);
    it(title, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut(arr1, [ 0, 1 ]);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 3 );
      assert( arr2[1] === 4 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });
  });

  title = titleStr('should splice props from array where value === val');
  describe(title, function() {

    title = callStr('<array>', 'a');
    it(title, function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.cut(arr1, 'a');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 'b' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    // Note that `vitals.cut` decides which method of removing properties from
    //   an array to use based upon the type of the first or all given values.

    // Below you will see two examples that demonstrate `vitals.cut` only
    //   removing properties where `value === indexedValue` because all
    //   values are not a number and the first value is not a function.

    title = callStr('<array>', 1, 'a');
    it(title, function() {
      var arr1 = [ 1, 2, 'a', 'b' ];
      var arr2 = vitals.cut(arr1, 1, 'a');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 'b' );
      assert( arr2.length === 2 );
    });

    title = callStr('<array>', [ 2, /b/ ]);
    it(title, function() {
      var arr1 = [ 1, 2, 'a', 'b' ];
      var arr2 = vitals.cut(arr1, [ 2, /b/ ]);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 'a' );
      assert( arr2[2] === 'b' );
      assert( arr2.length === 3 );
    });
  });

  title = titleStr('should splice props from array where filter returns false');
  describe(title, function() {

    title = callStr('<array>', '<filter>');
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var fltr = function filter() {
        return true;
      };
      var arr2 = vitals.cut(arr1, fltr);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 3 );
      assert( arr2.length === 3 );
    });

    title = callStr('<array>', '<filter>');
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var fltr = function filter() {
        return null;
      };
      var arr2 = vitals.cut(arr1, fltr);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2.length === 0 );
    });

    title = callStr('<array>', '<filter>');
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var fltr = function filter(val, i) {
        return val > 1 && i < 2;
      };
      var arr2 = vitals.cut(arr1, fltr);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2.length === 1 );
    });

    // Note that filter iterates in reverse order (i.e. last index to zero)
    //   to accurately splice `false` results.

    title = callStr('<array>', '<filter>');
    it(title, function() {

      // unstable example not using the source param
      var arr1 = [ 1, 2, 3 ];
      var fltr = function filter(val, i) {
        return i < 2 && arr1.length > 2;
      };
      var arr2 = vitals.cut(arr1, fltr);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2.length === 0 );

      // stable example using the source param
      arr1 = [ 1, 2, 3 ];
      fltr = function filter(val, i, src) {
        return i > 0 && src.length > 2;
      };
      arr2 = vitals.cut(arr1, fltr);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    title = callStr('<array>', '<filter>', '<this>');
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var fltr = function filter(val) {
        return hasVal(this, val);
      };
      var thisArg = [ 1 ];
      var arr2 = vitals.cut(arr1, fltr, thisArg);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2.length === 1 );
    });
  });

  title = titleStr('should remove all substrings from string');
  describe(title, function() {

    title = callStr('abcABCabc', 'a');
    it(title, function() {
      var str = vitals.cut('abcABCabc', 'a');
      assert( str === 'bcABCbc' );
    });

    title = callStr('abc123a1b2c3', 1, 'a');
    it(title, function() {
      var str = vitals.cut('abc123a1b2c3', 1, 'a');
      assert( str === 'bc23b2c3' );
    });

    title = callStr('abc123a1b2c3', [ { 'a': 2 }, 'c' ]);
    it(title, function() {
      var str = vitals.cut('abc123a1b2c3', [ { 'a': 2 }, 'c' ]);
      assert( str === 'ab123a1b23' );
    });

    title = callStr('ABC.a*b*c.123', '*');
    it(title, function() {
      var str = vitals.cut.pattern('ABC.a*b*c.123', '*');
      assert( str === 'ABC.abc.123' );
    });

    title = callStr('ABC.a*b*c.123', '.*');
    it(title, function() {
      var str = vitals.cut.pattern('ABC.a*b*c.123', '.*');
      assert( str === 'ABC.a*b*c.123' );
    });
  });

  title = titleStr('should remove all patterns from string');
  describe(title, function() {

    title = callStr('abc123', /[a-z]/);
    it(title, function() {
      var str = vitals.cut('abc123', /[a-z]/);
      assert( str === 'bc123' );
    });

    title = callStr('abc123', /[a-z]/g);
    it(title, function() {
      var str = vitals.cut('abc123', /[a-z]/g);
      assert( str === '123' );
    });

    // Note that for string sources `vitals.cut` removes patterns in the defined
    //   order. Below you will see two examples that remove the same patterns
    //   from the same string and return different results.

    title = callStr('abc.123.abc1', 1, 'c', /[a-z]$/);
    it(title, function() {
      var str = vitals.cut('abc.123.abc1', 1, 'c', /[a-z]$/);
      assert( str === 'ab.23.a' );
    });

    title = callStr('abc.123.abc1', [ /[a-z]$/, 1, 'c' ]);
    it(title, function() {
      var str = vitals.cut('abc.123.abc1', [ /[a-z]$/, 1, 'c' ]);
      assert( str === 'ab.23.ab' );
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
  return testCall('cut', arguments, 3);
}
