/**
 * ---------------------------------------------------------------------------
 * VITALS.CUT UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.cut
 * @submethod main
 * @super cut
 * @section base
 * @section all
 * @build browser
 * @build node
 *
 * @see [vitals.cut](https://github.com/imaginate/vitals/wiki/vitals.cut)
 *
 * @author Adam Smith <adam@imaginate.life> (http://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = global.VITALS_TEST.loadHelper;
/// #}}} @func loadHelper

/// #{{{ @func assert
/**
 * @private
 * @param {boolean} result
 * @return {void}
 */
var assert = require('assert');
/// #}}} @func assert

/// #{{{ @func freeze
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freeze = loadHelper('freeze-object');
/// #}}} @func freeze

/// #{{{ @func owns
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var owns = loadHelper('has-own-property');
/// #}}} @func owns

/// #{{{ @const is
/**
 * @private
 * @const {!Object<string, !function>}
 */
var is = loadHelper('is');
/// #}}} @const is

/// #{{{ @func throws
/**
 * @private
 * @param {!function} action
 * @return {void}
 */
var throws = loadHelper('throws-error');
/// #}}} @func throws

/// #{{{ @const vitals
/**
 * @private
 * @const {(!Object|!Function)}
 */
var vitals = global.VITALS_TEST.VITALS;
/// #}}} @const vitals

/// #}}} @group HELPERS

