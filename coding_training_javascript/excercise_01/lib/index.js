'use strict';

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function printOut(answer) {
    var str = bondingString(answer);
    console.log(str);
}

function bondingString(answer) {
    var answers = ['Hello, ' + answer + ', nice to meet you!', 'Hello, ' + answer + ', how are you?', 'Hello, ' + answer + ', how have you been?'];
    var randNum = Math.floor(Math.random() * answers.length + 1);
    return answers[randNum];
}

(0, _question2.default)(_config2.default.QUESTION).then(bondingString).then(process.exit);