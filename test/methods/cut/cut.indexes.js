/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.INDEXES
 * -----------------------------------------------------------------------------
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/blob/master/src/methods/cut.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.cut.indexes (sections:js,base)', function() {
  var title;

  title = titleStr('basic', 'should splice indexes from array');
  describe(title, function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = callStr('<array>', 1);
    it(title, function() {
      var arr = vitals.cut.ii(newArr(), 1);
      var be = [ 'a', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', -1);
    it(title, function() {
      var arr = vitals.cut.ii(newArr(), -1);
      var be = [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', 1, 3);
    it(title, function() {
      var arr = vitals.cut.ii(newArr(), 1, 3);
      var be = [ 'a', 'c', 2, 3, 'a1', 'b2', 'c3' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', 8, 2, 0, 5);
    it(title, function() {
      var arr = vitals.cut.ii(newArr(), 8, 2, 0, 5);
      var be = [ 'b', 1, 2, 'a1', 'b2' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', 2, -1, 0);
    it(title, function() {
      var arr = vitals.cut.ii(newArr(), 2, -1, 0);
      var be = [ 'b', 1, 2, 3, 'a1', 'b2' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', [ 2, -1, 0 ]);
    it(title, function() {
      var arr = vitals.cut.ii(newArr(), [ 2, -1, 0 ]);
      var be = [ 'b', 1, 2, 3, 'a1', 'b2' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr([]);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.ii([]);
      });
    });

    title = callStr([], 'a');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.ii([], 'a');
      });
    });

    title = callStr({}, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.ii({}, 1);
      });
    });

    title = callStr(null, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.ii(null, 1);
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} section
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(section, shouldMsg) {
  return testTitle(section, shouldMsg, 2, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('cut.ii', arguments, 4, true);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
