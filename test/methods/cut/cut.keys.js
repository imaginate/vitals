/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.KEYS
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

describe('vitals.cut.keys (section:base)', function() {
  var title;

  title = titleStr('basic', 'should delete props from obj where key === val');
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
      var obj = vitals.cut.keys(newObj(), 'a');
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
      var obj = vitals.cut.keys(newObj(), 1);
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
      var obj = vitals.cut.keys(newObj(), /a/);
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

      title = callStr('<object>', 1, 'b');
      it(title, function() {
        var obj = vitals.cut.keys(newObj(), 1, 'b');
        assert(  has(obj, 'a')  );
        assert( !has(obj, 'b')  );
        assert(  has(obj, 'c')  );
        assert( !has(obj, '1')  );
        assert(  has(obj, '2')  );
        assert(  has(obj, '3')  );
        assert(  has(obj, 'a1') );
        assert(  has(obj, 'b2') );
        assert(  has(obj, 'c3') );
      });

      title = callStr('<object>', [ 'a', 'b', 2, /^[0-9]$/ ]);
      it(title, function() {
        var obj = vitals.cut.keys(newObj(), [ 'a', 'b', 2, /^[0-9]$/ ]);
        assert( !has(obj, 'a')  );
        assert( !has(obj, 'b')  );
        assert(  has(obj, 'c')  );
        assert(  has(obj, '1')  );
        assert( !has(obj, '2')  );
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
        vitals.cut.keys();
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.cut.keys({});
      });
    });

    title = callStr(null, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.keys(null, 1);
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
  return testCall('cut.keys', arguments, 3);
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
