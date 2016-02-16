/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - HAS
 * -----------------------------------------------------------------------------
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/wiki/vitals.has}
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

describe('vitals.has (section:base)', function() {
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

    title = titleStr('should return true (key owned by obj)');
    describe(title, function() {

      title = callStr('<object>', 'a');
      it(title, function() {
        assert( vitals.has(newObj(), 'a') );
      });

      title = callStr('<object>', 1);
      it(title, function() {
        assert( vitals.has(newObj(), 1) );
      });

    });

    title = titleStr('should return false (key not owned by obj)');
    describe(title, function() {

      title = callStr(null, 'key');
      it(title, function() {
        assert( !vitals.has(null, 'key') );
      });

      title = callStr('<object>', 'd');
      it(title, function() {
        assert( !vitals.has(newObj(), 'd') );
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should return true (value in array)');
    describe(title, function() {

      title = callStr('<array>', 3);
      it(title, function() {
        assert( vitals.has(newArr(), 3) );
      });

      title = callStr('<array>', 'a');
      it(title, function() {
        assert( vitals.has(newArr(), 'a') );
      });

    });

    title = titleStr('should return false (value not in array)');
    describe(title, function() {

      title = callStr('<array>', 5);
      it(title, function() {
        assert( !vitals.has(newArr(), 5) );
      });

      title = callStr('<array>', '1');
      it(title, function() {
        assert( !vitals.has(newArr(), '1') );
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should return true (substr match in string)');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /[a-z]/);
      it(title, function() {
        assert( vitals.has('abc123a1b2c3', /[a-z]/) );
      });

      title = callStr('abc123a1b2c3', 1);
      it(title, function() {
        assert( vitals.has('abc123a1b2c3', 1) );
      });

      title = callStr('abc123a1b2c3', 'a');
      it(title, function() {
        assert( vitals.has('abc123a1b2c3', 'a') );
      });

    });

    title = titleStr('should return false (substr match not in string)');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /^[a-z]$/);
      it(title, function() {
        assert( !vitals.has('abc123a1b2c3', /^[a-z]$/) );
      });

      title = callStr('abc123a1b2c3', 5);
      it(title, function() {
        assert( !vitals.has('abc123a1b2c3', 5) );
      });

      title = callStr('abc123a1b2c3', 'd');
      it(title, function() {
        assert( !vitals.has('abc123a1b2c3', 'd') );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.has();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.has({});
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.has('str');
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
  return testCall('has', arguments, 4);
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
