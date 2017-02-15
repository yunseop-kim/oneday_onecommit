# Functional Javascript
## 2.1 일급 함수의 특징
- 관계형 정의가 없어서 JS를 함수형 언어라 생각 안하는 사람들도 있다.
- 함수형 프로그래밍의 자격 조건
    - 관계형 정의
    - 타입, 패턴 매치, 불변성, 순수성
    - 일급 함수
    - 편의성

### 일급 함수
- 숫자를 변수에 저장하듯이 함수를 변수에 저장
```Javascript
var fortytwo = function() { return 42 };
```
- 숫자를 배열에 저장하듯이 함수를 배열에 저장
```Javascript
var fortytwos [42, function() { return 42}];
```
- 숫자를 객체에 저장하듯이 함수를 객체에 저장
```Javascript
var fortytwos = { number: 42, fun: function() { return 42} };
```
- 언제든 숫자를 만들 수 있듯이 필요할 때 함수를 만듦
```Javascript
 42 + (function() { return 42} )();
 // => 84
 ```
- 아래 두개의 정의를 사용하는 함수는 고차원 함수라고 부름
- 함수에 숫자를 전달할 수 있듯이 함수에 함수를 전달
```Javascript
function weirdAdd(n, f){ return n + f() }

weirdAdd(42, function(){ return 42 });
// => 84
```
- 함수에 숫자를 반환할 수 있듯이 함수가 함수를 반환 할 수 있음
```Javascript
return 42;

return function() { return 42 };
```

### 고차원 함수 예제
```Javascript
var _ = require('underscore');

_.each(['whiskey', 'tango', 'foxrot'], function(word){
    console.log(word.charAt(0).toUpperCase() + word.substr(1));
});
```

## 2.1.1 JS 다중 패러다임
### 명령형 프로그래밍 : 동작을 자세히 설명하는 방식 기반
```Javascript
var lyrics = [];

for (var bottles = 99; bottles >0; bottles--){
    lyrics.push(bottles + " bottles of beer on the wall");
    lyrics.push(bottles + " bottles of beer");
    lyrics.push("Take one down, pass it around");

    if(bottles > 1){
        lyrics.push((bottles - 1) + " bottles of beer on the wall");
    }
    else{
        lyrics.push("No more bottles of beer on the wall");
    }
}

console.log(lyrics);
```
- 대부분 일회용 코드, 재사용 어려움

### 함수형 방식
```Javascript
var _ = require('underscore');

function lyricsSegment(n){
    return _.chain([])
    .push(n + " bottles of beer on the wall")
    .push(n + " bottles of beer")
    .push("Take one down, pass it around")
    .tap(function(lyrics){
        if(n > 1){
            lyrics.push((n -1 ) + " bottles of beer on the wall.");
        }
        else{
            lyrics.push("No more bottles of beer on the wall");
        }
    })
    .value();
}

console.log(lyricsSegment(3));
```
- 프로그램을 여러 구성 요소로 분해
- 추상화된 함수를 이용하여 본래의 기능을 수행하도록 재조립

```Javascript
function song(start, end, lyricGen){
    return _.reduce(_.range(start, end, -1), function(acc, n){
        return acc.concat(lyricGen(n));
    }, []);
}
```
- 노래 구문을 조립하는 프로그램 추상화.
- 일부 영역 로직을 분리할 수 있음. 한국어 버젼, 독일어 버젼 등으로 변환 가능

### 프로토타입 기반 객체 지향 프로그래밍
- 자바 : 인스턴스 만들 때 관련 클래스가 템플릿 역할.
- 자바스크립트: 기존 객체가 특화된 인스턴스의 프로토타입 역할을 함
- 이게 뭔소리냐... 
- 함수가 객체의 필드 값이 될 수 있다.

```
_.each;
```
- JS는 자기 참조가 필요함. 이는 함수형 프로그래밍 개념과 상충함.
```Javascript
var a = { name: "a", fun: function(){ return this;}};
a.fun();
//=> { name: "a", fun: ...};
```

- 이럴 때는 문제가 되기도 함
```Javascript
var bFunc = function() { return this };
var b = { name: "b", fun: bFunc };

b.fun();
//=> Window 같은 어떤 전역 객체
```

- 함수 라고 표현하면 : 독립적으로 존재하는 함수
- 메서드 라고 표현하면 : 관련 객체의 컨텍스트 내에서 생성된 함수

### 메타프로그래밍
- 어떤 것이 해석되는 방식을 바꾸도록 코드를 구현하는 것을 메타프로그래밍이라 함

```Javascript
function Point2D(x, y){
    this._x = x;
    this._y = y;
}

new Point2D(0, 1);
//=> { _x: 0, _y: 1 }

function Point3D(x, y, z){
    Point2D.call(this, x, y);
    this._z = z;
}

new Point3D(0, -1, 100);
//=> {_x: 0, _y: -1, _z: 100}
```

## 응용형 프로그래밍
- 함수 A 내부의 함수 B를 호출하는 방식
- 함수 A의 결과를 함수 B의 인자로 제공

### map, reduce, filter 살펴보기
```Javascript
var _ = require('underscore');

var nums = [1,2,3,4,5];

function doubleAll(array){
    return _.map(array, function(n) { return n * 2 });
}

console.log(doubleAll(nums));

function average(array){
    var sum = _.reduce(array, function(a, b) { return a + b });
    return sum / _.size(array);
}

console.log(average(nums));

function onlyEven(array){
    return _.filter(array, function(n){
        return (n % 2) === 0;
    });
}

console.log(onlyEven(nums));
```

## 2.2.1 컬렉션 중심 프로그래밍
- 컬렉션에 포함된 많은 아이템을 처리하는 경우 진가가 드러남

```Javascript
var _ = require('underscore');

var stooge = {name: 'moe'};
console.log(_.identity(stooge));
// {name: 'moe'};

console.log(_.map({a:1, b: 2}, _.identity));
// [1, 2]

var tmp1 = _.map({a:1, b:2}, function(v, k, coll){
    return [k, v, _.keys(coll)];
});

console.log(tmp1);


```
- 10개의 데이터 구조체를 동작시키는 10개의 함수보다 한 개의 데이터 구조체를 동작시키는 100개의 함수가 낫다.

## 2.2.2 응용형 프로그래밍의 다른 예제
- reduceRight <-> reduce
- find
- reject <-> filter
- all
- sortBy, groupBy, countBy

## 2.2.3 응용형 함수
- 응용형 함수는 함수를 인자로 받는 함수
- 점진적으로 함수를 정의하고 저수준 함수에서 만들어진 여러 기능을 사용하는 것

## 2.3 데이터 고찰
- _.keys
- _.values
- _.pluck
- _.pairs

```
var _ = require('underscore');

var zombie = { name: "Bub", film: "Day of the Dead" };
_.keys(zombie);
_.values(zombie);
_.pluck([
    { title: "Chton", author: "Anthony"},
    { title: "Grendel", author: "Gardner"},
    { title: "After Dark"}], 'author');
_.pairs(zombie);
_.object(_.map(_.pairs(zombie), function(pair){
    return [pair[0].toUpperCase(), pair[1]];
}));
_.invert(zombie);
_.pluck(_.map([{ title: "Chton", author: "Anthony"},
    { title: "Grendel", author: "Gardner"},
    { title: "After Dark"}], 
    function(obj){
        return _.defaults(obj, {author: 'Unknown'})
    }), 'author');

```

Collection+JSON 문서를 번역하는 API를 리팩토링 해도 좋을 듯 하다.

## 2.3.1 테이블 형식 데이터

...

실습 위주로구만

