/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.TYPE
 * -----------------------------------------------------------------------------
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/blob/master/src/methods/cut.js}
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

describe('vitals.cut.type (section:base)', function() {
  var title;

  title = 'should delete props from obj where is(type, value)';
  title = titleStr('object', title);
  describe(title, function() {

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

    title = callStr('<object>', 'string');
    it(title, function() {
      var obj = vitals.cut.type(newObj(), 'string');
      assert( !has(obj, 'a')  ); // = "d"
      assert( !has(obj, 'b')  ); // = "e"
      assert( !has(obj, 'c')  ); // = "f"
      assert(  has(obj, '1')  ); // =  4
      assert(  has(obj, '2')  ); // =  5
      assert(  has(obj, '3')  ); // =  6
      assert( !has(obj, 'a1') ); // = "1"
      assert( !has(obj, 'b2') ); // = "2"
      assert( !has(obj, 'c3') ); // = "3"
    });

    title = callStr('<object>', 'number');
    it(title, function() {
      var obj = vitals.cut.type(newObj(), 'number');
      assert(  has(obj, 'a')  ); // = "d"
      assert(  has(obj, 'b')  ); // = "e"
      assert(  has(obj, 'c')  ); // = "f"
      assert( !has(obj, '1')  ); // =  4
      assert( !has(obj, '2')  ); // =  5
      assert( !has(obj, '3')  ); // =  6
      assert(  has(obj, 'a1') ); // = "1"
      assert(  has(obj, 'b2') ); // = "2"
      assert(  has(obj, 'c3') ); // = "3"
    });

    title = callStr('<object>', 'object');
    it(title, function() {
      var obj = vitals.cut.type(newObj(), 'object');
      assert(  has(obj, 'a')  ); // = "d"
      assert(  has(obj, 'b')  ); // = "e"
      assert(  has(obj, 'c')  ); // = "f"
      assert(  has(obj, '1')  ); // =  4
      assert(  has(obj, '2')  ); // =  5
      assert(  has(obj, '3')  ); // =  6
      assert(  has(obj, 'a1') ); // = "1"
      assert(  has(obj, 'b2') ); // = "2"
      assert(  has(obj, 'c3') ); // = "3"
    });

    title = callStr('<object>', 'string|number');
    it(title, function() {
      var obj = vitals.cut.type(newObj(), 'string|number');
      assert( !has(obj, 'a')  ); // = "d"
      assert( !has(obj, 'b')  ); // = "e"
      assert( !has(obj, 'c')  ); // = "f"
      assert( !has(obj, '1')  ); // =  4
      assert( !has(obj, '2')  ); // =  5
      assert( !has(obj, '3')  ); // =  6
      assert( !has(obj, 'a1') ); // = "1"
      assert( !has(obj, 'b2') ); // = "2"
      assert( !has(obj, 'c3') ); // = "3"
    });

  });

  title = 'should splice props from array where is(type, value)';
  title = titleStr('array', title);
  describe(title, function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = callStr('<array>', 'string');
    it(title, function() {
      var arr = vitals.cut.type(newArr(), 'string');
      var be = [ 1, 2, 3 ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', 'number');
    it(title, function() {
      var arr = vitals.cut.type(newArr(), 'number');
      var be = [ 'a', 'b', 'c', 'a1', 'b2', 'c3' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', 'object');
    it(title, function() {
      var arr = vitals.cut.type(newArr(), 'object');
      var be = [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', 'string|number');
    it(title, function() {
      var arr = vitals.cut.type(newArr(), 'string|number');
      assert( !arr.length );
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type();
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type({});
      });
    });

    title = callStr({}, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type({}, 1);
      });
    });

    title = callStr({}, 'a');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type({}, 'a');
      });
    });

    title = callStr(null, 'string');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.type(null, 'string');
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
  return testTitle(section, shouldMsg, 1);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('cut.type', arguments, 3);
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

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
