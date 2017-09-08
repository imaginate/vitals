/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY.ARRAY UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.copy.array
 * @submethod array
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

/// #{{{ @suite copy.array
method('copy.array', 'copy.arr', function copyArrayTests() {

  /// #{{{ @tests A
  should('A', 'return a clone of the array', function copyArrayTestsA() {

    /// #{{{ @test A1
    test('A1', [ '<array>' ], function copyArrayTestA1() {

      /** @type {!Array} */
      var before;
      /** @type {!Array} */
      var after;

      before = freeze([
        1,
        { 'b': 2 },
        3
      ], true);
      after = vitals.copy.array(before);

      assert(after !== before);
      assert(after[0] === before[0]);
      assert(after[1] === before[1]);
      assert(after[2] === before[2]);
      assert(after[1].b === before[1].b);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ '<array>', true ], function copyArrayTestA2() {

      /** @type {!Array} */
      var before;
      /** @type {!Array} */
      var after;

      before = freeze([
        1,
        { 'b': 2 },
        3
      ], true);
      after = vitals.copy.array(before, true);

      assert(after !== before);
      assert(after[0] === before[0]);
      assert(after[1] !== before[1]);
      assert(after[2] === before[2]);
      assert(after[1].b === before[1].b);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ '<array>', false ], function copyArrayTestA3() {

      /** @type {!Array} */
      var before;
      /** @type {!Array} */
      var after;

      before = freeze([
        1,
        { 'b': 2 },
        3
      ], true);
      after = vitals.copy.array(before, false);

      assert(after !== before);
      assert(after[0] === before[0]);
      assert(after[1] === before[1]);
      assert(after[2] === before[2]);
      assert(after[1].b === before[1].b);
    });
    /// #}}} @test A3

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'should throw a vitals error', function copyArrayTestsB() {

    /// #{{{ @test B1
    test('B1', [], function copyArrayTestB1() {

      throws(function() {
        vitals.copy.array();
      });

    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ null ], function copyArrayTestB2() {

      throws.type(function() {
        vitals.copy.array(null);
      });

    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [ {} ], function copyArrayTestB3() {

      throws(function() {
        vitals.copy.array({});
      });

    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [ [], 'fail' ], function copyArrayTestB4() {

      throws.type(function() {
        vitals.copy.array([], 'fail');
      });

    });
    /// #}}} @test B4

  });
  /// #}}} @tests B

});
/// #}}} @suite copy.array

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
