/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY.REGEXP UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.copy.regexp
 * @submethod regexp
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

/// #{{{ @suite copy.regexp
method('copy.regexp', 'copy.regx', function copyRegexpTests() {

  /// #{{{ @tests A
  should('A', 'return a clone of the regexp', function copyRegexpTestsA() {

    /// #{{{ @test A1
    test('A1', [ /regexp/ ], function copyRegexpTestA1() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/;
      after = vitals.copy.regexp(before);

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === false);
      assert(after.multiline === false);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global === before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ /regexp/igm ], function copyRegexpTestA2() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/igm;
      after = vitals.copy.regexp(before);

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.multiline === true);
      assert(after.ignoreCase === true);

      assert(after.source === before.source);
      assert(after.global === before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test A2

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'return a regexp clone with flag overrides', function copyRegexpTestsB() {

    /// #{{{ @test B1
    test('B1', [ /regexp/, 'g' ], function copyRegexpTestB1() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/;
      after = vitals.copy.regexp(before, 'g');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.multiline === false);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global !== before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ /regexp/igm, 'g' ], function copyRegexpTestB2() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/igm;
      after = vitals.copy.regexp(before, 'g');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.multiline === false);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global === before.global);
      assert(after.multiline !== before.multiline);
      assert(after.ignoreCase !== before.ignoreCase);
    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [ /regexp/, '+g' ], function copyRegexpTestB3() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/;
      after = vitals.copy.regexp(before, '+g');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.multiline === false);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global !== before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [ /regexp/m, '+gi' ], function copyRegexpTestB4() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/m;
      after = vitals.copy.regexp(before, '+gi');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.multiline === true);
      assert(after.ignoreCase === true);

      assert(after.source === before.source);
      assert(after.global !== before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase !== before.ignoreCase);
    });
    /// #}}} @test B4

    /// #{{{ @test B5
    test('B5', [ /regexp/igm, '-g' ], function copyRegexpTestB5() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/igm;
      after = vitals.copy.regexp(before, '-g');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === false);
      assert(after.multiline === true);
      assert(after.ignoreCase === true);

      assert(after.source === before.source);
      assert(after.global !== before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase === before.ignoreCase);
    });
    /// #}}} @test B5

    /// #{{{ @test B6
    test('B6', [ /regexp/igm, '-gi' ], function copyRegexpTestB6() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/igm;
      after = vitals.copy.regexp(before, '-gi');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === false);
      assert(after.multiline === true);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global !== before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase !== before.ignoreCase);
    });
    /// #}}} @test B6

    /// #{{{ @test B7
    test('B7', [ /regexp/im, '+gm-i' ], function copyRegexpTestB7() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/im;
      after = vitals.copy.regexp(before, '+gm-i');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.multiline === true);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global !== before.global);
      assert(after.multiline === before.multiline);
      assert(after.ignoreCase !== before.ignoreCase);
    });
    /// #}}} @test B7

    /// #{{{ @test B8
    test('B8', [ /regexp/im, '-im+g' ], function copyRegexpTestB8() {

      /** @type {!RegExp} */
      var before;
      /** @type {!RegExp} */
      var after;

      before = /regexp/im;
      after = vitals.copy.regexp(before, '-im+g');

      assert(after !== before);

      assert(after.source === 'regexp');
      assert(after.global === true);
      assert(after.multiline === false);
      assert(after.ignoreCase === false);

      assert(after.source === before.source);
      assert(after.global !== before.global);
      assert(after.multiline !== before.multiline);
      assert(after.ignoreCase !== before.ignoreCase);
    });
    /// #}}} @test B8

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'should throw a vitals error', function copyRegexpTestsC() {

    /// #{{{ @test C1
    test('C1', [], function copyRegexpTestC1() {

      throws(function() {
        vitals.copy.regexp();
      });

    });
    /// #}}} @test C1

    /// #{{{ @test C2
    test('C2', [ null ], function copyRegexpTestC2() {

      throws.type(function() {
        vitals.copy.regexp(null);
      });

    });
    /// #}}} @test C2

    /// #{{{ @test C3
    test('C3', [ {} ], function copyRegexpTestC3() {

      throws.type(function() {
        vitals.copy.regexp({});
      });

    });
    /// #}}} @test C3

    /// #{{{ @test C4
    test('C4', [ /regexp/, false ], function copyRegexpTestC4() {

      throws.type(function() {
        vitals.copy.regexp(/regexp/, false);
      });

    });
    /// #}}} @test C4

    /// #{{{ @test C5
    test('C5', [ /regexp/, 'x' ], function copyRegexpTestC5() {

      throws.range(function() {
        vitals.copy.regexp(/regexp/, 'x');
      });

    });
    /// #}}} @test C5

    /// #{{{ @test C6
    test('C6', [ /regexp/, '+igx' ], function copyRegexpTestC6() {

      throws.range(function() {
        vitals.copy.regexp(/regexp/, '+igx');
      });

    });
    /// #}}} @test C6

    /// #{{{ @test C7
    test('C7', [ /regexp/, 'i+g' ], function copyRegexpTestC7() {

      throws.range(function() {
        vitals.copy.regexp(/regexp/, 'i+g');
      });

    });
    /// #}}} @test C7

    /// #{{{ @test C8
    test('C8', [ /regexp/, 'ig-m' ], function copyRegexpTestC8() {

      throws.range(function() {
        vitals.copy.regexp(/regexp/, 'ig-m');
      });

    });
    /// #}}} @test C8

  });
  /// #}}} @tests C

});
/// #}}} @suite copy.regexp

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
