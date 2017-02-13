# Readme
- 사실 readme 라고 적기는 했으나, 해당 프로그램의 설명 + 제작 과정을 기록하기 위한 markdown 문서이다.

# 문제 인식 단계
- 팁 계산하는 프로그램 작성

# 요구사항 수집
- 계산식 : 팁이 얼마나 되나?
- 팁 비율 : 사용자 설정 가능하도록
- 화면에 어떤 내용을 표시하나?
- 출력 값은 어떻게 표시? 팁과 합계를 모두 표시? 혹은 합계만 표시하나?

```
What is the bill? 200
What is the tip percentage? 15
The tip is $30.00
The total is $230.00
```

- 복잡한 프로그램일수록 기능을 잘게 쪼개서 작동하도록 한다.

# 입력, 출력, 프로세스 찾아내기
- 동사와 명사를 노려볼 것

## 명사
- 가격
- 팁 비율
- 팁
- 전체 가격

## 동사
- 입력 받아야
- 계산하여
- 표시해야

---

- 입력 : 가격, 팁 비율
- 프로세스 : 계산
- 출력 : 팁, 전체 가격

# TDD

## 테스트 계획서
- 입력:
    - bill mount: 10
    - tip rate: 15
- 예상 결과:
    - Tip: $1.50
    - Total: $11.50

## 테스트 계획서2
- 입력:
    - bill mount: 11.25
    - tip rate: 15
- 예상 결과:
    - Tip: $1.69
    - Total: $12.94
- 이는 반올림 계산을 위함

## 의사 코드로 테스트 프로그램 작성

## 코드 작성
- 제약 조건
    - 

---
### mocha test 오류
```
import tipCalculator from '../tipCalculator';
^^^^^^
SyntaxError: Unexpected token import

```

- 위와 같은 에러가 발생하였음.
- mocha에서 es6 문법을 인식하지 못해서 생긴 문제이다.
- http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/ 참조함

아래와 같은 명령어를 써 줌
- npm install babel-core --save-dev
- npm install babel-preset-stage-0 --save-dev

.babelrc 파일 생성 후
```
{
  "presets": ["es2015"]
}
```

- mocha --compilers js:babel-core/register
