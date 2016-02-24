/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.VALUE
 * -----------------------------------------------------------------------------
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/wiki/vitals.cut}
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

describe('vitals.cut.value (section:base)', function() {
  var title;

  title = 'should delete props from obj where value === val';
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

    title = callStr('<object>', 'd');
    it(title, function() {
      var obj = vitals.cut.val(newObj(), 'd');
      assert( !has(obj, 'a')  ); // = "d"
      assert(  has(obj, 'b')  ); // = "e"
      assert(  has(obj, 'c')  ); // = "f"
      assert(  has(obj, '1')  ); // =  4
      assert(  has(obj, '2')  ); // =  5
      assert(  has(obj, '3')  ); // =  6
      assert(  has(obj, 'a1') ); // = "1"
      assert(  has(obj, 'b2') ); // = "2"
      assert(  has(obj, 'c3') ); // = "3"
    });

    title = callStr('<object>', 4);
    it(title, function() {
      var obj = vitals.cut.val(newObj(), 4);
      assert(  has(obj, 'a')  ); // = "d"
      assert(  has(obj, 'b')  ); // = "e"
      assert(  has(obj, 'c')  ); // = "f"
      assert( !has(obj, '1')  ); // =  4
      assert(  has(obj, '2')  ); // =  5
      assert(  has(obj, '3')  ); // =  6
      assert(  has(obj, 'a1') ); // = "1"
      assert(  has(obj, 'b2') ); // = "2"
      assert(  has(obj, 'c3') ); // = "3"
    });

    title = callStr('<object>', /a/g);
    it(title, function() {
      var obj = vitals.cut.val(newObj(), /a/g);
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

  });

  title = 'should splice props from array where value === val';
  title = titleStr('array', title);
  describe(title, function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = callStr('<array>', 1);
    it(title, function() {
      var arr = vitals.cut.val(newArr(), 1);
      var be = [ 'a', 'b', 'c', 2, 3, 'a1', 'b2', 'c3' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', 'a');
    it(title, function() {
      var arr = vitals.cut.val(newArr(), 'a');
      var be = [ 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

    title = callStr('<array>', /a/g);
    it(title, function() {
      var arr = vitals.cut.val(newArr(), /a/g);
      var be = [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
      each(be, function(val, i) {
        assert(arr[i] === val);
      });
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.val();
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.cut.val({});
      });
    });

    title = callStr(null, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.val(null, 1);
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
  return testCall('cut.val', arguments, 3);
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
