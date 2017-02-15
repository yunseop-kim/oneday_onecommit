# 변수 스코프와 클로저
## 변수 스코프
 - 바인딩 : var 할당, 함수 인자 사용, this전달, 프로퍼티 할당 등의 과정에서 js의 이름에 값을 할당하는 행위

 ### 3.1 전역 스코프
 - 범위 : 변수의 생명주기 - 변수가 얼마나 어떤 값을 얼마나 오래 유지하는가
 

 ```javascript
var _ = require('underscore');

aGlobalVariable = 'livin la vida global';
// var 없이 변수 정의하면 전역 스코프가 됨.
var tmp = _.map(_.range(2), function(){ return aGlobalVariable });

console.log(tmp);

// 책에서는 전역변수 쓰지 말라는 얘기와, 변수가 불변성이 없다 라는 이야기를 한다.

function makeEmptyObject(){
    return new Object();
}

 ```

 ### 3.2 어휘 스코프

 ```javascript
var _ = require('underscore');

aVariable = 'Outer';
function afun(){
    var aVariable = "Middle";
    return _.map([1,2,3], function(e){
        var aVariable = "In";
        return [aVariable, e].join(' ');
    });
}

var tmp = afun();

console.log(tmp);
 ```
- 가장 가까운 바인딩 컨텍스트에서 시작해서 바인딩 찾을떄까지 외부로 변수 탐색을 함.
- 깨닫는 점 : 여기서는 순서가 어떻게 도는가를 보여주기 위해 이 예제를 사용한 듯

### 3.3 동적 스코프
```javascript
var _ = require('underscore');

var globals = {};

function makeBindFun(resolver){
    return function(k, v){
        var stack = globals[k] || [];
        globals[k] = resolver(stack, v);
        return globals;
    };
}

var stackBinder = makeBindFun(function(stack, v){
    stack.push(v);
    return stack;
});

var stackUnBinder = makeBindFun(function(stack){
    stack.pop();
    return stack;
});

var dynamicLookup = function(k){
    var slot = globals[k] || [];
    return _.last(slot);
}

stackBinder('a', 1);
stackBinder('b', 100);
stackBinder('a', '*');

stackUnBinder('a', 1);
console.log(dynamicLookup('a'));

console.log(globals);

```

- 해당하는 기법이 일으킬 문제 : 전역 변수를 조작하니까...

```javascript
function f(){ return dynamicLookup('a'); };
function g(){ stackBinder('a', 'g'); return f(); };

f(); // 1
g(); // 'g'

console.log(globals);

```

- f()는 a의 바인딩을 안 건드리니 상관 없음.
- g()는 f()를 호출한 g()에 의해 값이 결정됨
- 어떤 함수를 호출한 함수가 누군지 알아야만 주어진 변수의 바인딩 값을 알수 있다는 것은 동적 스코핑의 치명적 약점.
- 꺠닫는 점 : 그래서 내가 그런 개고생을 하는구나

### 3.3.1 JS의 동적 스코프
- js 에서는 this에 동적 스코프가 적용됨.
- 호출자가 누군가에 따라서 this 레퍼런스 값이 결정됨

```javascript
function globalThis(){ return this; }

globalThis();

console.log(globalThis.call('banana'));
//{ '0': 'b', '1': 'a', '2': 'n', '3': 'a', '4': 'n', '5': 'a' }

console.log(globalThis.apply('banana', []));
//{ '0': 'b', '1': 'a', '2': 'n', '3': 'a', '4': 'n', '5': 'a' }

```
- 컨텍스트 객체와 이벤트 대상을 일급 함수에 전달하며 얼마나 강력한 기법인지 증명함.
- 다만 동적 스코프와 혼동

```javascript
var nopeThis = _.bind(globalThis, 'nope');

nopeThis.call('wat');
```
- this 레퍼런스 바꿀 수 없도록 bind 함수 제공


## 3.4 함수 스코프

### 동적 스코핑과 함수 스코핑의 차이점

- var 의 특성을 알거임.. 전역 변수 비스무리한 속성. 이로 인해 문제가 발생할 수 있다.

```javascript
var _ = require('underscore');

function strangerIdentity(n){
    for(this['i'] = 0; this['i'] < n ; this['i']++);
    return this['i'];
}

console.log(strangerIdentity(100));
console.log(i);

console.log(strangerIdentity.call({}, 10000));
// call 이용해서 빈공간 제공
console.log(i);
// 전역 환경은 안건드리고 원래 전역변수 i 값은 유지
// but  컨텍스트에 빈 객체를 넘겨줄 이유가 없음. 오히려 전역 컨텍스트를 넘기는게 더 적절한 방법
// _.clone을 사용

function f(){
    this['a'] = 200;
    return this['a'] + this['b'];
}

var globals = {'b': 2};

console.log(f.call(_.clone(globals)));
console.log(globals);

```

