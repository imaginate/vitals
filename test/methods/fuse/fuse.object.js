/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FUSE.OBJECT
 * -----------------------------------------------------------------------------
 * @see [vitals.fuse]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fuse.js}
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

describe('vitals.fuse.object (section:base)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should merge all obj props to dest obj');
    describe(title, function() {

      title = callStr({ a: 1 }, { a: 10, z: 10 });
      it(title, function() {
        var obj = vitals.fuse.obj({ a: 1 }, { a: 10, z: 10 });
        assert( obj.a === 10 );
        assert( obj.z === 10 );
      });

      title = callStr({ a: 1 }, { a: 5 }, { b: 5 }, null, { c: 5 });
      it(title, function() {
        var obj = vitals.fuse.obj({ a: 1 }, { a: 5 }, { b: 5 }, null, { c: 5 });
        assert( obj.a === 5 );
        assert( obj.b === 5 );
        assert( obj.c === 5 );
      });

      title = callStr({ a: 1 }, [ { a: 5 }, { b: 5 }, { c: 5 } ]);
      it(title, function() {
        var obj = vitals.fuse.obj({ a: 1 }, [ { a: 5 }, { b: 5 }, { c: 5 } ]);
        assert( obj.a === 5 );
        assert( obj.b === 5 );
        assert( obj.c === 5 );
      });

    });

    title = titleStr('should add new props to dest obj');
    describe(title, function() {

      title = callStr({ a: 1 }, 'z');
      it(title, function() {
        var obj = vitals.fuse.obj({ a: 1 }, 'z');
        assert( obj.a === 1 );
        assert( has(obj, 'z') );
        assert( obj.z === undefined );
      });

      title = callStr({ a: 1 }, 'a', 'b', 'c', null);
      it(title, function() {
        var obj = vitals.fuse.obj({ a: 1 }, 'a', 'b', 'c', null);
        each([ 'a','b','c' ], function(key) {
          assert( has(obj, key) );
          assert( obj[key] === undefined );
        });
      });

      title = callStr({ a: 1 }, [ 'a', 'b', 'c' ]);
      it(title, function() {
        var obj = vitals.fuse.obj({ a: 1 }, [ 'a', 'b', 'c' ]);
        each([ 'a','b','c' ], function(key) {
          assert( has(obj, key) );
          assert( obj[key] === undefined );
        });
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.obj();
        });
      });

      title = callStr({});
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.obj({});
        });
      });

      title = callStr(null, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.obj(null, 5);
        });
      });

      title = callStr('str', 5);
      it(title, function() {
        assert.throws(function() {
          vitals.fuse.obj('str', 5);
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
  return testCall('fuse.obj', arguments, 5, true);
}
