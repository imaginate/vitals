/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - EACH
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.each]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/each.js}
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

'use strict';

module.exports = each;

var is = require('node-are').is;
var has = require('./has.js');
var clone = require('./clone.js');


/**
 * A shortcut for iterating over object maps and arrays or for invoking an
 *   action a set number of times. If iterating over an object note that this
 *   method lazily clones the object based on the iteratee's
 *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
 *   (i.e. if you alter the source object within the iteratee ensure to define
 *   the iteratee's third param to avoid accidental results).
 * @public
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=, (Object|function|Array)=)} iteratee
 * @param {Object=} thisArg
 * @return {(Object|function|Array)} 
 */
function each(val, iteratee, thisArg) {

  /** @type {(string|number)} */
  var prop;
  /** @type {number} */
  var len;

  if ( !is.func(iteratee) ) {
    throw new TypeError('Invalid iteratee param in vitals.each call.');
  }

  len = iteratee.length;
  iteratee = arguments.length > 2 ? function iteratee() {
    iteratee.apply(thisArg, arguments);
  } : iteratee;

  if ( is._obj(val) ) {

    // iterate over an array or arguments obj
    if ( is._arr(val) ) {
      val = len > 2 ? clone.arr(val) : val;
      len = val.length;
      prop = -1;
      while (++prop < len) {
        iteratee(val[prop], prop, val);
      }
    }

    // iterate over an object's own props
    else {
      val = len > 2 ? clone(val) : val;
      for (prop in val) {
        if ( has(val, prop) ) {
          iteratee(val[prop], prop, val);
        }
      }
    }
    return val;
  }

  // iterate specified number of times
  else if ( is.num(val) ) {
    while(val--) {
      iteratee();
    }
    return null;
  }

  throw new TypeError('Invalid val param in vitals.each call.');
}
