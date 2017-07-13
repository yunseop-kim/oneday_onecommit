# 책을 공부해야할 이유
1. 원래 짧은 스크립트 언어였지만, 이제 대규모 어플리케이션에서도 쓰이는 언어가 되었음.
2. 컴파일러가 없다 보니 에러의 소지가 다분한 언어가 자바스크립트이다.
    - JS 개발자들이 고통받는 한 예 : ==(타입을 강제변환 뒤 비교) 와 === (강제변환 없이 그냥 비교)
    - truthy, falsy 와 같은 모호한 개념

```javascript
    false == '0'    // true
    false == 'false' // false
```

- 첫번째 것은 false가 강제 형 변환 되어 0이 되고, 문자열 '0'도 숫자로 강제 형 변환되어 0
- 두번째 것은 false가 강제 형 변환 되어 0이 되고, 'false'는 숫자로 강제 형 변환되면 NaN이다. 뭐야 이건? 싶을거다.

```javascript
function letHaveFun(me, you){
    //
}

letHaveFun(me);
```

이러고 있으면 정의되지 않은 변수 들고서 함수를 호출함.

이외에도 의외의 스코핑 규칙, 독특한 프로토타입 상속 메커니즘, 이따금 부정확한 세미콜론 삽입, 전혀 상관도 없는 다른 객체에서 함수를 빌려오는 객체의 수완 등등..

3. 예기치 않게 깨진 코드를 작성하기 쉽다.
```javascript
myVar = myObj.myProp;
myVar = myObj.myPrxop;  // 여기에 undefined를 넣어서 실행함.
```

이는 아래와 같이 리팩토링 한다.

```javascript
var prop = 'myProp';
myObj[prop] = something;
```

위와 같은 문제를 미연에 방지하려면 TDD가 최선이다.

