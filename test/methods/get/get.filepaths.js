/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.filepaths
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.get docs](https://github.com/imaginate/vitals/wiki/vitals.get)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

var BASE = DUMMY.base.replace(/\/$/, ''); // base directory for dummy files
var addBase = DUMMY.addBase;

method('get.filepaths', function() {
  this.slow(25);

  suite('shallow tests', function() {

    before('setup dummy dirs and files', function() {
      var files = [
        '_file.js', 'file1.js', 'file2.js',
        '_.min.js', '1.min.js', '2.min.js',
        '_file.md', 'file1.md', 'file2.md',
        '_AZ.json', 'AZ1.json', 'AZ2.json'
      ];
      mkDummy({
        'root':   files,
        'subdir': files
      });
    });

    after('clean up dummy dirs and files', rmDummy);

    should('return all of the files', function() {

      test(BASE, function() {
        var files = vitals.get.filepaths(BASE);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });
    });

    should('return all of the files with the base dirpath', function() {

      test(BASE, { base: true }, function() {
        var opts = { base: true };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, addBase('_file.js')) );
        assert( hasVal(files, addBase('file1.js')) );
        assert( hasVal(files, addBase('file2.js')) );
        assert( hasVal(files, addBase('_.min.js')) );
        assert( hasVal(files, addBase('1.min.js')) );
        assert( hasVal(files, addBase('2.min.js')) );
        assert( hasVal(files, addBase('_file.md')) );
        assert( hasVal(files, addBase('file1.md')) );
        assert( hasVal(files, addBase('file2.md')) );
        assert( hasVal(files, addBase('_AZ.json')) );
        assert( hasVal(files, addBase('AZ1.json')) );
        assert( hasVal(files, addBase('AZ2.json')) );
      });
    });

    should('only return the files with valid exts', function() {

      test(BASE, { validExts: 'js' }, function() {
        var opts = { validExts: 'js' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
      });

      test(BASE, { validExts: '.md|.min.js' }, function() {
        var opts = { validExts: '.md|.min.js' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
      });

      test(BASE, { validExts: [ 'md', '.js*' ] }, function() {
        var opts = { validExts: [ 'md', '.js*' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { validExts: /\.js$/ }, function() {
        var opts = { validExts: /\.js$/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
      });
    });

    should('not return the files with invalid exts', function() {

      test(BASE, { invalidExts: 'js' }, function() {
        var opts = { invalidExts: 'js' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { invalidExts: '.md|.min.js' }, function() {
        var opts = { invalidExts: '.md|.min.js' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { invalidExts: [ 'md', '.js*' ] }, function() {
        var opts = { invalidExts: [ 'md', '.js*' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 0 );
      });

      test(BASE, { invalidExts: /\.js$/ }, function() {
        var opts = { invalidExts: /\.js$/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });
    });

    should('only return the files with valid names', function() {

      test(BASE, { validNames: 'file1' }, function() {
        var opts = { validNames: 'file1' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 2 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file1.md') );
      });

      test(BASE, { validNames: '*1' }, function() {
        var opts = { validNames: '*1' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'AZ1.json') );
      });

      test(BASE, { validNames: [ '_*', 'az*' ] }, function() {
        var opts = { validNames: [ '_*', 'az*' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { validNames: /file/ }, function() {
        var opts = { validNames: /file/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
      });
    });

    should('not return the files with invalid names', function() {

      test(BASE, { invalidNames: 'az*' }, function() {
        var opts = { invalidNames: 'az*' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 10 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, '_AZ.json') );
      });

      test(BASE, { invalidNames: '*1|*2' }, function() {
        var opts = { invalidNames: '*1|*2' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, '_AZ.json') );
      });

      test(BASE, { invalidNames: [ 'file1', 'file2' ] }, function() {
        var opts = { invalidNames: [ 'file1', 'file2' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 8 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { invalidNames: /^[a-z]/ }, function() {
        var opts = { invalidNames: /^[a-z]/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 8 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });
    });

    should('only return the valid files', function() {

      test(BASE, { validFiles: 'file' }, function() {
        var opts = { validFiles: 'file' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 0 );
      });

      test(BASE, { validFiles: 'file*' }, function() {
        var opts = { validFiles: 'file*' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
      });

      test(BASE, { validFiles: [ 'file1.js', 'az1.json' ] }, function() {
        var opts = { validFiles: [ 'file1.js', 'az1.json' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 2 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'AZ1.json') );
      });

      test(BASE, { validFiles: /[0-9]\.js.*$/ }, function() {
        var opts = { validFiles: /[0-9]\.js.*$/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });
    });

    should('not return the invalid files', function() {

      test(BASE, { invalidFiles: '_*.js*' }, function() {
        var opts = { invalidFiles: '_*.js*' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 9 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '1.min.js') );
        assert( hasVal(files, '2.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { invalidFiles: 'file1.*|1*|2*' }, function() {
        var opts = { invalidFiles: 'file1.*|1*|2*' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 8 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, '_AZ.json') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { invalidFiles: [ '_*', '*.js' ] }, function() {
        var opts = { invalidFiles: [ '_*', '*.js' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, 'file1.md') );
        assert( hasVal(files, 'file2.md') );
        assert( hasVal(files, 'AZ1.json') );
        assert( hasVal(files, 'AZ2.json') );
      });

      test(BASE, { invalidFiles: /[0-9]/ }, function() {
        var opts = { invalidFiles: /[0-9]/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, '_file.js') );
        assert( hasVal(files, '_.min.js') );
        assert( hasVal(files, '_file.md') );
        assert( hasVal(files, '_AZ.json') );
      });
    });
  });

  suite('deep tests', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js' ];
      mkDummy({
        'root':    files,
        'subdir1': files,
        'subdir2': files,
        'subdir': {
          'root':    files,
          'subdir1': files,
          'subdir2': files
        }
      });
    });

    after('clean up dummy dirs and files', rmDummy);

    should('return all of the files', function() {

      test(BASE, true, function() {
        var files = vitals.get.filepaths(BASE, true);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir/file1.js') );
        assert( hasVal(files, 'subdir/file2.js') );
        assert( hasVal(files, 'subdir1/file1.js') );
        assert( hasVal(files, 'subdir1/file2.js') );
        assert( hasVal(files, 'subdir2/file1.js') );
        assert( hasVal(files, 'subdir2/file2.js') );
        assert( hasVal(files, 'subdir/subdir1/file1.js') );
        assert( hasVal(files, 'subdir/subdir1/file2.js') );
        assert( hasVal(files, 'subdir/subdir2/file1.js') );
        assert( hasVal(files, 'subdir/subdir2/file2.js') );
      });

      test(BASE, { deep: true }, function() {
        var opts = { deep: true };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir/file1.js') );
        assert( hasVal(files, 'subdir/file2.js') );
        assert( hasVal(files, 'subdir1/file1.js') );
        assert( hasVal(files, 'subdir1/file2.js') );
        assert( hasVal(files, 'subdir2/file1.js') );
        assert( hasVal(files, 'subdir2/file2.js') );
        assert( hasVal(files, 'subdir/subdir1/file1.js') );
        assert( hasVal(files, 'subdir/subdir1/file2.js') );
        assert( hasVal(files, 'subdir/subdir2/file1.js') );
        assert( hasVal(files, 'subdir/subdir2/file2.js') );
      });

      test(BASE, { recursive: true }, function() {
        var opts = { recursive: true };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir/file1.js') );
        assert( hasVal(files, 'subdir/file2.js') );
        assert( hasVal(files, 'subdir1/file1.js') );
        assert( hasVal(files, 'subdir1/file2.js') );
        assert( hasVal(files, 'subdir2/file1.js') );
        assert( hasVal(files, 'subdir2/file2.js') );
        assert( hasVal(files, 'subdir/subdir1/file1.js') );
        assert( hasVal(files, 'subdir/subdir1/file2.js') );
        assert( hasVal(files, 'subdir/subdir2/file1.js') );
        assert( hasVal(files, 'subdir/subdir2/file2.js') );
      });
    });

    should('return all of the files with the base dirpath', function() {

      test(BASE, { deep: true, basepath: true }, function() {
        var opts = { deep: true, basepath: true };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, addBase('file1.js')) );
        assert( hasVal(files, addBase('file2.js')) );
        assert( hasVal(files, addBase('subdir/file1.js')) );
        assert( hasVal(files, addBase('subdir/file2.js')) );
        assert( hasVal(files, addBase('subdir1/file1.js')) );
        assert( hasVal(files, addBase('subdir1/file2.js')) );
        assert( hasVal(files, addBase('subdir2/file1.js')) );
        assert( hasVal(files, addBase('subdir2/file2.js')) );
        assert( hasVal(files, addBase('subdir/subdir1/file1.js')) );
        assert( hasVal(files, addBase('subdir/subdir1/file2.js')) );
        assert( hasVal(files, addBase('subdir/subdir2/file1.js')) );
        assert( hasVal(files, addBase('subdir/subdir2/file2.js')) );
      });
    });

    should('only return the files from valid dirs', function() {

      test(BASE, { deep: true, validDirs: 'subdir' }, function() {
        var opts = { deep: true, validDirs: 'subdir' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir/file1.js') );
        assert( hasVal(files, 'subdir/file2.js') );
      });

      test(BASE, { deep: true, validDirs: 'subdir*' }, function() {
        var opts = { deep: true, validDirs: 'subdir*' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir/file1.js') );
        assert( hasVal(files, 'subdir/file2.js') );
        assert( hasVal(files, 'subdir1/file1.js') );
        assert( hasVal(files, 'subdir1/file2.js') );
        assert( hasVal(files, 'subdir2/file1.js') );
        assert( hasVal(files, 'subdir2/file2.js') );
        assert( hasVal(files, 'subdir/subdir1/file1.js') );
        assert( hasVal(files, 'subdir/subdir1/file2.js') );
        assert( hasVal(files, 'subdir/subdir2/file1.js') );
        assert( hasVal(files, 'subdir/subdir2/file2.js') );
      });

      test(BASE, { deep: true, validDirs: [ 'subdir1', 'subdir2' ] }, function() {
        var opts = { deep: true, validDirs: [ 'subdir1', 'subdir2' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir1/file1.js') );
        assert( hasVal(files, 'subdir1/file2.js') );
        assert( hasVal(files, 'subdir2/file1.js') );
        assert( hasVal(files, 'subdir2/file2.js') );
      });

      test(BASE, { deep: true, validDirs: /^subdir[0-9]$/ }, function() {
        var opts = { deep: true, validDirs: /^subdir[0-9]$/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir1/file1.js') );
        assert( hasVal(files, 'subdir1/file2.js') );
        assert( hasVal(files, 'subdir2/file1.js') );
        assert( hasVal(files, 'subdir2/file2.js') );
      });
    });

    should('not return the files from invalid dirs', function() {

      test(BASE, { deep: true, invalidDirs: 'subdir' }, function() {
        var opts = { deep: true, invalidDirs: 'subdir' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir1/file1.js') );
        assert( hasVal(files, 'subdir1/file2.js') );
        assert( hasVal(files, 'subdir2/file1.js') );
        assert( hasVal(files, 'subdir2/file2.js') );
      });

      test(BASE, { deep: true, invalidDirs: 'subdir*' }, function() {
        var opts = { deep: true, invalidDirs: 'subdir*' };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 2 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
      });

      test(BASE, { deep: true, invalidDirs: [ 'subdir1','subdir2' ] }, function() {
        var opts = { deep: true, invalidDirs: [ 'subdir1', 'subdir2' ] };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir/file1.js') );
        assert( hasVal(files, 'subdir/file2.js') );
      });

      test(BASE, { deep: true, invalidDirs: /^subdir[0-9]$/ }, function() {
        var opts = { deep: true, invalidDirs: /^subdir[0-9]$/ };
        var files = vitals.get.filepaths(BASE, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( hasVal(files, 'file1.js') );
        assert( hasVal(files, 'file2.js') );
        assert( hasVal(files, 'subdir/file1.js') );
        assert( hasVal(files, 'subdir/file2.js') );
      });
    });
  });

  suite('error tests', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({ 'root': files, 'subdir': null });
    });

    after('clean up dummy dirs and files', rmDummy);

    should('throw an error', function() {

      test(function() {
        assert.throws(function() {
          vitals.get.filepaths();
        }, validTypeErr);
      });

      test('invalid', function() {
        assert.throws(function() {
          var base = addBase('invalid');
          vitals.get.filepaths(base);
        }, validTypeErr);
      });

      test(BASE, 'fail', function() {
        assert.throws(function() {
          vitals.get.filepaths(BASE, 'fail');
        }, validTypeErr);
      });

      test(BASE, { validExts: false }, function() {
        assert.throws(function() {
          var opts = { validExts: false };
          vitals.get.filepaths(BASE, opts);
        }, validTypeErr);
      });
    });
  });
});
