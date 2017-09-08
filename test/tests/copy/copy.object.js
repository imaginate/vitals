/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY.OBJECT UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.copy.object
 * @submethod object
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

/// #{{{ @suite copy.object
method('copy.object', 'copy.obj', function copyObjectTests() {

  /// #{{{ @tests A
  should('A', 'return a clone of the object', function copyObjectTestsA() {

    /// #{{{ @test A1
    test('A1', [ '<object>' ], function copyObjectTestA1() {

      /** @type {!Object} */
      var before;
      /** @type {!Object} */
      var after;

      before = freeze({
        'a': 1,
        'b': { 'd': 2 },
        'c': 3
      }, true);
      after = vitals.copy.object(before);

      assert(after !== before);
      assert(after.a === before.a);
      assert(after.b === before.b);
      assert(after.c === before.c);
      assert(after.b.d === before.b.d);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ '<object>', true ], function copyObjectTestA2() {

      /** @type {!Object} */
      var before;
      /** @type {!Object} */
      var after;

      before = freeze({
        'a': 1,
        'b': { 'd': 2 },
        'c': 3
      }, true);
      after = vitals.copy.object(before, true);

      assert(after !== before);
      assert(after.a === before.a);
      assert(after.b !== before.b);
      assert(after.c === before.c);
      assert(after.b.d === before.b.d);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ '<object>', false ], function copyObjectTestA3() {

      /** @type {!Object} */
      var before;
      /** @type {!Object} */
      var after;

      before = freeze({
        'a': 1,
        'b': { 'd': 2 },
        'c': 3
      }, true);
      after = vitals.copy.object(before, false);

      assert(after !== before);
      assert(after.a === before.a);
      assert(after.b === before.b);
      assert(after.c === before.c);
      assert(after.b.d === before.b.d);
    });
    /// #}}} @test A3

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'should throw a vitals error', function copyObjectTestsB() {

    /// #{{{ @test B1
    test('B1', [], function copyObjectTestB1() {

      throws(function() {
        vitals.copy.object();
      });

    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ null ], function copyObjectTestB2() {

      throws.type(function() {
        vitals.copy.object(null);
      });

    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [ {}, 'fail' ], function copyObjectTestB3() {

      throws.type(function() {
        vitals.copy.object({}, 'fail');
      });

    });
    /// #}}} @test B3

  });
  /// #}}} @tests B

});
/// #}}} @suite copy.object

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
