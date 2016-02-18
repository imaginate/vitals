/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET
 * -----------------------------------------------------------------------------
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/wiki/vitals.get}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.get (section:base)', function() {
  var title;

  describe('object tests', function() {

    // newObj()= {
    //   'a':  'd',
    //   'b':  'e',
    //   'c':  'f',
    //   '1':   4,
    //   '2':   5,
    //   '3':   6,
    //   'a1': '1',
    //   'b2': '2',
    //   'c3': '3'
    // }

    title = titleStr('should return array of all keys');
    describe(title, function() {

      title = callStr('<object>');
      it(title, function() {
        var obj = newObj();
        var vals = vitals.get(obj);
        assert( is.arr(vals) );
        assert( has(vals, 'a') );
        assert( has(vals, 'b') );
        assert( has(vals, 'c') );
        assert( has(vals, '1') );
        assert( has(vals, '2') );
        assert( has(vals, '3') );
        assert( has(vals, 'a1') );
        assert( has(vals, 'b2') );
        assert( has(vals, 'c3') );
        assert( vals.length === 9 );
      });

    });

    title = titleStr('should return array of values where key matches val');
    describe(title, function() {

      title = callStr('<object>', /^[a-z]$/);
      it(title, function() {
        var obj = newObj();
        var vals = vitals.get(obj, /^[a-z]$/);
        assert( is.arr(vals) );
        assert( has(vals, 'd') );
        assert( has(vals, 'e') );
        assert( has(vals, 'f') );
        assert( vals.length === 3 );
      });

    });

    title = titleStr('should return array of keys where value === val');
    describe(title, function() {

      title = callStr('<object>', 5);
      it(title, function() {
        var obj = newObj();
        var vals = vitals.get(obj, 5);
        assert( is.arr(vals) );
        assert( vals[0] === '2' );
        assert( vals.length === 1 );
      });

    });

  });

  describe('array tests', function() {

    title = titleStr('should return array of all indexes');
    describe(title, function() {

      title = callStr('<array>');
      it(title, function() {
        var arr = [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        var vals = vitals.get(arr);
        assert( is.arr(vals) );
        assert( vals[0] === 0 );
        assert( vals[1] === 1 );
        assert( vals[2] === 2 );
        assert( vals[3] === 3 );
        assert( vals[4] === 4 );
        assert( vals[5] === 5 );
        assert( vals[6] === 6 );
        assert( vals[7] === 7 );
        assert( vals[8] === 8 );
        assert( vals.length === 9 );
      });

    });

    title = titleStr('should return array of indexes where value === val');
    describe(title, function() {

      title = callStr('<array>', 2);
      it(title, function() {
        var arr = [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        var vals = vitals.get(arr, 2);
        assert( is.arr(vals) );
        assert( vals[0] === 4 );
        assert( vals.length === 1 );
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should return array of substrs where substr matches val');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /[a-z]/);
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', /[a-z]/);
        assert( is.arr(vals) );
        assert( vals[0] === 'a' );
        assert( vals[1] === 'b' );
        assert( vals[2] === 'c' );
        assert( vals[3] === 'a' );
        assert( vals[4] === 'b' );
        assert( vals[5] === 'c' );
        assert( vals.length === 6 );
      });

    });

    title = 'should return an array of indexes where substr === String(val)';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('abc123a1b2c3', 1);
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', 1);
        assert( is.arr(vals) );
        assert( vals[0] === 3 );
        assert( vals[1] === 7 );
        assert( vals.length === 2 );
      });

      title = callStr('abc123a1b2c3', 5);
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', 5);
        assert( is.arr(vals) );
        assert( vals.length === 0 );
      });

      title = callStr('abc123a1b2c3', 'a');
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', 'a');
        assert( is.arr(vals) );
        assert( vals[0] === 0 );
        assert( vals[1] === 6 );
        assert( vals.length === 2 );
      });

      title = callStr('abc123a1b2c3', '*');
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', '*');
        assert( is.arr(vals) );
        assert( vals.length === 0 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get();
        });
      });

      title = callStr(null);
      it(title, function() {
        assert.throws(function() {
          vitals.get(null);
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.get('str');
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
  return testCall('get', arguments, 4);
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return {
    'a':  'd',
    'b':  'e',
    'c':  'f',
    '1':   4,
    '2':   5,
    '3':   6,
    'a1': '1',
    'b2': '2',
    'c3': '3'
  };
}
