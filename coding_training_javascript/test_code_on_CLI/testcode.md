# CLI 환경에서의 테스트 코드 작성
귀하의 Nodejs 단위 테스트에 모의 표준 텍스트를 작성하십시오.
사용자에게 질문하는 단위 테스트 코드가 필요하다고 상상해보십시오. Nodejs에서 어떻게 할 수 있습니까? 사용자에게 질문하고 대답을 읽는 것은 매우 간단합니다.

```javascript
console.log('are you happy?');
process.stdin.once('data', function (data) {
  console.log('user replied', data.toString().trim());
  process.exit();
});
```
```
$ node index.js 
are you happy?
yes
user replied yes
```

이 질문 / 응답 기능을 [inquirer-confirm](https://github.com/bahmutov/inquirer-confirm) 과 유사한 promise 반환 함수로 이동하는 것이 편리합니다 .
```javascript
function ask(question) {
  console.log(question);
  return new Promise(function (resolve) {
    process.stdin.once('data', function (data) {
      resolve(data.toString().trim());
    });
  });
}
ask('are you happy?')
  .then(function (reply) {
    console.log('user replied', reply);
  })
  .then(process.exit);
```

## step 1 : refactor
코드의 단위 테스트가 코드의 나머지 부분과 잘 분리되도록 리팩토링하는 것이 우리가 개선해야 할 첫 번째 단계입니다. 
이 경우 `ask`을 자체 파일로 이동합니다.

```javascript
// ask.js

function ask(question) {
    console.log(question);
    return new Promise(function (resolve) {
        process.stdin.once('data', function (data) {
            resolve(data.toString().trim());
        });
    });
}

module.exports = ask;
```
We use `ask` just like before
```javascript
// index.js
const ask = require('./ask');

ask('are you happy?')
    .then(function (reply) {
        console.log('user replied', reply);
    })
    .then(process.exit);
```

## step 2 - setup unit test #
저는 [promise 지원](https://glebbahmutov.com/blog/picking-javascript-testing-framework/)이 빵빵한 [모카](http://mochajs.org/) 유닛 테스트 프레임워크를 선택했습니다.

```javascript
// ask-spec.js
const ask = require('./ask');
describe('ask', function () {
  it('asks a question', function () {
    return ask('test')
      .then(function () {
        // ?
      });
  });
});
```

```

  ask
test
    1) asks a question


  0 passing (2s)
  1 failing

  1) ask asks a question:
     Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.
```

지금은 `process.stdin` 스트림에 입력을 제공하지 않으므로 테스트 시간이 초과되었다고 나온다.

## step 3 - provide test answer #
우리는 간단하게 process.stdin에 문자열을 입력할 수 있습니다. 
좋은 기법은 실제 process.stdin 스트림을 모의 스트림 객체로 대체하는 것 입니다. 
나는 이것을 허용하는 [mock-stdin](https://www.npmjs.com/package/mock-stdin) 패키지를 사용합니다.

```javascript
// ask-spec.js
var ask = require('./ask');
describe('ask', function () {
  var stdin;
  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });
  it('asks a question', function () {
    process.nextTick(function mockResponse() {
      stdin.send('response');
    });
    return ask('question: test')
      .then(function (response) {
        console.assert(response === 'response');
      });
  });
});
```

 단위 테스트 내부에서 실행 되는 지연된 함수 `mockResponse`에 주목하십시오. 
 지연은 테스트 스텝을 적절히 명령하기 위해 필요합니다.

```
ask the question and wait for response
send 'response' to the mock stdin
read the data from the mock stdin
execute the next step in the promise chain
```

비동기 / 지연된 `mockResponse` 함수 가 없이, 
ask 함수 내부의 데이터를 읽을 준비가 되기 전에 mock stdin에 데이터를 제공했을 것입니다.

### bdd-stdin
테스트 로직을 단순화하기 위해 [bdd-stdin](https://github.com/bahmutov/bdd-stdin) 을 작성 하여 추가 세부 사항을 숨기고 차례대로 여러 답변을 제공 할 수 있습니다.

```javascript
var ask = require('./ask');
var bddStdin = require('bdd-stdin');
describe('ask', function () {
    it('asks one question', function () {
        bddStdin('answer');
        return ask('type "answer"')
            .then(function (response) {
                console.assert(response === 'answer');
            });
    });
});
```

하나의 질문에 대해 여러 답을 제공 할 수도 있습니다.

```javascript
var ask = require('./ask');
var bddStdin = require('bdd-stdin');
describe('ask', function () {
  it('asks one question', function () {
    bddStdin('one', 'two');
    return ask('type "one"')
      .then(function (response) {
        console.assert(response === 'one');
        return ask('type "two"');
      })
      .then(function (response) {
        console.assert(response === 'two');
      });
  });
});
```

또는 각 질문 앞에 예상되는 정보를 입력하기 만하면됩니다.

```javascript
it('asks three questions separately', function () {
  bddStdin('one');
  return ask('question 1')
    .then(function (response) {
      console.assert(response === 'one');
      bddStdin('two');
      return ask('question 2');
    })
    .then(function (response) {
      console.assert(response === 'two');
      bddStdin('three');
      return ask('question 3');
    }).then(function (response) {
      console.assert(response === 'three');
    });
});
```

bdd-stdin 현재 매우 단순한 프로그램이며 복잡한 async logic은 동작하지 않을 수 있습니다.

### 선택 목록에서 선택하기
[inquirer](https://www.npmjs.com/package/inquirer)와 같은 프롬프트 유틸리티 는 단어 목록에서 선택 항목을 선택할 수 있습니다. 사용자는 키보드 UP / DOWN 키를 사용하여 원하는 행을 하이라이트 한 다음 ENTER를 눌러 선택을 확인해야합니다.

```javascript
var inquirer = require('inquirer');
var question = {
  type: 'list',
  name: 'choice',
  message: 'pick three',
  choices: ['one', 'two', 'three']
};
inquirer.prompt([question], function (answers) {
  console.log('user picked', answers.choice);
});
```
사용자에게 다음 프롬프트를 표시합니다.

```
? pick three: (Use arrow keys)
❯ one 
  two 
  three
```

어떻게 `bdd-stdin` 유틸리티에서 화살표 버튼을 클릭하고 원하는 선택을 입력하는 방법을 시뮬레이션 할 수 있을까요?
아주 간단합니다. 원하는 키 코드를 입력 할 수 있습니다. 
`bdd-stdin`에서 간단히 사용하기 위해 export 된 함수에 몇 가지 키보드 코드를 추가했습니다.

```javascript
// bdd-stdin.js
bddStdin.keys = {
  up: '\u001b[A',
  down: '\u001b[B',
  left: '\u001b[D',
  right: '\u001b[C'
};
module.exports = bddStdin;
```

단위 테스트에서는 필요한만큼 여러 번 down 키를 제공하고 개행문자를 제공 할 수 있습니다.

# git Commit에서 Choice spec 실행

나는 [master branch를 무너뜨리지 않으려고](https://glebbahmutov.com/blog/never-break-master-by-accident/) 노력한다. 이를 위해 `git commit` 명령을 [pre-git](https://www.npmjs.com/package/pre-git) 패키지를 이용하여 자동으로 단위 테스트를 실행한다.

```
npm install --save-dev pre-git
```

나는 기본적으로 각 commit 별로 `npm test`와 `npm version` 커맨드를 실행한다.

```javascript
// package.json

"scripts": {
  "test": "mocha test/*-spec.js"
},
"pre-commit": [
  "npm test",
  "npm version"
]
```
이 사전 커밋 (pre-commit) 훅은 유닛 테스트 중에 표준 입력 스트림에 합성 입력을 공급하는 것과는 잘 작동하지 않습니다. 개별 텍스트는 잘 입력되었지만 UP 및 DOWN 키와 같은 제어 문자는 올바르게 전송되지 않습니다. 커밋 할 때 이러한 단위 테스트를 실행하지 않아야합니다. 다행히도, [내가 좋아하는 자바 스크립트 유닛 테스트 프레임 워크](https://glebbahmutov.com/blog/picking-javascript-testing-framework/)는 [모카 (Mocha)](http://mochajs.org/)이다. 이 상황을 아름답게 처리합니다.

git commit 단계에서 test 명령을 실행할 때 피하기 위해 단위 테스트에 키워드를 추가합니다. 예를 들어 그것은 `nogit` 이란 단어일 수 있습니다.

```javascript
// spec.js
it('selects the third choice - nogit', function () {
  bddStdin(bddStdin.keys.down, bddStdin.keys.down, '\n');
  return choice('pick three', ['one', 'two', 'three'])
    .then(function (response) {
      console.assert(response === 'three', 'received response ' + response);
    });
});
```

그 다음 commit hook 명령을 수정하여 이 사양을 건너뜁니다.

```javascript
// package.json
"pre-commit": [
  "npm test -- --grep nogit --invert",
  "npm version"
]
```

`--` 은 NPM에 뒤에 따라오는 옵션을 `mocha` command 에 전달합니다. `--grep` 옵션은 특정 사양 (이름 기준)을 선택하는 반면 `--invert` 옵션은 선택한 사양을 건너 뛰는 것을 의미합니다. 원래 `npm test` 명령은 선택 사양 테스트 기능을 건너 뛰지 않고 모든 사양을 실행합니다.

# 고급 : sinon.js를 사용하여 프롬프트 메소드 stubbing 하기
[Sinon.js](http://sinonjs.org/) 라이브러리를 사용하여 `inquirer.prompt` 메소드를 stub 처리합시다.

```javascript
var bddStdin = require('..');
var sinon = require('sinon');
var inquirer = require('inquirer');
describe('mock prompt', function () {
  var question = {
    type: 'checkbox',
    name: 'all',
    message: 'pick options',
    choices: ['one', 'two', 'three']
  };
  beforeEach(function () {
    sinon.stub(inquirer, 'prompt', function (questions, cb) {
      setTimeout(function () {
        cb({
          all: ['one']
        });
      }, 0);
    });
  });
  afterEach(function () {
    inquirer.prompt.restore();
  });
  it('select first choice', function (done) {
    inquirer.prompt([question], function (answers) {
      var response = answers.all;
      console.assert(Array.isArray(response) &&
        response.length === 1 &&
        response[0] === 'one',
        'received wrong choices ' + response);
      done();
    });
  });
});
```
우리는 항상 `inquire.prompt` stub에서 mock answer을 반환하고 각 단위 테스트 후에 original method을 복원합니다. Sinon.js 라이브러리를 사용하는 방법에 대한 더 자세한 정보가 필요하면 [Spying on methods](https://glebbahmutov.com/blog/spying-on-methods/)를 읽으십시오.

# 고급: 프롬프트 메소드 직접 mocking
단위 테스트 중에 가짜 사용자 입력을 입력하는 마지막 방법은 전체 문제를 해결하는 것입니다. 입력 스트림을 mocking하는 대신 사용자의 입력을 요구하는 메소드를 mocking합니다. 필자는 필자가 작성하고, 필요로 하는 Node의 빌트인 `require` 메소드를 대체하여 스펙 내에서 쉽게 이 작업을 수행할 수 있게 합니다. `require` 호출 중에 expose하는 옵션 중 하나는 export된 true `inquirer`를 메소드로 변환하는 기능입니다.

```javascript
// spec.js

require = require('really-need');
// require is now more powerful
describe('mock prompt', function () {
  var question = {
    type: 'checkbox',
    name: 'all',
    message: 'pick options',
    choices: ['one', 'two', 'three']
  };
  var inquirer;
  beforeEach(function () {
    inquirer = require('inquirer', {
      // make sure to remove any previously loaded instance
      bust: true,
      post: function post(inq) {
        // transform / mock inquirer.prompt method
        return inq;
      }
    });
  });
  it('select the first choice only', function (done) {
    inquirer.prompt([question], function (answers) {
      var response = answers.all;
      console.assert(Array.isArray(response) &&
        response.length === 1 &&
        response[0] === 'one',
        'received wrong choices ' + response);
      done();
    });
  });
});
```

`post` callback 내에 우리는 `inquirer.prompt`를 감싸고, 우리가 원하는 모든 것을 할 수 있습니다. 이 spec에 대해서는 동일한 답변을 동시에 반환합니다.

```javascript
// spec.js

var inquirer;
beforeEach(function () {
  inquirer = require('inquirer', {
    // make sure to remove any previously loaded instance
    bust: true,
    post: function post(inq) {
      inq.prompt = function (questions, cb) {
        cb({
          all: ['one']
        });
      };
      return inq;
    }
  });
});

```

이 간단한 경우에는 작동하지만 의미적으로는 mocked `inq.prompt`는 올바르지 않습니다. 이 메서드는 콜백 `cb`를 즉시 호출하지 않고 _비동기_ 적으로 호출해야합니다. call을 쉽게 연기 할 수 있습니다.

```javascript
// spec.js
var inquirer;
beforeEach(function () {
  inquirer = require('inquirer', {
    // make sure to remove any previously loaded instance
    bust: true,
    post: function post(inq) {
      inq.prompt = function (questions, cb) {
        setTimeout(function () {          
          cb({
            all: ['one']
          });
        }, 0);
      };
      return inq;
    }
  });
});
```

Now the callback will be called via event loop schedule, respecting the async behavior. For full example code see the spec file.

이제 콜백은 비동기 동작을 중요시하는 이벤트 루프 스케쥴을 통해 호출됩니다. 전체 예제 코드는 [spec 파일](https://github.com/bahmutov/bdd-stdin/blob/master/test/mock-prompt-spec.js)을 참조하십시오.

# really-need vs method stubs

왜 우리는 Sinon.js 에서 제공하는 동일한 기능을 만들기 위해 정말 필요로 하는 요구로 대체하는 어려움을 겪어야 할까요? 요구 단계에서 모듈을 대체하는 것은 강력하며, 간접적으로 로드된 모듈을 대체할 수 있습니다. 예를 들어 `inquirer`는 모듈 `readline2`를 사용하여 실제로 입 / 출력 스트림을 제어합니다. `really-need`에 의해 제공되는 캐시 무효화를 사용하여 `readline2`를 mock 할 수 있으며 `inquirer` 모듈은 mock 된 버전을 사용합니다!

```javascript
// the spec setup
require = require('really-need');
describe('mock readline', function () {
  var inquirer;
  mockRl = {
    pause: function () {},
    resume: function () {},
    close: function () {},
    on: function () {},
    removeListener: function () {},
    output: {
      mute: function () {},
      unmute: function () {},
      end: function () {},
      write: function () {}
    },
    addEventListener: function (name, handler) {
      if (!mockRl._listeners[name]) {
        mockRl._listeners[name] = [];
      }
      mockRl._listeners[name].push(handler);
    },
    removeEventListener: function () {},
    setPrompt: function () {},
    _listeners: {}
  };
  beforeEach(function () {
    require('inquirer/node_modules/readline2', {
      bust: true,
      keep: true,
      post: function (rl2) {
        rl2.createInterface = function () {
          return mockRl;
        };
        return rl2;
      }
    });
    inquirer = require('inquirer', {
      bust: true
    });
  });
});
```

`readline2.createInterface` 메소드를 우리 자신의 implement로 대체하여 텅 빈 `mockRl` 객체를 반환하는 방법에 주목하십시오. `mockRl`은 거의 쓸모가 없지만 (`inquirer`의) 이벤트 리스너를 수집하고 실제 입력 스트림을 거치지 않고 합성 키 이벤트를 보낼 수 있습니다!

```javascript
function emitSpace() {
  setTimeout(function () {
    if (mockRl._listeners.keypress) {
      mockRl._listeners.keypress.forEach(function (handler) {
        // send keypress 'space'
        handler(undefined, { name: 'space' });
      });
    }
  }, 0);
}
function emitNewLine() {
  setTimeout(function () {
    if (mockRl._listeners.line) {
      // just need empty event callback execution
      mockRl._listeners.line.forEach(handler);
    }
  }, 0);
}
it('select first choice', function (done) {
  emitSpace();
  emitNewLine();
  var question = {
    type: 'checkbox',
    name: 'all',
    message: 'pick options',
    choices: ['one', 'two', 'three']
  };
  inquirer.prompt([question], function (answers) {
    var response = answers.all;
    console.assert(Array.isArray(response) &&
      response.length === 1 &&
      response[0] === 'one',
      'received wrong choices ' + response);
    done();
  });
});
```
우리는 방금 mock `readline2` 객체에서 `inquierer`에 의해 사용되는 reactive 스트림으로 합성 이벤트를 보냈습니다. 이것은 고급 기술이며, 이 경우엔 잔인한 행위(overkill)입니다. 그러나 mock 된 기능이 테스트 된 API에서 멀리 떨어져있는 경우가 필요할 수도 있습니다.
