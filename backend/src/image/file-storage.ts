// import fs from 'fs';
// import stream from 'stream';
// import crypto from 'crypto';
//
// function getDestination (req, file, cb) {
//   cb(null, '/dev/null')
// }
//
// function MongoStorage (opts) {
//   this.getDestination = (opts.destination || getDestination)
// }
//
// MongoStorage.prototype._handleFile = function _handleFile (req, file: Express.Multer.File, cb) {
//   this.getDestination(req, file, function (err, path) {
//     if (err) return cb(err)
//
//     const outStream = fs.createWriteStream(path);
//
//     file.stream.pipe(outStream)
//
//     let hash
//     stream.promises.pipeline(file.stream,
//       crypto.createHash('sha256').setEncoding('hex'),
//       async function (source) {
//         hash = (await source.toArray())[0];
//       })
//
//     outStream.on('error', cb)
//     outStream.on('finish', function () {
//       cb(null, {
//         path: path,
//         size: outStream.bytesWritten
//       })
//     })
//   })
// }
//
// MongoStorage.prototype._removeFile = function _removeFile (req, file, cb) {
//   fs.unlink(file.path, cb)
// }
//
// module.exports = function (opts) {
//   return new MongoStorage(opts)
// }

import * as multer from 'multer';
import { extname } from 'path';

export var storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
})