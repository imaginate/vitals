/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut
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

method('cut', function() {

  should('delete props from obj where obj owns key', function() {

    test('<object>', 'a', function() {
      var obj1 = { 'a': 1, 'b': 2, 'c': 3 };
      var obj2 = vitals.cut(obj1, 'a');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    test('<object>', 'a', 'b', function() {
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

    test('<object>', 'a', 2, function() {
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

    test('<object>', [ 'a', 'b', 2, /^[0-9]$/ ], function() {
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

  should('delete props from obj where obj owns matching key', function() {

    test('<object>', /a/, function() {
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

    test('<object>', /^[0-9]$/, function() {
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

    test('<object>', /a/, 2, function() {
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

    test('<object>', [ /a$/, 'b', 3 ], function() {
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

  should('delete props from obj where value === val', function() {

    test('<object>', 3, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut(obj1, 3);
      assert(  hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    test('<object>', 1, 3, function() {
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

    test('<object>', 1, 'd', function() {
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

    test('<object>', [ 2, '1', null, 'a' ], function() {
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

  should('delete props from obj where filter returns false', function() {

    test('<object>', '<filter>', function() {
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

    test('<object>', '<filter>', function() {
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

    test('<object>', '<filter>', function() {
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

    test('<object>', '<filter>', function() {

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

    test('<object>', '<filter>', '<this>', function() {
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

  should('splice props from array where index === val', function() {

    test('<array>', 1, function() {
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

    test('<array>', 1, 3, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut(arr1, 1, 3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    test('<array>', [ 0, 1 ], function() {
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

  should('splice props from array where value === val', function() {

    test('<array>', 'a', function() {
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

    test('<array>', 1, 'a', function() {
      var arr1 = [ 1, 2, 'a', 'b' ];
      var arr2 = vitals.cut(arr1, 1, 'a');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 'b' );
      assert( arr2.length === 2 );
    });

    test('<array>', [ 2, /b/ ], function() {
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

  should('splice props from array where filter returns false', function() {

    test('<array>', '<filter>', function() {
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

    test('<array>', '<filter>', function() {
      var arr1 = [ 1, 2, 3 ];
      var fltr = function filter() {
        return null;
      };
      var arr2 = vitals.cut(arr1, fltr);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2.length === 0 );
    });

    test('<array>', '<filter>', function() {
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

    test('<array>', '<filter>', function() {

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

    test('<array>', '<filter>', '<this>', function() {
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

  should('remove all substrings from string', function() {

    test('abcABCabc', 'a', function() {
      var str = vitals.cut('abcABCabc', 'a');
      assert( str === 'bcABCbc' );
    });

    test('abc123a1b2c3', 1, 'a', function() {
      var str = vitals.cut('abc123a1b2c3', 1, 'a');
      assert( str === 'bc23b2c3' );
    });

    test('abc123a1b2c3', [ { 'a': 2 }, 'c' ], function() {
      var str = vitals.cut('abc123a1b2c3', [ { 'a': 2 }, 'c' ]);
      assert( str === 'ab123a1b23' );
    });

    test('ABC.a*b*c.123', '*', function() {
      var str = vitals.cut('ABC.a*b*c.123', '*');
      assert( str === 'ABC.abc.123' );
    });

    test('ABC.a*b*c.123', '.*', function() {
      var str = vitals.cut('ABC.a*b*c.123', '.*');
      assert( str === 'ABC.a*b*c.123' );
    });
  });

  should('remove all patterns from string', function() {

    test('abc123', /[a-z]/, function() {
      var str = vitals.cut('abc123', /[a-z]/);
      assert( str === 'bc123' );
    });

    test('abc123', /[a-z]/g, function() {
      var str = vitals.cut('abc123', /[a-z]/g);
      assert( str === '123' );
    });

    // Note that for string sources `vitals.cut` removes patterns in the defined
    //   order. Below you will see two examples that remove the same patterns
    //   from the same string and return different results.

    test('abc.123.abc1', 1, 'c', /[a-z]$/, function() {
      var str = vitals.cut('abc.123.abc1', 1, 'c', /[a-z]$/);
      assert( str === 'ab.23.a' );
    });

    test('abc.123.abc1', [ /[a-z]$/, 1, 'c' ], function() {
      var str = vitals.cut('abc.123.abc1', [ /[a-z]$/, 1, 'c' ]);
      assert( str === 'ab.23.ab' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.cut({});
      }, validErr);
    });

    test(1, 1, function() {
      assert.throws(function() {
        vitals.cut(1, 1);
      }, validTypeErr);
    });

    test({}, '<filter>', false, function() {
      assert.throws(function() {
        var fltr = function filter(){};
        vitals.cut({}, fltr, false);
      }, validTypeErr);
    });
  });
});