/// #{{{ @group TESTS
//////////////////////////////////////////////////////////////////////////////
// TESTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @suite cut
method('cut', function cutTests() {

  /// #{{{ @docrefs cut
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// #}}} @docrefs cut

  /// #{{{ @tests A
  should('A', 'delete strictly matching owned property keys', function cutTestsA() {

    /// #{{{ @test A1
    test('A1', [ '<object>', 'a' ], function cutTestA1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };

      result = vitals.cut(obj, 'a');

      assert(result === obj);

      assert( !owns(result, 'a') );
      assert(  owns(result, 'b') );
      assert(  owns(result, 'c') );
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ '<object>', 'a', 'b' ], function cutTestA2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
        'a': 1,
        'b': 2,
        'c': 3
      };

      result = vitals.cut(obj, 'a', 'b');

      assert(result === obj);

      assert( !owns(result, 'a') );
      assert( !owns(result, 'b') );
      assert(  owns(result, 'c') );
    });
    /// #}}} @test A2

    /// @note first-val-param-matters
    ///   The data type of the first #val passed to @cut#main decides which
    ///   method of removing properties from a non-array `object` to use (i.e.
    ///   pay attention to the **first** #val). Below you will see two
    ///   examples, %A3 and %A4, that demonstrate @cut#main removing only
    ///   properties from the #source `object` where a `string` conversion of
    ///   a #val strictly equals (instead of loosely matching) a property key
    ///   [owned][own] by the #source because the first #val passed is a
    ///   `string`.

    /// #{{{ @test A3
    test('A3', [ '<object>', 'a', 2 ], function cutTestA3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };

      result = vitals.cut(obj, 'a', 2);

      assert(result === obj);

      assert( !owns(result, 'a') );
      assert(  owns(result, 'b') );
      assert(  owns(result, 'c') );
      assert(  owns(result, '1') );
      assert( !owns(result, '2') );
      assert(  owns(result, '3') );
      assert(  owns(result, 'a1') );
      assert(  owns(result, 'b2') );
      assert(  owns(result, 'c3') );
    });
    /// #}}} @test A3

    /// #{{{ @test A4
    test('A4', [
      '<object>', [ 'a', 'b', 2, /^[0-9]$/ ]
    ], function cutTestA4() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var vals;
      /** @type {!Object} */
      var obj;

      obj = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      vals = [ 'a', 'b', 2, /^[0-9]$/ ];

      result = vitals.cut(obj, vals);

      assert(result === obj);

      assert( !owns(result, 'a') );
      assert( !owns(result, 'b') );
      assert(  owns(result, 'c') );
      assert(  owns(result, '1') );
      assert( !owns(result, '2') );
      assert(  owns(result, '3') );
      assert(  owns(result, 'a1') );
      assert(  owns(result, 'b2') );
      assert(  owns(result, 'c3') );
    });
    /// #}}} @test A4

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'delete loosely matching owned property keys', function cutTestsB() {

    /// #{{{ @test B1
    test('B1', [ '<object>', /a/ ], function cutTestB1() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };

      result = vitals.cut(obj, /a/);

      assert(result === obj);

      assert( !owns(result, 'a') );
      assert(  owns(result, 'b') );
      assert(  owns(result, 'c') );
      assert(  owns(result, '1') );
      assert(  owns(result, '2') );
      assert(  owns(result, '3') );
      assert( !owns(result, 'a1') );
      assert(  owns(result, 'b2') );
      assert(  owns(result, 'c3') );
    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ '<object>', /^[0-9]$/ ], function cutTestB2() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };

      result = vitals.cut(obj, /^[0-9]$/);

      assert(result === obj);

      assert(  owns(result, 'a') );
      assert(  owns(result, 'b') );
      assert(  owns(result, 'c') );
      assert( !owns(result, '1') );
      assert( !owns(result, '2') );
      assert( !owns(result, '3') );
      assert(  owns(result, 'a1') );
      assert(  owns(result, 'b2') );
      assert(  owns(result, 'c3') );
    });
    /// #}}} @test B2

    /// @note first-val-param-matters
    ///   The data type of the first #val passed to @cut#main decides which
    ///   method of removing properties from a non-array `object` to use (i.e.
    ///   pay attention to the **first** #val). Below you will see two
    ///   examples, %B3 and %B4, that demonstrate @cut#main removing all
    ///   properties from the #source `object` where a #val loosely matches
    ///   (see @has#pattern) a property key [owned][own] by the #source
    ///   because the first #val passed is a `RegExp` instance.

    /// #{{{ @test B3
    test('B3', [ '<object>', /a/, 2 ], function cutTestB3() {

      /** @type {!Object} */
      var result;
      /** @type {!Object} */
      var obj;

      obj = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };

      result = vitals.cut(obj, /a/, 2);

      assert(result === obj);

      assert( !owns(result, 'a') );
      assert(  owns(result, 'b') );
      assert(  owns(result, 'c') );
      assert(  owns(result, '1') );
      assert( !owns(result, '2') );
      assert(  owns(result, '3') );
      assert( !owns(result, 'a1') );
      assert( !owns(result, 'b2') );
      assert(  owns(result, 'c3') );
    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [ '<object>', [ /a$/, 'b', 3 ] ], function cutTestB4() {

      /** @type {!Object} */
      var result;
      /** @type {!Array} */
      var vals;
      /** @type {!Object} */
      var obj;

      obj = {
         'a': 1,  'b': 2,  'c': 3,
         '1': 4,  '2': 5,  '3': 6,
        'a1': 7, 'b2': 8, 'c3': 9
      };
      vals = [ /a$/, 'b', 3 ];

      result = vitals.cut(obj, vals);

      assert(result === obj);

      assert( !owns(result, 'a') );
      assert( !owns(result, 'b') );
      assert(  owns(result, 'c') );
      assert(  owns(result, '1') );
      assert(  owns(result, '2') );
      assert( !owns(result, '3') );
      assert(  owns(result, 'a1') );
      assert( !owns(result, 'b2') );
      assert( !owns(result, 'c3') );
    });
    /// #}}} @test B4

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'delete strictly matching owned property values', function cutTestsC() {

    test('<object>', 3, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut(obj1, 3);
      assert(  hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    /// #{{{ @test C1
    test('C1', [ /regexp/ ], function cutTestC1() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/;
      after = vitals.cut(before);

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === false);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global === before.global);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test C1

    test('<object>', 1, 3, function() {
      var obj1 = { a: 1, b: 2, c: 3 };
      var obj2 = vitals.cut(obj1, 1, 3);
      assert( !hasOwn(obj2, 'a') );
      assert(  hasOwn(obj2, 'b') );
      assert( !hasOwn(obj2, 'c') );
      assert( obj1 === obj2 );
    });

    /// #{{{ @test C2
    test('C2', [ /regexp/ig ], function cutTestC2() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/ig;
      after = vitals.cut(before);

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.ignoreCase === true);

      assert(after.source === before.source);
      assert(after.global === before.global);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test C2

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
  /// #}}} @tests C

  /// #{{{ @tests D
  should('D', 'delete owned properties via filter function', function cutTestsD() {

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

    /// #{{{ @test D1
    test('D1', [ '<array>' ], function cutTestD1() {

      /** @type {!Array} */
      var before;
      /** @type {!Array} */
      var after;

      before = freeze([
        1,
        { 'b': 2 },
        3
      ], true);
      after = vitals.cut(before);

      assert(after !== before);
      assert(after[0] === before[0]);
      assert(after[1] === before[1]);
      assert(after[2] === before[2]);
      assert(after[1].b === before[1].b);
    });
    /// #}}} @test D1

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

    /// #{{{ @test D2
    test('D2', [ '<array>', true ], function cutTestD2() {

      /** @type {!Array} */
      var before;
      /** @type {!Array} */
      var after;

      before = freeze([
        1,
        { 'b': 2 },
        3
      ], true);
      after = vitals.cut(before, true);

      assert(after !== before);
      assert(after[0] === before[0]);
      assert(after[1] !== before[1]);
      assert(after[2] === before[2]);
      assert(after[1].b === before[1].b);
    });
    /// #}}} @test D2

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
  /// #}}} @tests D

  /// #{{{ @tests E
  should('E', 'splice indexed properties from array by index', function cutTestsE() {

    test('<array>', 1, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    /// #{{{ @test E1
    test('E1', [ '<function>' ], function cutTestE1() {

      /** @type {!Function} */
      var before;
      /** @type {!Function} */
      var after;

      before = newFunc();
      after = vitals.cut(before);

      assert(after !== before);
      assert(after() === before());
      assert(after.a === before.a);
      assert(after.b === before.b);
      assert(after.b.c === before.b.c);
    });
    /// #}}} @test E1

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

    /// #{{{ @test E2
    test('E2', [ '<function>', true ], function cutTestE2() {

      /** @type {!Function} */
      var before;
      /** @type {!Function} */
      var after;

      before = newFunc();
      after = vitals.cut(before, true);

      assert(after !== before);
      assert(after() === before());
      assert(after.a === before.a);
      assert(after.b !== before.b);
      assert(after.b.c === before.b.c);
    });
    /// #}}} @test E2

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
  /// #}}} @tests E

  /// #{{{ @tests F
  should('F', 'splice indexed properties from array by value', function cutTestsF() {

    test('<array>', 'a', function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.cut(arr1, 'a');
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 'b' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    /// #{{{ @test F1
    test('F1', [], function cutTestF1() {

      throws(function() {
        vitals.cut();
      });

    });
    /// #}}} @test F1

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

    /// #{{{ @test F2
    test('F2', [ {}, 'fail' ], function cutTestF2() {

      throws.type(function() {
        vitals.cut({}, 'fail');
      });

    });
    /// #}}} @test F2

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
  /// #}}} @tests F

  /// #{{{ @tests G
  should('G', 'splice properties from array via filter function', function cutTestsG() {

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

    /// #{{{ @test G1
    test('G1', [], function cutTestG1() {

      throws(function() {
        vitals.cut();
      });

    });
    /// #}}} @test G1

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

    /// #{{{ @test G2
    test('G2', [ {}, 'fail' ], function cutTestG2() {

      throws.type(function() {
        vitals.cut({}, 'fail');
      });

    });
    /// #}}} @test G2

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
  /// #}}} @tests G

  /// #{{{ @tests H
  should('H', 'remove all substrings from string', function cutTestsH() {

    test('abcABCabc', 'a', function() {
      var str = vitals.cut('abcABCabc', 'a');
      assert( str === 'bcABCbc' );
    });

    /// #{{{ @test H1
    test('H1', [], function cutTestH1() {

      throws(function() {
        vitals.cut();
      });

    });
    /// #}}} @test H1

    test('abc123a1b2c3', 1, 'a', function() {
      var str = vitals.cut('abc123a1b2c3', 1, 'a');
      assert( str === 'bc23b2c3' );
    });

    /// #{{{ @test H2
    test('H2', [ {}, 'fail' ], function cutTestH2() {

      throws.type(function() {
        vitals.cut({}, 'fail');
      });

    });
    /// #}}} @test H2

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
  /// #}}} @tests H

  /// #{{{ @tests I
  should('I', 'remove all patterns from string', function cutTestsI() {

    test('abc123', /[a-z]/, function() {
      var str = vitals.cut('abc123', /[a-z]/);
      assert( str === 'bc123' );
    });

    /// #{{{ @test I1
    test('I1', [], function cutTestI1() {

      throws(function() {
        vitals.cut();
      });

    });
    /// #}}} @test I1

    test('abc123', /[a-z]/g, function() {
      var str = vitals.cut('abc123', /[a-z]/g);
      assert( str === '123' );
    });

    /// #{{{ @test I2
    test('I2', [ {}, 'fail' ], function cutTestI2() {

      throws.type(function() {
        vitals.cut({}, 'fail');
      });

    });
    /// #}}} @test I2

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
  /// #}}} @tests I

  /// #{{{ @tests J
  should('J', 'should throw a vitals error', function cutTestsJ() {

    /// #{{{ @test J1
    test('J1', [], function cutTestJ1() {

      throws(function() {
        vitals.cut();
      });

    });
    /// #}}} @test J1

    /// #{{{ @test J2
    test('J2', [ {} ], function cutTestJ2() {

      throws(function() {
        vitals.cut({});
      });

    });
    /// #}}} @test J2

    /// #{{{ @test J3
    test('J3', [ 1, 1 ], function cutTestJ3() {

      throws.type(function() {
        vitals.cut(1, 1);
      });

    });
    /// #}}} @test J3

    /// #{{{ @test J4
    test('J4', [ {}, '<filter>', false ], function cutTestJ4() {

      throws.type(function() {
        function filter(){}
        vitals.cut({}, filter, false);
      });

    });
    /// #}}} @test J4

  });
  /// #}}} @tests J

});
/// #}}} @suite cut

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
