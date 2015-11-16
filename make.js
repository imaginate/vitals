/**
 * -----------------------------------------------------------------------------
 * MAKEFILE
 * -----------------------------------------------------------------------------
 * @file Use `$ node make <task>[-method][=val] ...` to execute make tasks.
 *   Tasks are executed in the order given. Tasks may be repeated. You may view
 *   each task's source code in the "tasks" directory as "taskname.js".
 *
 * @see [makefile docs](https://github.com/imaginate/vitals/blob/master/_tasks/README.md)
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

require('./_tasks/_helpers/setup')('all'); // appends global helpers for tasks


////////////////////////////////////////////////////////////////////////////////
// MAKEFILE CONFIG
////////////////////////////////////////////////////////////////////////////////

/** @type {string} */
var taskDir = './_tasks';


////////////////////////////////////////////////////////////////////////////////
// PARSE THE COMMAND ARGS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, string>} */
var shortcuts;
/** @type {!Array<string>} */
var tasks;

shortcuts = {
  dev: 'compile minify'
};

tasks = process.argv;
tasks = tasks.length > 2 ? slice(tasks, 2) : shortcuts.dev.split(' ');
tasks = remap(tasks, task => {
  task = task.replace(/^--/, '');
  return has(shortcuts, task) ? shortcuts[task] : task;
});


////////////////////////////////////////////////////////////////////////////////
// PREP THE TASK DIRECTORY
////////////////////////////////////////////////////////////////////////////////

taskDir = taskDir ? taskDir.replace(/([^\/])$/, '$1/') : './_tasks/';

is.dir(taskDir) || log.error(
  'Invalid `makefile` Config',
  'the tasks directory does not exist',
  { argMap: true, taskDir: taskDir }
);


////////////////////////////////////////////////////////////////////////////////
// RUN THE TASKS
////////////////////////////////////////////////////////////////////////////////

each(tasks, taskStr => {

  /** @type {string} */
  var val;
  /** @type {!Task} */
  var task;
  /** @type {string} */
  var name;
  /** @type {!Array<string>} */
  var methods;
  /** @type {string} */
  var defaultVal;

  name = getName(taskStr);
  methods = taskStr.split('-');
  defaultVal = getVal( methods.shift() );

  if ( !is.file(`${taskDir}${name}.js`) ) {
    log.error('Invalid `make` Command', 'a task\'s file does not exist', {
      argMap: true,
      invalidTask: `${taskDir}${name}.js`
    });
  }

  task = require(taskDir + name);
  task.name = name;

  methods = methods.length ? methods : task.defaultMethods;
  methods = defaultVal ? remap(methods, method => {
    return has(method, '=') ? method : method + defaultVal;
  }) : methods;

  each(methods, method => {
    val = getVal(method);
    val = val && slice(val, 1); // trim "=" from string start
    method = getName(method);
    task.run(method, val);
  });
});


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 */
function getName(str) {
  return str && str.replace(/^([a-z]+)(?:[^a-z].*)?$/i, '$1');
}

/**
 * @param {string} str
 */
function getVal(str) {
  return str && str.replace(/^[a-z]+(\=.*)?$/i, '$1');
}
