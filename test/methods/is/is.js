/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - IS
 * -----------------------------------------------------------------------------
 * @see [vitals.is]{@link https://github.com/imaginate/vitals/blob/master/src/methods/is.js}
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

/** @type {!Object<string, !Object>} */
var TESTS = {
  'primitives': {
    'null': {
      shortcut: 'nil',
      truthy: [ null ],
      falsy:  [ {}, false, undefined ],
      plural: {
        truthy: [ [ null, null ] ],
        falsy:  [ [ null, undefined ] ]
      }
    },
    'undefined': {
      truthy: [ undefined ],
      falsy:  [ {}, null, false ],
      plural: {
        truthy: [ [ undefined, undefined ] ],
        falsy:  [ [ null, undefined ] ]
      }
    },
    'boolean': {
      shortcut: 'bool',
      truthy: [ true, false ],
      falsy:  [ new Boolean(true), {}, null ],
      plural: {
        truthy: [ [ true, false ] ],
        falsy:  [ [ null, true ] ]
      }
    },
    'string': {
      shortcut: 'str',
      truthy: [ 'str' ],
      falsy:  [ new String('str'), {}, null ],
      plural: {
        truthy: [ [ 'a', 'b' ] ],
        falsy:  [ [ null, 'b' ] ]
      }
    },
    'number': {
      shortcut: 'num',
      truthy: [ 0, 5, -5, 1.5 ],
      falsy:  [ new Number(5), NaN, null ],
      plural: {
        truthy: [ [ 0, 5, -5, 1.5 ] ],
        falsy:  [ [ 0, null, 1, 1.5 ] ]
      }
    },
    'nan': {
      truthy: [ NaN ],
      falsy:  [ 5, null, undefined ],
      plural: {
        truthy: [ [ NaN, NaN, NaN ] ],
        falsy:  [ [ null, NaN, NaN ] ]
      }
    }
  },
  'js objects': {
    'object': {
      shortcut: 'obj',
      truthy: [ {}, [], /re/, null ],
      falsy:  [ function(){}, undefined ],
      plural: {
        truthy: [ [ {}, [], /re/, null ] ],
        falsy:  [ [ {}, function(){}, undefined ] ]
      }
    },
    'function': {
      shortcut: 'fn|func',
      truthy: [ function(){} ],
      falsy:  [ null, {}, undefined ],
      plural: {
        truthy: [ [ function(){}, function(){} ] ],
        falsy:  [ [ function(){}, function(){}, null ] ]
      }
    },
    'array': {
      shortcut: 'arr',
      truthy: [ null, [] ],
      falsy:  [ {}, function(){} ],
      plural: {
        truthy: [ [ null, [], [] ] ],
        falsy:  [ [ [], {}, [] ] ]
      }
    },
    'regexp': {
      shortcut: 're|regex',
      truthy: [ null, /re/ ],
      falsy:  [ {}, [], undefined ],
      plural: {
        truthy: [ [ null, /re/ ] ],
        falsy:  [ [ /re/, {} ] ]
      }
    },
    'date': {
      truthy: [ null, new Date() ],
      falsy:  [ {}, [], undefined ],
      plural: {
        truthy: [ [ null, new Date() ] ],
        falsy:  [ [ new Date(), {} ] ]
      }
    },
    'error': {
      shortcut: 'err',
      truthy: [ null, new Error(), new TypeError ],
      falsy:  [ {}, [], /re/ ],
      plural: {
        truthy: [ [ null, new Error(), new TypeError ] ],
        falsy:  [ [ /re/, new Error(), new TypeError ] ]
      }
    },
    'args': {
      shortcut: 'arguments',
      truthy: [ null, (function(){ return arguments; })() ],
      falsy:  [ {}, [], function(){} ],
      plural: {
        truthy: [ [ null, (function(){ return arguments; })() ] ],
        falsy:  [ [ null, [] ] ]
      }
    }
  },
  'dom objects': {
    'document': {
      shortcut: 'doc',
      truthy: [ null, { nodeType: 9 } ],
      falsy:  [ {}, [], { nodeType: 3 }, undefined ],
      plural: {
        truthy: [ [ null, { nodeType: 9 } ] ],
        falsy:  [ [ null, { nodeType: 7 } ] ]
      }
    },
    'element': {
      shortcut: 'elem',
      truthy: [ null, { nodeType: 1 } ],
      falsy:  [ {}, [], { nodeType: 3 }, undefined ],
      plural: {
        truthy: [ [ null, { nodeType: 1 } ] ],
        falsy:  [ [ null, { nodeType: 7 } ] ]
      }
    }
  }
};

describe('vitals.is (section:base)', function() {

  each(TESTS, function(section, title) {
    describe(title, function() {
      each(section, function(test, type) {
        each(test.truthy, function(val) {
          title = callStr(type, val);
          it(title, function() {
            var result = vitals.is(type, val);
            assert( result === true );
          });
        });
        each(test.falsy, function(val) {
          title = callStr(type, val);
          it(title, function() {
            var result = vitals.is(type, val);
            assert( result === false );
          });
        });
        each(test.plural.truthy, function(vals) {
          vals = fuse.val.top(vals, type);
          title = callStr.apply(null, vals);
          it(title, function() {
            var result = vitals.is.apply(null, vals);
            assert( result === true );
          });
        });
        each(test.plural.falsy, function(vals) {
          vals = fuse.val.top(vals, type);
          title = callStr.apply(null, vals);
          it(title, function() {
            var result = vitals.is.apply(null, vals);
            assert( result === false );
          });
        });
        var types = test.shortcut && test.shortcut.split('|');
        each(types || [], function(type) {
          each(test.truthy, function(val) {
            title = callStr(type, val);
            it(title, function() {
              var result = vitals.is(type, val);
              assert( result === true );
            });
          });
          each(test.falsy, function(val) {
            title = callStr(type, val);
            it(title, function() {
              var result = vitals.is(type, val);
              assert( result === false );
            });
          });
        });
      });
    });
  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is();
      });
    });

    title = callStr('str');
    it(title, function() {
      assert.throws(function() {
        vitals.is('str');
      });
    });

    title = callStr('fail', 'a');
    it(title, function() {
      assert.throws(function() {
        vitals.is('fail', 'a');
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
  return breakStr(shouldMsg, 3);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('is', arguments, 4);
}
