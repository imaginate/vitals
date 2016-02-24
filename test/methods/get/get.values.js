/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.VALUES
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
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.get.values (section:base)', function() {
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

    title = titleStr('should return array of all values');
    describe(title, function() {

      title = callStr('<object>');
      it(title, function() {
        var keys = vitals.get.vals( newObj() ).sort();
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
        var vals = vitals.get.vals(newObj(), /^[a-z]$/).sort();
        assert( vals.length === 3 );
        each([ 'd','e','f' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

      title = callStr('<object>', 1);
      it(title, function() {
        var vals = vitals.get.vals(newObj(), 1);
        assert( vals.length === 2 );
        assert( vals[0] ===  4  );
        assert( vals[1] === '1' );
      });

      title = callStr('<object>', '1');
      it(title, function() {
        var vals = vitals.get.vals(newObj(), '1');
        assert( vals.length === 2 );
        assert( vals[0] ===  4  );
        assert( vals[1] === '1' );
      });

      title = callStr('<object>', 4);
      it(title, function() {
        var vals = vitals.get.vals(newObj(), 4);
        assert( vals.length === 0 );
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should return array of substrs where substr matches val');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /[a-z]/);
      it(title, function() {
        var vals = vitals.get.vals('abc123a1b2c3', /[a-z]/);
        assert( vals.length === 6 );
        each([ 'a','b','c','a','b','c' ], function(val, i) {
          assert( vals[i] === val );
        });
      });

      title = callStr('abc123a1b2c3', 5);
      it(title, function() {
        var vals = vitals.get.vals('abc123a1b2c3', 5);
        assert( vals.length === 0 );
      });

      title = callStr('abc123a1b2c3', 'a');
      it(title, function() {
        var vals = vitals.get.vals('abc123a1b2c3', 'a');
        assert( vals.length === 2 );
        assert( vals[0] === 'a' );
        assert( vals[1] === 'a' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.vals();
        });
      });

      title = callStr(null);
      it(title, function() {
        assert.throws(function() {
          vitals.get.vals(null);
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.get.vals('str');
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
  return testCall('get.vals', arguments, 4);
}

/**
 * @private
 * @param {boolean=} vals
 * @return {!Object}
 */
function newObj(vals) {
  return vals
    ? [ 'd', 'e', 'f', 4, 5, 6, '1', '2', '3' ]
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
