/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT
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

describe('vitals.cut (sections:js,base)', function() {
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
        var obj = vitals.cut(newObj(), 'a');
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
        var obj = vitals.cut(newObj(), 'a', 'b');
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
        var obj = vitals.cut(newObj(), [ 'a', 'b', 2, /^[0-9]$/ ]);
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
        var obj = vitals.cut(newObj(), /a/);
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
        var obj = vitals.cut(newObj(), /^[0-9]$/);
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
        var obj = vitals.cut(newObj(), /a/, 'b');
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
        var obj = vitals.cut(newObj(), [ /a/, 2, /^3/ ]);
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
        var obj = vitals.cut(newObj(), 4);
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
        var obj = vitals.cut(newObj(), 4, 'd');
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
        var obj = vitals.cut(newObj(), [ 6, '1', 8 ]);
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

    title = 'should delete props from obj where filter function returns false';
    title = titleStr(title);
    describe(title, function() {

      title = callStr('<object>', '<filterFunc>');
      it(title, function() {
        var filter = function() { return true; };
        var obj = vitals.cut(newObj(), filter);
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
        var obj = vitals.cut(newObj(), filter);
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
        var obj = vitals.cut(newObj(), filter);
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
        var obj = vitals.cut(newObj(), filter);
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
        var obj = vitals.cut(newObj(), filter, thisArg);
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

    title = titleStr('should splice props from array where index === val');
    describe(title, function() {

      title = callStr('<array>', 1);
      it(title, function() {
        var arr = vitals.cut(newArr(), 1);
        var be = [ 'a', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', 1, 3, 6, 9);
      it(title, function() {
        var arr = vitals.cut(newArr(), 1, 3, 6, 9);
        var be = [ 'a', 'c', 2, 3, 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', [ 0, 1 ]);
      it(title, function() {
        var arr = vitals.cut(newArr(), [ 0, 1 ]);
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
        var arr = vitals.cut(newArr(), 'a');
        var be = [ 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', 1, 2, 'a');
      it(title, function() {
        var arr = vitals.cut(newArr(), 1, 2, 'a');
        var be = [ 'b', 'c', 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', [ 1, 2, 'a', /b/ ]);
      it(title, function() {
        var arr = vitals.cut(newArr(), 1, 2, 'a');
        var be = [ 'b', 'c', 3, 'a1', 'b2', 'c3' ];
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
        var arr = vitals.cut(newArr(), filter);
        var be = [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

      title = callStr('<array>', '<filterFunc>');
      it(title, function() {
        var filter = function() { return false; };
        var arr = vitals.cut(newArr(), filter);
        assert( !arr.length );
      });

      title = callStr('<array>', '<filterFunc>');
      it(title, function() {
        var filter = function(val, i) {
          var combined = String(val + i);
          return combined.length > 2;
        };
        var arr = vitals.cut(newArr(), filter);
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
        var arr = vitals.cut(newArr(), filter);
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
        var arr = vitals.cut(newArr(), filter, thisArg);
        var be = [ 1, 2, 3 ];
        each(be, function(val, i) {
          assert(arr[i] === val);
        });
      });

    });

  });

  describe('string tests', function() {

    // newStr()= "abc123a1b2c3"

    title = titleStr('should remove all substring occurrences from string');
    describe(title, function() {

      title = callStr(newStr(), 'a');
      it(title, function() {
        var str = vitals.cut(newStr(), 'a');
        var be = 'bc1231b2c3';
        assert(str === be);
      });

      title = callStr(newStr(), 1, 'a');
      it(title, function() {
        var str = vitals.cut(newStr(), 1, 'a');
        var be = 'bc23b2c3';
        assert(str === be);
      });

      title = callStr(newStr(), [ { 'a': 2 }, 1, 'c' ]);
      it(title, function() {
        var str = vitals.cut(newStr(), [ { 'a': 2 }, 1, 'c' ]);
        var be = 'ab23ab23';
        assert(str === be);
      });

    });

    title = titleStr('should remove all substring patterns from string');
    describe(title, function() {

      title = callStr(newStr(), /[a-z]/);
      it(title, function() {
        var str = vitals.cut(newStr(), /[a-z]/);
        var be = 'bc123a1b2c3';
        assert(str === be);
      });

      title = callStr(newStr(), /[a-z]/g);
      it(title, function() {
        var str = vitals.cut(newStr(), /[a-z]/g);
        var be = '123123';
        assert(str === be);
      });

      title = callStr(newStr(), /[a-z]/, 1, 'c');
      it(title, function() {
        var str = vitals.cut(newStr(), /[a-z]/, 1, 'c');
        var be = 'b23ab23';
        assert(str === be);
      });

      title = callStr(newStr(), [ 1, 'a', /[a-z][0-9]/ ]);
      it(title, function() {
        var str = vitals.cut(newStr(), [ 1, 'a', /[a-z][0-9]/ ]);
        var be = 'b3b2c3';
        assert(str === be);
        // Test Result Explained              (str= "abc123a1b2c3")
        // Step 1) cuts "1" from str          (str= "abc23ab2c3")
        // Step 2) cuts "a" from str          (str= "bc23b2c3")
        // Step 3) cuts /[a-z][0-9]/ from str (str= "b3b2c3")
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.cut();
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
  return testCall('cut', arguments, 5, true);
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

/**
 * @private
 * @return {string}
 */
function newStr() {
  return 'abc123a1b2c3';
}
