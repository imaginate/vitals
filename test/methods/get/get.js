/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET
 * -----------------------------------------------------------------------------
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/blob/master/src/methods/get.js}
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
        var keys = vitals.get( newObj() ).sort();
        assert( keys.length === 9 );
        each(newObj(true).sort(), function(key, i) {
          assert( keys[i] === key );
        });
      });

    });

    title = titleStr('should return array of values where key matches val');
    describe(title, function() {

      title = callStr('<object>', /^[a-z]$/);
      it(title, function() {
        var vals = vitals.get(newObj(), /^[a-z]$/).sort();
        assert( vals.length === 3 );
        each([ 'd','e','f' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

    });

    title = titleStr('should return array of keys where value === val');
    describe(title, function() {

      title = callStr('<object>', 5);
      it(title, function() {
        var vals = vitals.get(newObj(), 5);
        assert( vals.length === 1 );
        assert( vals[0] === '2' );
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should return array of all indexes');
    describe(title, function() {

      title = callStr('<array>');
      it(title, function() {
        var inds = vitals.get( newArr() );
        assert( inds.length === 9 );
        each(9, function(i) {
          assert( inds[i] === i );
        });
      });

    });

    title = titleStr('should return array of indexes where value === val');
    describe(title, function() {

      title = callStr('<array>', 2);
      it(title, function() {
        var vals = vitals.get(newArr(), 2);
        assert( vals.length === 1 );
        assert( vals[0] === 4 );
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should return array of substrs where substr matches val');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /[a-z]/);
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', /[a-z]/);
        assert( vals.length === 6 );
        each([ 'a','b','c','a','b','c' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

    });

    title = titleStr('should return an array of indexes where substr == val');
    describe(title, function() {

      title = callStr('abc123a1b2c3', 5);
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', 5);
        assert( vals.length === 0 );
      });

      title = callStr('abc123a1b2c3', 'a');
      it(title, function() {
        var vals = vitals.get('abc123a1b2c3', 'a');
        assert( vals.length === 2 );
        assert( vals[0] === 0 );
        assert( vals[1] === 6 );
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
 * @param {boolean=} keys
 * @return {!Object}
 */
function newObj(keys) {
  return keys
    ? [ 'a', 'b', 'c', '1', '2', '3', 'a1', 'b2', 'c3' ]
    : {
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

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
