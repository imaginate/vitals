/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY.FUNC UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.copy.func
 * @submethod func
 * @super copy
 * @section base
 * @section all
 * @build browser
 * @build node
 *
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
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

/// #{{{ @func newFunc
/**
 * @private
 * @return {!Function}
 */
function newFunc() {

  /**
   * @return {number}
   */
  function testFunc() {
    return 5;
  }

  testFunc.a = 1;
  testFunc.b = {
    'c': 2
  };
  return freeze(testFunc, true);
}
/// #}}} @func newFunc

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

/// #{{{ @suite copy.function
method('copy.function', 'copy.func', function copyFunctionTests() {

  /// #{{{ @tests A
  should('A', 'return a clone of the function', function copyFunctionTestsA() {

    /// #{{{ @test A1
    test('A1', [ '<function>' ], function copyFunctionTestA1() {

      /** @type {!Function} */
      var before;
      /** @type {!Function} */
      var after;

      before = newFunc();
      after = vitals.copy.func(before);

      assert(after !== before);
      assert(after() === before());
      assert(after.a === before.a);
      assert(after.b === before.b);
      assert(after.b.c === before.b.c);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ '<function>', true ], function copyFunctionTestA2() {

      /** @type {!Function} */
      var before;
      /** @type {!Function} */
      var after;

      before = newFunc();
      after = vitals.copy.func(before, true);

      assert(after !== before);
      assert(after() === before());
      assert(after.a === before.a);
      assert(after.b !== before.b);
      assert(after.b.c === before.b.c);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ '<function>', false ], function copyFunctionTestA3() {

      /** @type {!Function} */
      var before;
      /** @type {!Function} */
      var after;

      before = newFunc();
      after = vitals.copy.func(before, false);

      assert(after !== before);
      assert(after() === before());
      assert(after.a === before.a);
      assert(after.b === before.b);
      assert(after.b.c === before.b.c);
    });
    /// #}}} @test A3

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'should throw a vitals error', function copyFunctionTestsB() {

    /// #{{{ @test B1
    test('B1', [], function copyFunctionTestB1() {

      throws(function() {
        vitals.copy.func();
      });

    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ null ], function copyFunctionTestB2() {

      throws.type(function() {
        vitals.copy.func(null);
      });

    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [ {} ], function copyFunctionTestB3() {

      throws.type(function() {
        vitals.copy.func({});
      });

    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [ '<function>', 'fail' ], function copyFunctionTestB4() {

      throws.type(function() {
        vitals.copy.func(newFunc(), 'fail');
      });

    });
    /// #}}} @test B4

  });
  /// #}}} @tests B

});
/// #}}} @suite copy.function

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
