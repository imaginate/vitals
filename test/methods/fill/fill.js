/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FILL
 * -----------------------------------------------------------------------------
 * @see [vitals.fill]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fill.js}
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

describe('vitals.fill (section:base)', function() {
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

    title = titleStr('should fill object properties with val');
    describe(title, function() {

      title = callStr('<object>', 5);
      it(title, function() {
        var keys = newObj(true);
        var obj = vitals.fill(newObj(), 5);
        each(keys, function(key) {
          assert( has(obj, key)  );
          assert( obj[key] === 5 );
        });
      });

      title = callStr('<object>', 'a,b,c', 5);
      it(title, function() {
        var obj1 = newObj();
        var obj2 = vitals.fill(newObj(), 'a,b,c', 5);
        each(obj1, function(val, key) {
          assert( has(obj2, key) );
          if ( /^[a-z]$/.test(key) ) assert( obj2[key] === 5 );
          else assert( obj2[key] === val );
        });
      });

      title = callStr('<object>', [ 'x', 'y', 'z' ], 5);
      it(title, function() {
        var obj = vitals.fill(newObj(), [ 'x', 'y', 'z' ], 5);
        assert( obj.x === 5 );
        assert( obj.y === 5 );
        assert( obj.z === 5 );
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should fill array properties with val');
    describe(title, function() {

      title = callStr('<array>', 5);
      it(title, function() {
        var arr = vitals.fill(newArr(), 5);
        each(9, function(i) {
          assert( arr[i] === 5 );
        });
      });

      title = callStr('<array>', 5, 2);
      it(title, function() {
        var arr = vitals.fill(newArr(), 5, 2);
        each(newArr(), function(val, i) {
          if (i > 1) assert( arr[i] === 5 );
          else assert( arr[i] === val );
        });
      });

      title = callStr('<array>', 5, -2);
      it(title, function() {
        var arr = vitals.fill(newArr(), 5, -2);
        each(newArr(), function(val, i) {
          if (i > 6) assert( arr[i] === 5 );
          else assert( arr[i] === val );
        });
      });

      title = callStr('<array>', 5, 0, 3);
      it(title, function() {
        var arr = vitals.fill(newArr(), 5, 0, 3);
        each(newArr(), function(val, i) {
          if (i > 2) assert( arr[i] === val );
          else assert( arr[i] === 5 );
        });
      });

      title = callStr('<array>', 5, 0, -3);
      it(title, function() {
        var arr = vitals.fill(newArr(), 5, 0, -3);
        each(newArr(), function(val, i) {
          if (i > 5) assert( arr[i] === val );
          else assert( arr[i] === 5 );
        });
      });

      title = callStr('<array>', 5, -3, -1);
      it(title, function() {
        var arr = vitals.fill(newArr(), 5, -3, -1);
        each(newArr(), function(val, i) {
          if (i === 6 || i === 7) assert( arr[i] === 5 );
          else assert( arr[i] === val );
        });
      });

    });

  });

  describe('string tests', function() {

    title = titleStr('should fill new string with val x times');
    describe(title, function() {

      title = callStr(5, 5);
      it(title, function() {
        var str = vitals.fill(5, 5);
        assert( str === '55555' );
      });

      title = callStr(0, 5);
      it(title, function() {
        var str = vitals.fill(0, 5);
        assert( str === '' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fill();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.fill({});
        });
      });

      title = callStr(false, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fill(false, 5);
        });
      });

      title = callStr([], 'keys', 'val');
      it(title, function() {
        assert.throws(function() {
          vitals.fill([], 'keys', 'val');
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
  return testCall('fill', arguments, 5, true);
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
