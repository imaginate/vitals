/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - HAS.VALUE
 * -----------------------------------------------------------------------------
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}
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

describe('vitals.has.value (section:base)', function() {
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

    title = titleStr('should return true');
    describe(title, function() {

      title = callStr('<object>', 'd');
      it(title, function() {
        assert( vitals.has.val(newObj(), 'd') );
      });

      title = callStr('<object>', 5);
      it(title, function() {
        assert( vitals.has.val(newObj(), 5) );
      });

    });

    title = titleStr('should return false');
    describe(title, function() {

      title = callStr(null, 'val');
      it(title, function() {
        assert( !vitals.has.val(null, 'val') );
      });

      title = callStr('<object>', 'a');
      it(title, function() {
        assert( !vitals.has.val(newObj(), 'a') );
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should return true');
    describe(title, function() {

      title = callStr('<array>', 3);
      it(title, function() {
        assert( vitals.has.val(newArr(), 3) );
      });

      title = callStr('<array>', 'a');
      it(title, function() {
        assert( vitals.has.val(newArr(), 'a') );
      });

    });

    title = titleStr('should return false');
    describe(title, function() {

      title = callStr('<array>', 5);
      it(title, function() {
        assert( !vitals.has.val(newArr(), 5) );
      });

      title = callStr('<array>', '1');
      it(title, function() {
        assert( !vitals.has.val(newArr(), '1') );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.has.val();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.has.val({});
        });
      });

      title = callStr('str', 'val');
      it(title, function() {
        assert.throws(function() {
          vitals.has.val('str', 'val');
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
  return testCall('has.val', arguments, 4);
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
