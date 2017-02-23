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

이 질문 / 응답 기능을 inquirer-confirm 과 유사한 promise 반환 함수로 이동하는 것이 편리합니다 .
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
이 경우 ask을 자체 파일로 이동합니다.

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
저는 promise 지원이 빵빵한 모카 유닛 테스트 프레임워크를 선택했습니다.

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

지금은 process.stdin스트림에 입력을 제공하지 않으므로 테스트 시간이 초과되었다고 나온다.

## step 3 - provide test answer #
우리는 간단하게 process.stdin에 문자열을 입력할 수 있습니다. 
좋은 기법은 실제 process.stdin 스트림을 모의 스트림 객체로 대체하는 것 입니다. 
나는 이것을 허용하는 moch-stdin 패키지를 사용합니다.

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

 단위 테스트 내부에서 실행 되는 지연된 함수 mockResponse에 주목하십시오. 
 지연은 테스트 스텝을 적절히 명령하기 위해 필요합니다.

```
ask the question and wait for response
send 'response' to the mock stdin
read the data from the mock stdin
execute the next step in the promise chain
```

비동기 / 지연된 mockResponse함수 가 없이, 
ask 함수 내부의 데이터를 읽을 준비가 되기 전에 mock-stdin에 데이터를 제공했을 것입니다.

### bdd-stdin
테스트 로직을 단순화하기 위해 bdd-stdin 을 작성 하여 추가 세부 사항을 숨기고 차례대로 여러 답변을 제공 할 수 있습니다.

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
inquirer와 같은 프롬프트 유틸리티 는 단어 목록에서 선택 항목을 선택할 수 있습니다. 사용자는 키보드 UP / DOWN 키를 사용하여 원하는 행을 하이라이트 한 다음 ENTER를 눌러 선택을 확인해야합니다.

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

어떻게 bdd-stdin 유틸리티에서 화살표 버튼을 클릭하고 원하는 선택을 입력하는 방법을 시뮬레이션 할 수 있을까요?
아주 간단합니다. 원하는 키 코드를 입력 할 수 있습니다. 
bdd-stdin에서 간단히 사용하기 위해 export 된 함수에 몇 가지 키보드 코드를 추가했습니다.

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

