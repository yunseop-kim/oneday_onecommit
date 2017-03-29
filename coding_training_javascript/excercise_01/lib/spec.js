'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('check a question and answer', function () {
    (0, _index2.default)(_config2.default.QUESTION);
});