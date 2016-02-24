/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FILL.ARRAY
 * -----------------------------------------------------------------------------
 * @see [vitals.fill]{@link https://github.com/imaginate/vitals/wiki/vitals.fill}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.fill.array (section:base)', function() {
  var title;

  describe('basic tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should fill array properties with val');
    describe(title, function() {

      title = callStr('<array>', 5);
      it(title, function() {
        var arr = vitals.fill.arr(newArr(), 5);
        each(9, function(i) {
          assert( arr[i] === 5 );
        });
      });

      title = callStr('<array>', 5, 2);
      it(title, function() {
        var arr = vitals.fill.arr(newArr(), 5, 2);
        each(newArr(), function(val, i) {
          if (i > 1) assert( arr[i] === 5 );
          else assert( arr[i] === val );
        });
      });

      title = callStr('<array>', 5, -2);
      it(title, function() {
        var arr = vitals.fill.arr(newArr(), 5, -2);
        each(newArr(), function(val, i) {
          if (i > 6) assert( arr[i] === 5 );
          else assert( arr[i] === val );
        });
      });

      title = callStr('<array>', 5, 0, 3);
      it(title, function() {
        var arr = vitals.fill.arr(newArr(), 5, 0, 3);
        each(newArr(), function(val, i) {
          if (i > 2) assert( arr[i] === val );
          else assert( arr[i] === 5 );
        });
      });

      title = callStr('<array>', 5, 0, -3);
      it(title, function() {
        var arr = vitals.fill.arr(newArr(), 5, 0, -3);
        each(newArr(), function(val, i) {
          if (i > 5) assert( arr[i] === val );
          else assert( arr[i] === 5 );
        });
      });

      title = callStr('<array>', 5, -3, -1);
      it(title, function() {
        var arr = vitals.fill.arr(newArr(), 5, -3, -1);
        each(newArr(), function(val, i) {
          if (i === 6 || i === 7) assert( arr[i] === 5 );
          else assert( arr[i] === val );
        });
      });

    });

    title = titleStr('should make new array with x length and fill it with val');
    describe(title, function() {

      title = callStr(8, 5);
      it(title, function() {
        var arr = vitals.fill.arr(8, 5);
        assert( arr.length === 8 );
        each(8, function(i) {
          assert( arr[i] === 5 );
        });
      });

      title = callStr(8, 5, 2);
      it(title, function() {
        var arr = vitals.fill.arr(8, 5, 2);
        assert( arr.length === 8 );
        each(8, function(i) {
          if (i > 1) assert( arr[i] === 5 );
          else assert( arr[i] === undefined );
        });
      });

      title = callStr(8, 5, -2);
      it(title, function() {
        var arr = vitals.fill.arr(8, 5, -2);
        each(8, function(i) {
          if (i > 5) assert( arr[i] === 5 );
          else assert( arr[i] === undefined );
        });
      });

      title = callStr(8, 5, 0, 3);
      it(title, function() {
        var arr = vitals.fill.arr(8, 5, 0, 3);
        each(8, function(i) {
          if (i > 2) assert( arr[i] === undefined );
          else assert( arr[i] === 5 );
        });
      });

      title = callStr(8, 5, 0, -3);
      it(title, function() {
        var arr = vitals.fill.arr(8, 5, 0, -3);
        each(8, function(i) {
          if (i > 4) assert( arr[i] === undefined );
          else assert( arr[i] === 5 );
        });
      });

      title = callStr(8, 5, -3, -1);
      it(title, function() {
        var arr = vitals.fill.arr(8, 5, -3, -1);
        each(8, function(i) {
          if (i === 5 || i === 6) assert( arr[i] === 5 );
          else assert( arr[i] === undefined );
        });
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fill.arr();
        });
      });

      title = callStr([]);
      it(title, function() {
        assert.throws(function() {
          vitals.fill.arr([]);
        });
      });

      title = callStr({}, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fill.arr({}, 5);
        });
      });

      title = callStr([], 'val', 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.fill.arr([], 'val', 'fail');
        });
      });

      title = callStr([], 'val', 0, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.fill.arr([], 'val', 0, 'fail');
        });
      });

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
  return breakStr(shouldMsg, 3);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('fill.arr', arguments, 4);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
