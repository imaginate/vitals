/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - UNTIL.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.until]{@link https://github.com/imaginate/vitals/blob/master/src/methods/until.js}
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

describe('vitals.until.object (section:base)', function() {
  var title;

  describe('basic tests', function() {

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

    title = titleStr('should iterate over every prop');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var obj = {};
        vitals.until.obj(true, newObj(), function(val, key) {
          obj[key] = val;
        });
        each(newObj(), function(val, key) {
          assert( obj[key] === val );
        });
      });

    });

    title = titleStr('should return valid boolean');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until.obj(true, newObj(), function(val, key) {
          return val === 5;
        });
        assert( pass === true );
      });

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until.obj(true, newObj(), function(val, key) {
          return val === '5';
        });
        assert( fail === false );
      });

      title = callStr(5, '<object>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until.obj(5, newObj(), function(val, key) {
          return val;
        });
        assert( pass === true );
      });

      title = callStr('5', '<object>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until.obj('5', newObj(), function(val, key) {
          return val;
        });
        assert( fail === false );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>');
      it(title, function() {
        var obj1 = newObj();
        vitals.until.obj(true, obj1, function(val, key, obj) {
          assert( obj !== obj1 );
        });
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr(true, '<object>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var obj = newObj();
        var thisArg = {};
        vitals.until.obj(true, obj, function(val, key) {
          this[key] = val;
        }, thisArg);
        each(obj, function(val, key) {
          assert( has(thisArg, key)    );
          assert( thisArg[key] === val );
        });
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.until.obj();
        });
      });

      title = callStr(true);
      it(title, function() {
        assert.throws(function() {
          vitals.until.obj(true);
        });
      });

      title = callStr(true, {});
      it(title, function() {
        assert.throws(function() {
          vitals.until.obj(true, {});
        });
      });

      title = callStr(true, null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.until.obj(true, null, function(){});
        });
      });

      title = callStr(true, {}, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.until.obj(true, {}, function(){}, 'fail');
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
  return breakStr(shouldMsg, 4, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('until.obj', arguments, 5, true);
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
