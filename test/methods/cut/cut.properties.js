/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.PROPERTIES
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

describe('vitals.cut.properties (section:base)', function() {
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

    title = titleStr('should delete props from obj where key === val');
    describe(title, function() {

      title = callStr('<object>', 'a');
      it(title, function() {
        var obj = vitals.cut.props(newObj(), 'a');
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

      title = callStr('<object>', 'a', 'b');
      it(title, function() {
        var obj = vitals.cut.props(newObj(), 'a', 'b');
        assert( !has(obj, 'a')  );
        assert( !has(obj, 'b')  );
        assert(  has(obj, 'c')  );
        assert(  has(obj, '1')  );
        assert(  has(obj, '2')  );
        assert(  has(obj, '3')  );
        assert(  has(obj, 'a1') );
        assert(  has(obj, 'b2') );
        assert(  has(obj, 'c3') );
      });

      title = callStr('<object>', [ 'a', 'b', 2, /^[0-9]$/ ]);
      it(title, function() {
        var obj = vitals.cut.props(newObj(), [ 'a', 'b', 2, /^[0-9]$/ ]);
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

    title = 'should delete props from obj where key matches pattern';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('<object>', /a/);
      it(title, function() {
        var obj = vitals.cut.props(newObj(), /a/);
        assert( !has(obj, 'a')  );
        assert(  has(obj, 'b')  );
        assert(  has(obj, 'c')  );
        assert(  has(obj, '1')  );
        assert(  has(obj, '2')  );
        assert(  has(obj, '3')  );
        assert( !has(obj, 'a1') );
        assert(  has(obj, 'b2') );
        assert(  has(obj, 'c3') );
      });

      title = callStr('<object>', /^[0-9]$/);
      it(title, function() {
        var obj = vitals.cut.props(newObj(), /^[0-9]$/);
        assert(  has(obj, 'a')  );
        assert(  has(obj, 'b')  );
        assert(  has(obj, 'c')  );
        assert( !has(obj, '1')  );
        assert( !has(obj, '2')  );
        assert( !has(obj, '3')  );
        assert(  has(obj, 'a1') );
        assert(  has(obj, 'b2') );
        assert(  has(obj, 'c3') );
      });

      title = callStr('<object>', /a/, 'b');
      it(title, function() {
        var obj = vitals.cut.props(newObj(), /a/, 'b');
        assert( !has(obj, 'a')  );
        assert( !has(obj, 'b')  );
        assert(  has(obj, 'c')  );
        assert(  has(obj, '1')  );
        assert(  has(obj, '2')  );
        assert(  has(obj, '3')  );
        assert( !has(obj, 'a1') );
        assert( !has(obj, 'b2') );
        assert(  has(obj, 'c3') );
      });

      title = callStr('<object>', [ /a/, 2, /^3/ ]);
      it(title, function() {
        var obj = vitals.cut.props(newObj(), [ /a/, 2, /^3/ ]);
        assert( !has(obj, 'a')  );
        assert(  has(obj, 'b')  );
        assert(  has(obj, 'c')  );
        assert(  has(obj, '1')  );
        assert( !has(obj, '2')  );
        assert( !has(obj, '3')  );
        assert( !has(obj, 'a1') );
        assert( !has(obj, 'b2') );
        assert(  has(obj, 'c3') );
      });

    });

    title = titleStr('should delete props from obj where value === val');
    describe(title, function() {

      title = callStr('<object>', 4);
      it(title, function() {
        var obj = vitals.cut.props(newObj(), 4);
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

      title = callStr('<object>', 4, 'd');
      it(title, function() {
        var obj = vitals.cut.props(newObj(), 4, 'd');
        assert( !has(obj, 'a')  ); // = "d"
        assert(  has(obj, 'b')  ); // = "e"
        assert(  has(obj, 'c')  ); // = "f"
        assert( !has(obj, '1')  ); // =  4
        assert(  has(obj, '2')  ); // =  5
        assert(  has(obj, '3')  ); // =  6
        assert(  has(obj, 'a1') ); // = "1"
        assert(  has(obj, 'b2') ); // = "2"
        assert(  has(obj, 'c3') ); // = "3"
      });

      title = callStr('<object>', [ 6, '1', 8 ]);
      it(title, function() {
        var obj = vitals.cut.props(newObj(), [ 6, '1', 8 ]);
        assert(  has(obj, 'a')  ); // = "d"
        assert(  has(obj, 'b')  ); // = "e"
        assert(  has(obj, 'c')  ); // = "f"
        assert(  has(obj, '1')  ); // =  4
        assert(  has(obj, '2')  ); // =  5
        assert( !has(obj, '3')  ); // =  6
        assert( !has(obj, 'a1') ); // = "1"
        assert(  has(obj, 'b2') ); // = "2"
        assert(  has(obj, 'c3') ); // = "3"
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should splice props from array where index === val');
    describe(title, function() {

      title = callStr('<array>', 1);
      it(title, function() {
        var arr = vitals.cut.props(newArr(), 1);
        var be = [ 'a', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', 1, 3, 6, 9);
      it(title, function() {
        var arr = vitals.cut.props(newArr(), 1, 3, 6, 9);
        var be = [ 'a', 'c', 2, 3, 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', [ 0, 1 ]);
      it(title, function() {
        var arr = vitals.cut.props(newArr(), [ 0, 1 ]);
        var be = [ 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

    });

    title = titleStr('should splice props from array where value === val');
    describe(title, function() {

      title = callStr('<array>', 'a');
      it(title, function() {
        var arr = vitals.cut.props(newArr(), 'a');
        var be = [ 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', 1, 2, 'a');
      it(title, function() {
        var arr = vitals.cut.props(newArr(), 1, 2, 'a');
        var be = [ 'b', 'c', 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', [ 1, 2, 'a', /b/ ]);
      it(title, function() {
        var arr = vitals.cut.props(newArr(), 1, 2, 'a');
        var be = [ 'b', 'c', 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.cut.props();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.cut.props({});
        });
      });

      title = callStr(1, 1);
      it(title, function() {
        assert.throws(function() {
          vitals.cut.props(1, 1);
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
  return testCall('cut.props', arguments, 5, true);
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
