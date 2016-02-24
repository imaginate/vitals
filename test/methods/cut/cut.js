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
