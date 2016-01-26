/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.PROPERTY
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

describe('vitals.cut.property (section:base)', function() {
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

    title = titleStr('should delete prop from obj where key === val');
    describe(title, function() {

      title = callStr('<object>', 'a');
      it(title, function() {
        var obj = vitals.cut.prop(newObj(), 'a');
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

    });

    title = 'should delete props from obj where key matches pattern';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('<object>', /a/);
      it(title, function() {
        var obj = vitals.cut.prop(newObj(), /a/);
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
        var obj = vitals.cut.prop(newObj(), /^[0-9]$/);
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

    });

    title = titleStr('should delete props from obj where value === val');
    describe(title, function() {

      title = callStr('<object>', 4);
      it(title, function() {
        var obj = vitals.cut.prop(newObj(), 4);
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

    });

    title = 'should delete props from obj where filter function returns false';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('<object>', '<filterFunc>');
      it(title, function() {
        var filter = function() { return true; };
        var obj = vitals.cut.prop(newObj(), filter);
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

      title = callStr('<object>', '<filterFunc>');
      it(title, function() {
        var filter = function() { return false; };
        var obj = vitals.cut.prop(newObj(), filter);
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

      title = callStr('<object>', '<filterFunc>');
      it(title, function() {
        var filter = function(val, key) {
          var combined = val + key;
          return combined.length > 2;
        };
        var obj = vitals.cut.prop(newObj(), filter);
        assert( !has(obj, 'a')  ); // = "d"
        assert( !has(obj, 'b')  ); // = "e"
        assert( !has(obj, 'c')  ); // = "f"
        assert( !has(obj, '1')  ); // =  4
        assert( !has(obj, '2')  ); // =  5
        assert( !has(obj, '3')  ); // =  6
        assert(  has(obj, 'a1') ); // = "1"
        assert(  has(obj, 'b2') ); // = "2"
        assert(  has(obj, 'c3') ); // = "3"
      });

      title = callStr('<object>', '<filterFunc>');
      it(title, function() {
        var filter = function(val, key, obj) {
          return has(obj, val);
        };
        var obj = vitals.cut.prop(newObj(), filter);
        assert( !has(obj, 'a')  ); // = "d"
        assert( !has(obj, 'b')  ); // = "e"
        assert( !has(obj, 'c')  ); // = "f"
        assert( !has(obj, '1')  ); // =  4
        assert( !has(obj, '2')  ); // =  5
        assert( !has(obj, '3')  ); // =  6
        assert(  has(obj, 'a1') ); // = "1"
        assert(  has(obj, 'b2') ); // = "2"
        assert(  has(obj, 'c3') ); // = "3"
      });

      title = callStr('<object>', '<filterFunc>', '<thisArg>');
      it(title, function() {
        var filter = function(val, key) {
          return has(this, key);
        };
        var thisArg = { a: 1, b: 1, c: 1 };
        var obj = vitals.cut.prop(newObj(), filter, thisArg);
        assert(  has(obj, 'a')  ); // = "d"
        assert(  has(obj, 'b')  ); // = "e"
        assert(  has(obj, 'c')  ); // = "f"
        assert( !has(obj, '1')  ); // =  4
        assert( !has(obj, '2')  ); // =  5
        assert( !has(obj, '3')  ); // =  6
        assert( !has(obj, 'a1') ); // = "1"
        assert( !has(obj, 'b2') ); // = "2"
        assert( !has(obj, 'c3') ); // = "3"
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should splice prop from array where index === val');
    describe(title, function() {

      title = callStr('<array>', 1);
      it(title, function() {
        var arr = vitals.cut.prop(newArr(), 1);
        var be = [ 'a', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

    });

    title = titleStr('should splice props from array where value === val');
    describe(title, function() {

      title = callStr('<array>', 'a');
      it(title, function() {
        var arr = vitals.cut.prop(newArr(), 'a');
        var be = [ 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

    });

    title = 'should splice props from array where filter function returns false';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('<array>', '<filterFunc>');
      it(title, function() {
        var filter = function() { return true; };
        var arr = vitals.cut.prop(newArr(), filter);
        var be = [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', '<filterFunc>');
      it(title, function() {
        var filter = function() { return false; };
        var arr = vitals.cut.prop(newArr(), filter);
        assert( !arr.length );
      });

      title = callStr('<array>', '<filterFunc>');
      it(title, function() {
        var filter = function(val, i) {
          var combined = String(val + i);
          return combined.length > 2;
        };
        var arr = vitals.cut.prop(newArr(), filter);
        var be = [ 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', '<filterFunc>');
      it(title, function() {
        var filter = function(val, i, arr) {
          return arr.some(function(subval) {
            return arr.indexOf(val + subval) !== -1;
          });
        };
        var arr = vitals.cut.prop(newArr(), filter);
        var be = [ 'a', 'b', 'c' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', '<filterFunc>', '<thisArg>');
      it(title, function() {
        var filter = function(val, i, arr) {
          var that = this;
          return arr.some(function(subval) {
            return that.indexOf(val + subval) !== -1;
          });
        };
        var thisArg = [ 4, 6, 8 ];
        var arr = vitals.cut.prop(newArr(), filter, thisArg);
        var be = [ 1, 2, 3 ];
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
          vitals.cut.prop();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.cut.prop({});
        });
      });

      title = callStr(1, 1);
      it(title, function() {
        assert.throws(function() {
          vitals.cut.prop(1, 1);
        });
      });

      title = callStr({}, function(){}, false);
      it(title, function() {
        assert.throws(function() {
          vitals.cut.prop({}, function(){}, false);
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
  return testCall('cut.prop', arguments, 5, true);
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
