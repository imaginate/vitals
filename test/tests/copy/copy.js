/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.copy
 * @submethod main
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

/// #{{{ @const is
/**
 * @private
 * @const {!Object<string, !function>}
 */
var is = loadHelper('is');
/// #}}} @const is

/// #{{{ @func isNan
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNan = is.nan;
/// #}}} @func isNan

/// #{{{ @func newFunc
/**
 * @private
 * @return {!function(): number}
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

/// #{{{ @suite copy
method('copy', function copyTests() {

  /// #{{{ @tests A
  should('A', 'return a primitive without alteration', function copyTestsA() {

    /// #{{{ @test A1
    test('A1', [ null ], function copyTestA1() {

      /** @type {null} */
      var before;
      /** @type {null} */
      var after;

      before = null;
      after = vitals.copy(before);

      assert(after === null);
      assert(after === before);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ undefined ], function copyTestA2() {

      /** @type {undefined} */
      var before;
      /** @type {undefined} */
      var after;

      before = undefined;
      after = vitals.copy(before);

      assert(after === undefined);
      assert(after === before);
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ true ], function copyTestA3() {

      /** @type {boolean} */
      var before;
      /** @type {boolean} */
      var after;

      before = true;
      after = vitals.copy(before);

      assert(after === true);
      assert(after === before);
    });
    /// #}}} @test A3

    /// #{{{ @test A4
    test('A4', [ 'string' ], function copyTestA4() {

      /** @type {string} */
      var before;
      /** @type {string} */
      var after;

      before = 'string';
      after = vitals.copy(before);

      assert(after === 'string');
      assert(after === before);
    });
    /// #}}} @test A4

    /// #{{{ @test A5
    test('A5', [ 5 ], function copyTestA5() {

      /** @type {number} */
      var before;
      /** @type {number} */
      var after;

      before = 5;
      after = vitals.copy(before);

      assert(after === 5);
      assert(after === before);
    });
    /// #}}} @test A5

    /// #{{{ @test A6
    test('A6', [ NaN ], function copyTestA6() {

      /** @type {!Nan} */
      var before;
      /** @type {!Nan} */
      var after;

      before = NaN;
      after = vitals.copy(before);

      assert( isNan(after) );
      assert(after !== before);
    });
    /// #}}} @test A6

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'return a clone of the object', function copyTestsB() {

    /// #{{{ @test B1
    test('B1', [ '<object>' ], function copyTestB1() {

      /** @type {!Object} */
      var before;
      /** @type {!Object} */
      var after;

      before = freeze({
        'a': 1,
        'b': { 'd': 2 },
        'c': 3
      }, true);
      after = vitals.copy(before);

      assert(after !== before);
      assert(after.a === before.a);
      assert(after.b === before.b);
      assert(after.c === before.c);
      assert(after.b.d === before.b.d);
    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ '<object>', true ], function copyTestB2() {

      /** @type {!Object} */
      var before;
      /** @type {!Object} */
      var after;

      before = freeze({
        'a': 1,
        'b': { 'd': 2 },
        'c': 3
      }, true);
      after = vitals.copy(before, true);

      assert(after !== before);
      assert(after.a === before.a);
      assert(after.b !== before.b);
      assert(after.c === before.c);
      assert(after.b.d === before.b.d);
    });
    /// #}}} @test B2

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'return a clone of the regexp', function copyTestsC() {

    /// #{{{ @test C1
    test('C1', [ /regexp/ ], function copyTestC1() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/;
      after = vitals.copy(before);

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === false);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global === before.global);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test C1

    /// #{{{ @test C2
    test('C2', [ /regexp/ig ], function copyTestC2() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/ig;
      after = vitals.copy(before);

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.ignoreCase === true);

      assert(after.source === before.source);
      assert(after.global === before.global);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test C2

  });
  /// #}}} @tests C

  /// #{{{ @tests D
  should('D', 'return a clone of the array', function copyTestsD() {

    /// #{{{ @test D1
    test('D1', [ '<array>' ], function copyTestD1() {

      /** @type {!Array} */
      var before;
      /** @type {!Array} */
      var after;

      before = freeze([
        1,
        { 'b': 2 },
        3
      ], true);
      after = vitals.copy(before);

      assert(after !== before);
      assert(after[0] === before[0]);
      assert(after[1] === before[1]);
      assert(after[2] === before[2]);
      assert(after[1].b === before[1].b);
    });
    /// #}}} @test D1

    /// #{{{ @test D2
    test('D2', [ '<array>', true ], function copyTestD2() {

      /** @type {!Array} */
      var before;
      /** @type {!Array} */
      var after;

      before = freeze([
        1,
        { 'b': 2 },
        3
      ], true);
      after = vitals.copy(before, true);

      assert(after !== before);
      assert(after[0] === before[0]);
      assert(after[1] !== before[1]);
      assert(after[2] === before[2]);
      assert(after[1].b === before[1].b);
    });
    /// #}}} @test D2

  });
  /// #}}} @tests D

  /// #{{{ @tests E
  should('E', 'return a clone of the function', function copyTestsE() {

    /// #{{{ @test E1
    test('E1', [ '<function>' ], function copyTestE1() {

      /** @type {!Function} */
      var before;
      /** @type {!Function} */
      var after;

      before = newFunc();
      after = vitals.copy(before);

      assert(after !== before);
      assert(after() === before());
      assert(after.a === before.a);
      assert(after.b === before.b);
      assert(after.b.c === before.b.c);
    });
    /// #}}} @test E1

    /// #{{{ @test E2
    test('E2', [ '<function>', true ], function copyTestE2() {

      /** @type {!Function} */
      var before;
      /** @type {!Function} */
      var after;

      before = newFunc();
      after = vitals.copy(before, true);

      assert(after !== before);
      assert(after() === before());
      assert(after.a === before.a);
      assert(after.b !== before.b);
      assert(after.b.c === before.b.c);
    });
    /// #}}} @test E2

  });
  /// #}}} @tests E

  /// #{{{ @tests F
  should('F', 'should throw a vitals error', function copyTestsF() {

    /// #{{{ @test F1
    test('F1', [], function copyTestF1() {

      throws(function() {
        vitals.copy();
      });

    });
    /// #}}} @test F1

    /// #{{{ @test F2
    test('F2', [ {}, 'fail' ], function copyTestF2() {

      throws.type(function() {
        vitals.copy({}, 'fail');
      });

    });
    /// #}}} @test F2

  });
  /// #}}} @tests F

});
/// #}}} @suite copy

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
