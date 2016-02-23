/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.amend.property
 * -----------------------------------------------------------------------------
 * @see [vitals.amend docs](https://github.com/imaginate/vitals/wiki/vitals.amend)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.amend.property (section:strict)', function() {
  var title;

  title = titleStr('should add prop to obj');
  describe(title, function() {

    title = callStr({}, 'a', 1);
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1);
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
    });
  });

  title = titleStr('should add prop to obj with valid descriptor');
  describe(title, function() {

    title = callStr({}, 'a', '<descriptor>');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
    });

    title = callStr({}, 'a', 1, '<descriptor>');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
    });
  });

  title = titleStr('should add prop to obj with strong type check');
  describe(title, function() {

    title = callStr({}, 'a', 1, 'number');
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number');
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 2 );
    });

    title = callStr({}, 'a', 1, '<descriptor>', 'number');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number');
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 2 );
    });

    title = callStr({}, 'a', '<descriptor>', 'number');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number');
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 2 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 2 );
    });
  });

  title = titleStr('should add prop to obj with valid setter');
  describe(title, function() {

    title = callStr({}, 'a', 1, '<setter>');
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, setter);
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
    });

    title = callStr({}, 'a', 1, '<descriptor>', '<setter>');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
    });

    title = callStr({}, 'a', '<descriptor>', '<setter>');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
    });

    title = callStr({}, 'a', 1, 'number', '<setter>');
    it(title, function() {
      var obj = vitals.amend.prop({}, 'a', 1, 'number', setter);
      assert( hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 3 );
    });

    title = callStr({}, 'a', 1, '<descriptor>', 'number', '<setter>');
    it(title, function() {
      var desc = freeze({ enumerable: false });
      var obj = vitals.amend.prop({}, 'a', 1, desc, 'number', setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 3 );
    });

    title = callStr({}, 'a', '<descriptor>', 'number', '<setter>');
    it(title, function() {
      var desc = freeze({ value: 1, enumerable: false });
      var obj = vitals.amend.prop({}, 'a', desc, 'number', setter);
      assert( !hasEnum(obj, 'a') );
      assert( obj.a === 1 );
      obj.a = 2;
      assert( obj.a === 3 );
      assert.throws(function() { obj.a = 'string'; }, validSetErr);
      assert( obj.a === 3 );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.amend({});
      }, validTypeErr);
    });

    title = callStr({}, 'a');
    it(title, function() {
      assert.throws(function() {
        vitals.amend({}, 'a');
      }, validErr);
    });

    title = callStr('string', 'a', 5);
    it(title, function() {
      assert.throws(function() {
        vitals.amend('string', 'a', 5);
      }, validTypeErr);
    });

    title = callStr({}, 5, 5);
    it(title, function() {
      assert.throws(function() {
        vitals.amend({}, 5, 5);
      }, validTypeErr);
    });

    title = callStr({}, 'a', 5, 'string');
    it(title, function() {
      assert.throws(function() {
        vitals.amend({}, 'a', 5, 'string');
      }, validErr);
    });

    title = callStr({}, 'a', 5, 'number', {});
    it(title, function() {
      assert.throws(function() {
        vitals.amend({}, 'a', 5, 'number', {});
      }, validTypeErr);
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
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('amend.prop', arguments, 3);
}

/**
 * @private
 * @param {number} newVal
 * @param {number=} oldVal
 * @return {number}
 */
function setter(newVal, oldVal) {
  oldVal = oldVal || 1;
  return newVal + oldVal;
}
