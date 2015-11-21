/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.KEY
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

describe('vitals.cut.key (sections:js,base)', function() {
  var title;

  title = titleStr('basic', 'should delete prop from obj where key === val');
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

    title = callStr('<object>', 'a');
    it(title, function() {
      var obj = vitals.cut.key(newObj(), 'a');
      assert( !has(obj, 'a')  );
      assert(  has(obj, 'b')  );
      assert(  has(obj, 'c')  );
      assert(  has(obj, '1')  );
      assert(  has(obj, '2')  );
      assert(  has(obj, '3')  );
      assert(  has(obj, 'a1') );
      assert(  has(obj, 'b2') );
      assert(  has(obj, 'c3') );
    });

    title = callStr('<object>', 1);
    it(title, function() {
      var obj = vitals.cut.key(newObj(), 1);
      assert(  has(obj, 'a')  );
      assert(  has(obj, 'b')  );
      assert(  has(obj, 'c')  );
      assert( !has(obj, '1')  );
      assert(  has(obj, '2')  );
      assert(  has(obj, '3')  );
      assert(  has(obj, 'a1') );
      assert(  has(obj, 'b2') );
      assert(  has(obj, 'c3') );
    });

    title = callStr('<object>', /a/);
    it(title, function() {
      var obj = vitals.cut.key(newObj(), /a/);
      assert(  has(obj, 'a')  );
      assert(  has(obj, 'b')  );
      assert(  has(obj, 'c')  );
      assert(  has(obj, '1')  );
      assert(  has(obj, '2')  );
      assert(  has(obj, '3')  );
      assert(  has(obj, 'a1') );
      assert(  has(obj, 'b2') );
      assert(  has(obj, 'c3') );
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.key();
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.cut.key({});
      });
    });

    title = callStr(null, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.key(null, 1);
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
  return testCall('cut.key', arguments, 4, true);
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
