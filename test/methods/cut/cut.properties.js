/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.properties
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

method('cut.properties', 'cut.props', function() {

  should('delete props from obj where obj owns key', function() {

    test('<object>', 'a', function() {
      var obj1 = { 'a': 1, 'b': 2, 'c': 3 };
      var obj2 = vitals.cut.props(obj1, 'a');
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    test('<object>', 'a', 'b', function() {
      var obj1 = { 'a': 1, 'b': 2, 'c': 3 };
      var obj2 = vitals.cut.props(obj1, 'a', 'b');
      assert( !hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    // Note that `vitals.cut.properties` decides which method of removing
    //   properties from a non-array object to use based upon
    //   the type of the first given value.

    // Below you will see two examples that demonstrate `vitals.cut.properties`
    //   only removing properties where the object [owns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
    //   the key of the string conversion of one of the values
    //   because the first value is a string.

    test('<object>', 'a', 2, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var obj2 = vitals.cut.props(obj1, 'a', 2);
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
      var obj2 = vitals.cut.props(obj1, keys);
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
      var obj2 = vitals.cut.props(obj1, /a/);
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
      var obj2 = vitals.cut.props(obj1, /^[0-9]$/);
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

    // Note that `vitals.cut.properties` decides which method of removing
    //   properties from a non-array object to use based upon
    //   the type of the first given value.

    // Below you will see two examples that demonstrate `vitals.cut.properties`
    //   only removing properties where the object [owns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
    //   a key that [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
    //   one of the values because the first value is a regex.

    test('<object>', /a/, 2, function() {
      var obj1 = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      var obj2 = vitals.cut.props(obj1, /a/, 2);
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
      var obj2 = vitals.cut.props(obj1, [ /a$/, 'b', 3 ]);
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
      var obj2 = vitals.cut.props(obj1, 3);
      assert(  hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    test('<object>', 1, 3, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut.props(obj1, 1, 3);
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    // Note that `vitals.cut.properties` decides which method of removing
    //   properties from a non-array object to use based upon
    //   the type of the first given value.

    // Below you will see two examples that demonstrate `vitals.cut.properties`
    //   only removing properties where `value === propValue` because
    //   the first value is not a string or regex.

    test('<object>', 1, 'd', function() {
      var obj1 = {
        a:  1,   b:  2,
        c: 'd',  e: 'f',
        g: null, h: null
      };
      var obj2 = vitals.cut.props(obj1, 1, 'd');
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
      var obj2 = vitals.cut.props(obj1, [ 2, '1', null, 'a' ]);
      assert(  hasOwn(obj2, 'a') );
      assert( !hasOwn(obj2, 'b') );
      assert(  hasOwn(obj2, 'c') );
      assert(  hasOwn(obj2, 'e') );
      assert( !hasOwn(obj2, 'g') );
      assert( !hasOwn(obj2, 'h') );
      assert( obj1 === obj2 );
    });
  });

  should('splice props from array where index === val', function() {

    test('<array>', 1, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.props(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    // Note that `vitals.cut.properties` decides which method of removing
    //   properties from an array to use based upon whether all given
    //   values are numbers.

    // Below you will see two examples that demonstrate `vitals.cut.properties`
    //   only removing properties where `value === index`
    //   because all values are numbers.

    test('<array>', 1, 3, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.props(arr1, 1, 3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    test('<array>', [ 0, 1 ], function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.props(arr1, [ 0, 1 ]);
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
      var arr2 = vitals.cut.props(arr1, 'a');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 'b' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    // Note that `vitals.cut.properties` decides which method of removing
    //   properties from an array to use based upon whether all given
    //   values are numbers.

    // Below you will see two examples that demonstrate `vitals.cut.properties`
    //   only removing properties where `value === indexedValue`
    //   because all values are not numbers.

    test('<array>', 1, 'a', function() {
      var arr1 = [ 1, 2, 'a', 'b' ];
      var arr2 = vitals.cut.props(arr1, 1, 'a');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 'b' );
      assert( arr2.length === 2 );
    });

    test('<array>', [ 2, /b/ ], function() {
      var arr1 = [ 1, 2, 'a', 'b' ];
      var arr2 = vitals.cut.props(arr1, [ 2, /b/ ]);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 'a' );
      assert( arr2[2] === 'b' );
      assert( arr2.length === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.props();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.cut.props({});
      }, validErr);
    });

    test(1, 1, function() {
      assert.throws(function() {
        vitals.cut.props(1, 1);
      }, validTypeErr);
    });
  });
});
