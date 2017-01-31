/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.dirpaths
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.get docs](https://github.com/imaginate/vitals/wiki/vitals.get)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

var BASE = DUMMY.base.replace(/\/$/, ''); // BASE directory for dummy files
var addBase = DUMMY.addBase;

method('get.dirpaths', function() {
  this.slow(25);

  before('setup dummy dirs and files', function() {
    var files = [ 'file1.js', 'file2.js', 'file3.js' ];
    mkDummy({
      'root':    files,
      'subdir1': files,
      'subdir2': files,
      'subdir3': files,
      'subdir': {
        'root':    files,
        'subdir1': files,
        'subdir2': files,
        'subdir3': files
      }
    });
  });

  after('clean up dummy dirs and files', rmDummy);

  should('shallowly return all of the dirs', function() {

    test(BASE, function() {
      var dirs = vitals.get.dirpaths(BASE);
      assert( is.arr(dirs) );
      assert( dirs.length === 4 );
      assert( hasVal(dirs, 'subdir') );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
      assert( hasVal(dirs, 'subdir3') );
    });
  });

  should('deeply return all of the dirs', function() {

    test(BASE, true, function() {
      var dirs = vitals.get.dirpaths(BASE, true);
      assert( is.arr(dirs) );
      assert( dirs.length === 7 );
      assert( hasVal(dirs, 'subdir') );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
      assert( hasVal(dirs, 'subdir3') );
      assert( hasVal(dirs, 'subdir/subdir1') );
      assert( hasVal(dirs, 'subdir/subdir2') );
      assert( hasVal(dirs, 'subdir/subdir3') );
    });

    test(BASE, { deep: true }, function() {
      var opts = { deep: true };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 7 );
      assert( hasVal(dirs, 'subdir') );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
      assert( hasVal(dirs, 'subdir3') );
      assert( hasVal(dirs, 'subdir/subdir1') );
      assert( hasVal(dirs, 'subdir/subdir2') );
      assert( hasVal(dirs, 'subdir/subdir3') );
    });

    test(BASE, { recursive: true }, function() {
      var opts = { recursive: true };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 7 );
      assert( hasVal(dirs, 'subdir') );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
      assert( hasVal(dirs, 'subdir3') );
      assert( hasVal(dirs, 'subdir/subdir1') );
      assert( hasVal(dirs, 'subdir/subdir2') );
      assert( hasVal(dirs, 'subdir/subdir3') );
    });
  });

  should('return all of the dirs with the base dirpath', function() {

    test(BASE, { base: true }, function() {
      var opts = { base: true };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 4 );
      assert( hasVal(dirs, addBase('subdir')) );
      assert( hasVal(dirs, addBase('subdir1')) );
      assert( hasVal(dirs, addBase('subdir2')) );
      assert( hasVal(dirs, addBase('subdir3')) );
    });

    test(BASE, { deep: true, basepath: true }, function() {
      var opts = { deep: true, basepath: true };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 7 );
      assert( hasVal(dirs, addBase('subdir')) );
      assert( hasVal(dirs, addBase('subdir1')) );
      assert( hasVal(dirs, addBase('subdir2')) );
      assert( hasVal(dirs, addBase('subdir3')) );
      assert( hasVal(dirs, addBase('subdir/subdir1')) );
      assert( hasVal(dirs, addBase('subdir/subdir2')) );
      assert( hasVal(dirs, addBase('subdir/subdir3')) );
    });
  });

  should('only return the valid dirs', function() {

    test(BASE, { validDirs: 'subdir' }, function() {
      var opts = { validDirs: 'subdir' };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 1 );
      assert( hasVal(dirs, 'subdir') );
    });

    test(BASE, { validDirs: 'subdir*' }, function() {
      var opts = { validDirs: 'subdir*' };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 4 );
      assert( hasVal(dirs, 'subdir') );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
      assert( hasVal(dirs, 'subdir3') );
    });

    test(BASE, { validDirs: [ 'subdir1', 'subdir2' ] }, function() {
      var opts = { validDirs: [ 'subdir1', 'subdir2' ] };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 2 );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
    });

    test(BASE, { validDirs: /^subdir[0-9]$/ }, function() {
      var opts = { validDirs: /^subdir[0-9]$/ };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 3 );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
      assert( hasVal(dirs, 'subdir3') );
    });
  });

  should('not return the invalid dirs', function() {

    test(BASE, { invalidDirs: 'subdir' }, function() {
      var opts = { invalidDirs: 'subdir' };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 3 );
      assert( hasVal(dirs, 'subdir1') );
      assert( hasVal(dirs, 'subdir2') );
      assert( hasVal(dirs, 'subdir3') );
    });

    test(BASE, { invalidDirs: 'subdir*' }, function() {
      var opts = { invalidDirs: 'subdir*' };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 0 );
    });

    test(BASE, { invalidDirs: [ 'subdir1', 'subdir2' ] }, function() {
      var opts = { invalidDirs: [ 'subdir1', 'subdir2' ] };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 2 );
      assert( hasVal(dirs, 'subdir') );
      assert( hasVal(dirs, 'subdir3') );
    });

    test(BASE, { invalidDirs: /^subdir[0-9]$/ }, function() {
      var opts = { invalidDirs: /^subdir[0-9]$/ };
      var dirs = vitals.get.dirpaths(BASE, opts);
      assert( is.arr(dirs) );
      assert( dirs.length === 1 );
      assert( hasVal(dirs, 'subdir') );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get.dirpaths();
      }, validTypeErr);
    });

    test('invalid', function() {
      assert.throws(function() {
        var base = addBase('invalid');
        vitals.get.dirpaths(base);
      }, validTypeErr);
    });

    test(BASE, 'fail', function() {
      assert.throws(function() {
        vitals.get.dirpaths(BASE, 'fail');
      }, validTypeErr);
    });

    test(BASE, { validDirs: false }, function() {
      assert.throws(function() {
        var opts = { validDirs: false };
        vitals.get.dirpaths(BASE, opts);
      }, validTypeErr);
    });
  });
});
