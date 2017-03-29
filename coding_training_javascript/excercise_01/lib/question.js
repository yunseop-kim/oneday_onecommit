'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function question(question) {
  console.log(question);
  return new Promise(function (resolve) {
    process.stdin.once('data', function (data) {
      resolve(data.toString().trim());
    });
  });
}

exports.default = question;