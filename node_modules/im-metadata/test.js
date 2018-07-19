/*jshint laxbreak:true */

var assert = require('assert');
var metadata = require('./index');

describe('metadata.cmd()', function() {
  it('returns command without exif data', function() {
    var cmd = 'identify -format "name=\nsize=%[size]\nformat=%m\n'
            + 'colorspace=%[colorspace]\nheight=%[height]\nwidth=%[width]\n'
            + 'orientation=%[orientation]\n" /foo/bar/baz';

    assert.equal(metadata.cmd('/foo/bar/baz'), cmd);
  });

  it('returns command with exif data', function() {
    var cmd = 'identify -format "name=\nsize=%[size]\nformat=%m\n'
            + 'colorspace=%[colorspace]\nheight=%[height]\nwidth=%[width]\n'
            + 'orientation=%[orientation]\n%[exif:*]" /foo/bar/baz';

    assert.equal(metadata.cmd('/foo/bar/baz', {exif: true}), cmd);
  });
});

describe('metadata.parse()', function() {
  var path = '/foo/bar/baz.jpg';

  it('returns object for single value', function() {
    assert.deepEqual(metadata.parse(path, 'foo=bar'), {
      path: path,
      foo: 'bar'
    });
  });

  it('returns object for metadata string', function() {
    assert.deepEqual(metadata.parse(path, 'foo=bar\nbar=foo'), {
      path: path,
      foo: 'bar',
      bar: 'foo'
    });
  });

  it('skips empty lines', function() {
    assert.deepEqual(metadata.parse(path, 'foo=bar\n\nbar=foo\n\n'), {
      path: path,
      foo: 'bar',
      bar: 'foo'
    });
  });

  it('returns correct size for bogus value', function() {
    assert.deepEqual(metadata.parse(path, 'size=4.296MBB'), {
      path: path,
      size: 4504682
    });
  });

  it('returns size in bytes', function() {
    assert.deepEqual(metadata.parse(path, 'size=20MB'), {
      path: path,
      size: 20 * 1024 * 1024
    });
  });

  it('returns RGB for sRGB colorspace', function() {
    assert.deepEqual(metadata.parse(path, 'colorspace=sRGB'), {
      path: path,
      colorspace: 'RGB'
    });
  });

  it('returns "" for Undefined orientation', function() {
    assert.deepEqual(metadata.parse(path, 'orientation=Undefined'), {
      path: path,
      orientation: ''
    });
  });

  it('returns height and widt for auto-orient', function() {
    var meta = 'width=100\nheight=150\norientation=';
    var opts = {autoOrient: true};

    var orientation = [
      'TopLeft', 'TopRight', 'BottomRight', 'BottomLeft',
      'LeftTop', 'RightTop', 'RightBottom', 'LeftBottom'
    ];

    for (var i = 0; i < 4; i++) {
      assert.deepEqual(metadata.parse(path, meta + orientation[i], opts), {
        height: 150,
        width: 100,
        path: path,
        orientation: orientation[i]
      });
    }

    for (var j = 4; j < 8; j++) {
      assert.deepEqual(metadata.parse(path, meta + orientation[j], opts), {
        height: 100,
        width: 150,
        path: path,
        orientation: orientation[j]
      });
    }
  });
});

describe('metadata()', function() {
  it('returns metadata for image', function(done) {
    metadata('./assets/image.jpg', { exif: false }, function(err, data) {
      assert.ifError(err);

      assert.equal(data.path, './assets/image.jpg');
      assert.equal(data.name, '');
      assert.equal(data.size, 4504682);
      assert.equal(data.format, 'JPEG');
      assert.equal(data.colorspace, 'RGB');
      assert.equal(data.height, 3456);
      assert.equal(data.width, 5184);
      assert.equal(data.orientation, 'TopLeft');

      assert.equal(typeof data.exif, 'undefined');

      done();
    });
  });

  it('returns metadata for image with exif data', function(done) {
    metadata('./assets/image.jpg', { exif: true }, function(err, data) {
      assert.ifError(err);

      assert.equal(data.path, './assets/image.jpg');
      assert.equal(data.name, '');
      assert.equal(data.size, 4504682);
      assert.equal(data.format, 'JPEG');
      assert.equal(data.colorspace, 'RGB');
      assert.equal(data.height, 3456);
      assert.equal(data.width, 5184);
      assert.equal(data.orientation, 'TopLeft');

      assert.equal(typeof data.exif, 'object');
      assert.equal(Object.keys(data.exif).length, 36);
      assert.equal(data.exif.ApertureValue, '37/8');

      done();
    });
  });

  it('returns correct height and width for auto-orient', function(done) {
    metadata('./assets/orient.jpg', { autoOrient: true }, function(err, data) {
      assert.ifError(err);

      assert.equal(data.height, 3264);
      assert.equal(data.width, 2448);

      done();
    });
  });
});