-------
# apply, call 이해
```javascript
function sum(num1, num2) {
	return num1 + num2;
}

function callSum1(num1, num2) {
	return sum.apply(this, arguments);	// arguments 객체를 넘깁니다.
}

function callSum2(num1, num2) {	// 배열을 넘깁니다. 
	return sum.apply(this, [num1, num2]);
}

alert(callSum1(10, 10));	// 20
alert(callSum2(10, 10));	// 20							


```
- apply 의 경우...


```javascript
window.color = "red";
var o = {color: "blue"};

function sayColor() {
	alert(this.color);
}

sayColor();	// red

sayColor.call(this);	// red
sayColor.call(window);	// red
sayColor.call(o)	// blue				

```
- call 내에 객체가 선언되어 있으면 그 객체를 갖다가 쓴다.
- 

왜 쓰냐

평소에는 쓸이유가 거의 없지만 객체를 상속받았을때 부모클래스의 함수를 호출하고 싶을때 응용할 수 있습니다.
```
show : function {
    superclass.show.call(this);
}
```

http://odetocode.com/blogs/scott/archive/2007/07/05/function-apply-and-function-call-in-javascript.aspx



- 잘한점
    - 모각코 모임에 참여했다는 사실이 참 잘했다.
    - 이론 공부이기에 잘한점이랄게 있나 싶다.
- 잘못한점
    - 이론 공부이기에 잘못한점이랄게 있나 싶다.
    - 다음번에는 용기내서 인사를 해봐야겠다.
- 알게된점
    - 모각코는 정말 각자 코딩하다가 가는구나 하는 것을 알게 되었음
    - 집 근처에 이런 아름다운 카페가 있다는 것을 알게 되었음
    - 늦은 시간까지 노력하는 사람들이 많구나 하는 것을 알게 되었음
    - 익숙하지 않았던 apply, call 함수에 대해서 알게 되었음
        - 평소에는 별로 쓸일 없지만... 부모 클래스의 함수를 호출 시에 유용하게 사용한다는 것을 알게됨.
        - Functional JS 책에서 사용하는 것을 봤던 것 같음.
        - 
    - this 에 대해서 알게 되었음
        - 지금 알면 좀 창피한 일인가?
        - 전역에서 this.x = 1 하고 console.log(x) 찍으면 같은 값임
        - 3.4 함수 스코핑에 있던 예제 확인해보면 뭔소린지 매칭 될거임
    - 동적 스코핑
        - 바인딩 이름과 관련한 전역 맵 스택을 유지하는 것이 동적 스코핑의 핵심
    - 함수 스코핑
        - 함수 내에서 모든 바인딩이 제한됨
    - 이게 ES5에서 고민해야 할 문제를 다룬 챕터 아닌가? 싶다...
    - 호이스팅에 대해 알게 됨 : JS에서 변수 선언을 재정렬하는 동작을 말함
- 적용할 점
    - 알게 된 것들을 써먹을수 있어야지...
    - call과 apply는 실습을 해보고 아래 작성한다.

```javascript
var myObject = {
    a: 10,
    b: 4,
    sum : function(a, b){
        return a+b;
    }
};

var myObject2 = {
    a: 3,
    b: 6
};

function practiceCall(){
    return myObject.sum(this.a, this.b);
}

var tmp = practiceCall.call(myObject);
var tmp2 = practiceCall.call(myObject2);

console.log(tmp);   //14
console.log(tmp2);  //9
```
- call에 대해선 이해한듯 하다.
- apply 는 어떻게 써먹지?
```javascript
var _ = require('underscore');
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

var foo = {};

Person.apply(foo, ['kim', 21, 'male']);
console.dir(foo);//{ name: 'kim', age: 21, gender: 'male' }

Person.call(foo, 'hong', 21, 'female');
console.dir(foo);//{ name: 'hong', age: 21, gender: 'female' }

```

- 값을 저런식으로 넘길 일이 있겠지?
- 배열 내에 값 뿐만 아니라 function도 넣을수 있으니, 다양한 방법으로 사용이 가능할 듯 하다.
- 써먹어봐야겠지만..

