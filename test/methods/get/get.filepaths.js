/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - GET.FILEPATHS
 * -----------------------------------------------------------------------------
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/wiki/vitals.get}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

if (BROWSER_TESTS) return;

describe('vitals.get.filepaths (section:fs)', function() {
  var title;

  describe('shallow tests', function() {

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

    title = titleStr('should return all of the files');
    describe(title, function() {

      title = callStr('');
      it(title, function() {
        var base = addBase('');
        var files = vitals.get.filepaths(base);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

    });

    title = titleStr('should return all of the files with the base dirpath');
    describe(title, function() {

      title = callStr('', { base: true });
      it(title, function() {
        var base = addBase('');
        var opts = { base: true };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, addBase('_file.js')) );
        assert( has(files, addBase('file1.js')) );
        assert( has(files, addBase('file2.js')) );
        assert( has(files, addBase('_.min.js')) );
        assert( has(files, addBase('1.min.js')) );
        assert( has(files, addBase('2.min.js')) );
        assert( has(files, addBase('_file.md')) );
        assert( has(files, addBase('file1.md')) );
        assert( has(files, addBase('file2.md')) );
        assert( has(files, addBase('_AZ.json')) );
        assert( has(files, addBase('AZ1.json')) );
        assert( has(files, addBase('AZ2.json')) );
      });

    });

    title = titleStr('should only return the files with valid exts');
    describe(title, function() {

      title = callStr('', { validExts: 'js' });
      it(title, function() {
        var base = addBase('');
        var opts = { validExts: 'js' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
      });

      title = callStr('', { validExts: '.md|.min.js' });
      it(title, function() {
        var base = addBase('');
        var opts = { validExts: '.md|.min.js' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
      });

      title = callStr('', { validExts: [ 'md', '.js*' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { validExts: [ 'md', '.js*' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { validExts: /\.js$/ });
      it(title, function() {
        var base = addBase('');
        var opts = { validExts: /\.js$/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
      });

    });

    title = titleStr('should not return the files with invalid exts');
    describe(title, function() {

      title = callStr('', { invalidExts: 'js' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidExts: 'js' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { invalidExts: '.md|.min.js' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidExts: '.md|.min.js' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { invalidExts: [ 'md', '.js*' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidExts: [ 'md', '.js*' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 0 );
      });

      title = callStr('', { invalidExts: /\.js$/ });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidExts: /\.js$/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

    });

    title = titleStr('should only return the files with valid names');
    describe(title, function() {

      title = callStr('', { validNames: 'file1' });
      it(title, function() {
        var base = addBase('');
        var opts = { validNames: 'file1' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 2 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file1.md') );
      });

      title = callStr('', { validNames: '*1' });
      it(title, function() {
        var base = addBase('');
        var opts = { validNames: '*1' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, 'file1.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'AZ1.json') );
      });

      title = callStr('', { validNames: [ '_*', 'az*' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { validNames: [ '_*', 'az*' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_file.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { validNames: /file/ });
      it(title, function() {
        var base = addBase('');
        var opts = { validNames: /file/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
      });

    });

    title = titleStr('should not return the files with invalid names');
    describe(title, function() {

      title = callStr('', { invalidNames: 'az*' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidNames: 'az*' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 10 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, '_AZ.json') );
      });

      title = callStr('', { invalidNames: '*1|*2' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidNames: '*1|*2' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, '_file.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, '_AZ.json') );
      });

      title = callStr('', { invalidNames: [ 'file1', 'file2' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidNames: [ 'file1', 'file2' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 8 );
        assert( has(files, '_file.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { invalidNames: /^[a-z]/ });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidNames: /^[a-z]/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 8 );
        assert( has(files, '_file.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

    });

    title = titleStr('should only return the valid files');
    describe(title, function() {

      title = callStr('', { validFiles: 'file' });
      it(title, function() {
        var base = addBase('');
        var opts = { validFiles: 'file' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 0 );
      });

      title = callStr('', { validFiles: 'file*' });
      it(title, function() {
        var base = addBase('');
        var opts = { validFiles: 'file*' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
      });

      title = callStr('', { validFiles: [ 'file1.js', 'az1.json' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { validFiles: [ 'file1.js', 'az1.json' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 2 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'AZ1.json') );
      });

      title = callStr('', { validFiles: /[0-9]\.js.*$/ });
      it(title, function() {
        var base = addBase('');
        var opts = { validFiles: /[0-9]\.js.*$/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

    });

    title = titleStr('should not return the invalid files');
    describe(title, function() {

      title = callStr('', { invalidFiles: '_*.js*' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidFiles: '_*.js*' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 9 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '1.min.js') );
        assert( has(files, '2.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { invalidFiles: 'file1.*|1*|2*' });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidFiles: 'file1.*|1*|2*' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 8 );
        assert( has(files, '_file.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, '_AZ.json') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { invalidFiles: [ '_*', '*.js' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidFiles: [ '_*', '*.js' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, 'file1.md') );
        assert( has(files, 'file2.md') );
        assert( has(files, 'AZ1.json') );
        assert( has(files, 'AZ2.json') );
      });

      title = callStr('', { invalidFiles: /[0-9]/ });
      it(title, function() {
        var base = addBase('');
        var opts = { invalidFiles: /[0-9]/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, '_file.js') );
        assert( has(files, '_.min.js') );
        assert( has(files, '_file.md') );
        assert( has(files, '_AZ.json') );
      });

    });

    after('clean up dummy dirs and files', rmDummy);

  });

  describe('deep tests', function() {

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

    title = titleStr('should return all of the files');
    describe(title, function() {

      title = callStr('', true);
      it(title, function() {
        var base = addBase('');
        var files = vitals.get.filepaths(base, true);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir/file1.js') );
        assert( has(files, 'subdir/file2.js') );
        assert( has(files, 'subdir1/file1.js') );
        assert( has(files, 'subdir1/file2.js') );
        assert( has(files, 'subdir2/file1.js') );
        assert( has(files, 'subdir2/file2.js') );
        assert( has(files, 'subdir/subdir1/file1.js') );
        assert( has(files, 'subdir/subdir1/file2.js') );
        assert( has(files, 'subdir/subdir2/file1.js') );
        assert( has(files, 'subdir/subdir2/file2.js') );
      });

      title = callStr('', { deep: true });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir/file1.js') );
        assert( has(files, 'subdir/file2.js') );
        assert( has(files, 'subdir1/file1.js') );
        assert( has(files, 'subdir1/file2.js') );
        assert( has(files, 'subdir2/file1.js') );
        assert( has(files, 'subdir2/file2.js') );
        assert( has(files, 'subdir/subdir1/file1.js') );
        assert( has(files, 'subdir/subdir1/file2.js') );
        assert( has(files, 'subdir/subdir2/file1.js') );
        assert( has(files, 'subdir/subdir2/file2.js') );
      });

      title = callStr('', { recursive: true });
      it(title, function() {
        var base = addBase('');
        var opts = { recursive: true };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir/file1.js') );
        assert( has(files, 'subdir/file2.js') );
        assert( has(files, 'subdir1/file1.js') );
        assert( has(files, 'subdir1/file2.js') );
        assert( has(files, 'subdir2/file1.js') );
        assert( has(files, 'subdir2/file2.js') );
        assert( has(files, 'subdir/subdir1/file1.js') );
        assert( has(files, 'subdir/subdir1/file2.js') );
        assert( has(files, 'subdir/subdir2/file1.js') );
        assert( has(files, 'subdir/subdir2/file2.js') );
      });

    });

    title = titleStr('should return all of the files with the base dirpath');
    describe(title, function() {

      title = callStr('', { deep: true, basepath: true });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, basepath: true };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, addBase('file1.js')) );
        assert( has(files, addBase('file2.js')) );
        assert( has(files, addBase('subdir/file1.js')) );
        assert( has(files, addBase('subdir/file2.js')) );
        assert( has(files, addBase('subdir1/file1.js')) );
        assert( has(files, addBase('subdir1/file2.js')) );
        assert( has(files, addBase('subdir2/file1.js')) );
        assert( has(files, addBase('subdir2/file2.js')) );
        assert( has(files, addBase('subdir/subdir1/file1.js')) );
        assert( has(files, addBase('subdir/subdir1/file2.js')) );
        assert( has(files, addBase('subdir/subdir2/file1.js')) );
        assert( has(files, addBase('subdir/subdir2/file2.js')) );
      });

    });

    title = titleStr('should only return the files from valid dirs');
    describe(title, function() {

      title = callStr('', { deep: true, validDirs: 'subdir' });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, validDirs: 'subdir' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir/file1.js') );
        assert( has(files, 'subdir/file2.js') );
      });

      title = callStr('', { deep: true, validDirs: 'subdir*' });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, validDirs: 'subdir*' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 12 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir/file1.js') );
        assert( has(files, 'subdir/file2.js') );
        assert( has(files, 'subdir1/file1.js') );
        assert( has(files, 'subdir1/file2.js') );
        assert( has(files, 'subdir2/file1.js') );
        assert( has(files, 'subdir2/file2.js') );
        assert( has(files, 'subdir/subdir1/file1.js') );
        assert( has(files, 'subdir/subdir1/file2.js') );
        assert( has(files, 'subdir/subdir2/file1.js') );
        assert( has(files, 'subdir/subdir2/file2.js') );
      });

      title = callStr('', { deep: true, validDirs: [ 'subdir1', 'subdir2' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, validDirs: [ 'subdir1', 'subdir2' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir1/file1.js') );
        assert( has(files, 'subdir1/file2.js') );
        assert( has(files, 'subdir2/file1.js') );
        assert( has(files, 'subdir2/file2.js') );
      });

      title = callStr('', { deep: true, validDirs: /^subdir[0-9]$/ });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, validDirs: /^subdir[0-9]$/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir1/file1.js') );
        assert( has(files, 'subdir1/file2.js') );
        assert( has(files, 'subdir2/file1.js') );
        assert( has(files, 'subdir2/file2.js') );
      });

    });

    title = titleStr('should not return the files from invalid dirs');
    describe(title, function() {

      title = callStr('', { deep: true, invalidDirs: 'subdir' });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, invalidDirs: 'subdir' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 6 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir1/file1.js') );
        assert( has(files, 'subdir1/file2.js') );
        assert( has(files, 'subdir2/file1.js') );
        assert( has(files, 'subdir2/file2.js') );
      });

      title = callStr('', { deep: true, invalidDirs: 'subdir*' });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, invalidDirs: 'subdir*' };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 2 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
      });

      title = callStr('', { deep: true, invalidDirs: [ 'subdir1','subdir2' ] });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, invalidDirs: [ 'subdir1', 'subdir2' ] };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir/file1.js') );
        assert( has(files, 'subdir/file2.js') );
      });

      title = callStr('', { deep: true, invalidDirs: /^subdir[0-9]$/ });
      it(title, function() {
        var base = addBase('');
        var opts = { deep: true, invalidDirs: /^subdir[0-9]$/ };
        var files = vitals.get.filepaths(base, opts);
        assert( is.arr(files) );
        assert( files.length === 4 );
        assert( has(files, 'file1.js') );
        assert( has(files, 'file2.js') );
        assert( has(files, 'subdir/file1.js') );
        assert( has(files, 'subdir/file2.js') );
      });

    });

    after('clean up dummy dirs and files', rmDummy);

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

    before('setup dummy dirs and files', function() {
      var files = [ 'file1.js', 'file2.js', 'file3.js' ];
      mkDummy({ 'root': files, 'subdir': null });
    });

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.get.filepaths();
        });
      });

      title = callStr('invalid');
      it(title, function() {
        assert.throws(function() {
          var base = addBase('invalid');
          vitals.get.filepaths(base);
        });
      });

      title = callStr('', 'fail');
      it(title, function() {
        assert.throws(function() {
          var base = addBase('');
          vitals.get.filepaths(base, 'fail');
        });
      });

      title = callStr('', { validExts: false });
      it(title, function() {
        assert.throws(function() {
          var base = addBase('');
          var opts = { validExts: false };
          vitals.get.filepaths(base, opts);
        });
      });

      after('clean up dummy dirs and files', rmDummy);

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
function callStr(args) {
  args = remap(arguments, function(val, i) {
    return i ? val : addBase(val);
  });
  return testCall('get.filepaths', args, 4);
}

/**
 * @private
 * @param {string=} dir
 * @return {string}
 */
function addBase(dir) {

  /** @type {string} */
  var base;

  base = cut(DUMMY.base, /\/$/);
  return dir ? fuse(base, '/', dir) : base;
}
