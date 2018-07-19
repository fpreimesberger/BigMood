# im-metadata

[![Build status](https://img.shields.io/wercker/ci/553800f28e2ab2fb70000fca.svg "Build status")](https://app.wercker.com/project/bykey/ca25b059ebbbae54699ca3a3e65bda24)
[![NPM downloads](https://img.shields.io/npm/dm/im-metadata.svg "NPM downloads")](https://www.npmjs.com/package/im-metadata)
[![NPM version](https://img.shields.io/npm/v/im-metadata.svg "NPM version")](https://www.npmjs.com/package/im-metadata)
[![Node version](https://img.shields.io/node/v/im-metadata.svg "Node version")](https://www.npmjs.com/package/im-metadata)
[![Dependency status](https://img.shields.io/david/turistforeningen/node-im-metadata.svg "Dependency status")](https://david-dm.org/turistforeningen/node-im-metadata)

Retrieve image metadata as a JSON object using ImageMagick's `identify` command.

## Requiremets

* Node.JS v0.10 or newer
* ImageMagick v6.8 or newer

## Install

```
npm install im-metadata --save
```

## API

```js
var metadata = require('im-metadata');
```

### metadata(**string** `src`, **object** `opts`, **function** `callback`)

Return metadata **object** for a given `src` image.

* **string** `src` - path to the image on disk
* **object** `opts` - metadata parsing options
  * **boolean** `exif` - return exif data or not (default `false`)
  * **boolean** `autoOrient` - auto-orient height/width (default `false`)
  * **integer** `timeout` - command timeout length (default `5000`)
* **function** `callback` - callback function (**Error** `error`, **object** `data`)
  * **Error** `error` - error output if command failed
  * **object** `data` - parsed metadata object

#### Return

Returns an `object` with parsed metada:

* **string** `path` - original image path
* **string** `name` - original image name
* **string** `size` - image file size in bytes (ex. `4504682`)
* **string** `format` - image format (`JPEG`, `PNG`, `TIFF` etc.)
* **string** `colorspace` - image colorspace (`RGB`, `CMYK` etc.)
* **integer** `height` - image pixel height
* **integer** `width` - image pixel width
* **string** `orientation` - image orientation

#### Example

```js
metadata('/path/to/image.jpg', {exif: true}, function(error, metadata) {
  if (error) { console.error(error); }
  console.log(metadata);
  console.log(metadata.exif);
});
```

## [MIT License](https://github.com/Turistforeningen/node-im-metadata/blob/master/LICENSE)
