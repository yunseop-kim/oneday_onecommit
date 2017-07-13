# 기본 타입

# 소개

프로그램을 유용하게 사용하려면 숫자, 문자열, 구조, 부울 값 등 가장 간단한 데이터 단위로 작업 할 수 있어야합니다. TypeScript에서는 자바 스크립트에서 기대할 수있는 것과 거의 같은 유형을 지원합니다. 편리한 열거 형을 사용하여 상황을 돕습니다.

# Boolean

가장 기본적인 데이터 타입은 JavaScript / TypeScript가 `boolean` 값을 호출하는 단순한 참 / 거짓 값입니다.

```
let isDone: boolean = false;
```

# Number

JavaScript 에서처럼 TypeScript의 모든 숫자는 부동 소수점 값입니다. 이 부동 소수점 숫자는 유형 `number`을 가져옵니다. TypeScript는 16 진수 및 10 진수 리터럴 외에도 ECMAScript 2015에 도입 된 바이너리 및 8 진수를 지원합니다.

```false
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

# String

JavaScript로 웹 페이지나 서버 같은 프로그램을 만드는 또 다른 기본적인 부분은 텍스트 데이터로 작업합니다. 다른 언어에서와 마찬가지로 이 텍스트 데이터 유형을 참조하기 위해 `string` 유형을 사용합니다. JavaScript와 마찬가지로 TypeScript는 문자열 데이터를 둘러싸기 위해 큰 따옴표 (`"`) 또는 작은 따옴표 (`'`)를 사용합니다.

```typescript
let color: string = "blue";
color = 'red';
```

*템플릿 문자열*을 여러 줄에 걸쳐 있거나 표현식이 포함되도록 사용할 수도 있습니다. 이 문자열은 백틱 / 백 쿼트 (```) 문자로 둘러싸여 있으며, 포함 된 표현식은 `$ {expr}` 형식입니다.

```typescript
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```

이것은 `sentence`를 다음과 같이 선언하는 것과 같습니다 :

```typescript
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";
```

# Array

TypeScript는 JavaScript와 마찬가지로 값 배열을 사용할 수 있습니다. 배열 유형은 두 가지 방법 중 하나로 작성 될 수 있습니다. 첫 번째로, 엘리먼트 타입의 배열을 나타 내기 위해 `[]` 다음에 오는 엘리먼트 타입을 사용합니다.

```typescript
let list: number[] = [1, 2, 3];
```

두 번째 방법은 일반적인 배열 유형 `Array <elemType>`을 사용합니다. :

```typescript
let list: Array<number> = [1, 2, 3];
```

# Tuple

튜플 유형을 사용하면 고정 된 수의 엘리먼트 유형을 알고 있지만 동일 할 필요는 없는 배열을 표현할 수 있습니다. 예를 들어, `string`과 `number`의 쌍으로 값을 표시하고자 할 수 있습니다.

```
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

알려진 인덱스가 있는 엘리먼트에 액세스 할 때 올바른 유형이 검색됩니다.

```typescript
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

알려진 인덱스 세트 외부의 엘리먼트에 액세스 할 때 대신 다음과 같이 공용 유형(a union type)이 사용됩니다.

```typescript
x[3] = "world"; // OK, 'string' can be assigned to 'string | number'

console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'

x[6] = true; // Error, 'boolean' isn't 'string | number'
```

공용 유형(Union Type)은 이후 장에서 다룰 고급 주제입니다.

# Enum

A helpful addition to the standard set of datatypes from JavaScript is the `enum`. As in languages like C#, an enum is a way of giving more friendly names to sets of numeric values.

JavaScript의 표준 데이터 유형 세트에 유용한 추가 정보는 `enum`입니다. C #과 같은 언어에서와 마찬가지로 열거 형은 숫자 값 집합에 더 친숙한 이름을 지정하는 방법입니다.

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

기본적으로 열거 형은 0부터 시작하여 멤버 항목의 번호 매기기를 시작합니다. 멤버 항목 중 하나의 값을 수동으로 설정하여 변경할 수 있습니다. 예를 들어 이전 예제를 `0` 대신 `1`로 시작할 수 있습니다.

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

또는 열거 형의 모든 값을 수동으로 설정합니다.

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

열거 형의 편리한 기능은 수치 값에서 열거 형의 값의 이름으로 이동할 수 있다는 것입니다. 예를 들어 값이 2이지만 위의 `Color` 열거 형에 매핑 된 것이 확실하지 않은 경우 해당 이름을 찾을 수 있습니다.

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);
```

# Any

우리는 응용 프로그램을 작성할 때 알지 못하는 변수 유형을 표현해야 할 수도 있습니다. 이 값은 동적 콘텐츠 (예 : 사용자 또는 서드 파티 라이브러리로부터. 이 경우 유형 검사를 선택하지 않고 값을 컴파일 타임 검사를 통과하도록하고 싶습니다. 그렇게하기 위해 우리는 이것을 `any` 타입으로 분류합니다 :

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

The `any` type is a powerful way to work with existing JavaScript, allowing you to gradually opt-in and opt-out of type-checking during compilation. You might expect `Object` to play a similar role, as it does in other languages. But variables of type `Object` only allow you to assign any value to them - you can’t call arbitrary methods on them, even ones that actually exist:

any 타입은 기존 JavaScript로 작업 할 수있는 강력한 방법이므로 컴파일하는 동안 점차 옵트 인 (opt-in) 및 옵트 아웃 (opt-out) 할 수 있습니다. 다른 언어에서와 마찬가지로 `Object`도 비슷한 역할을 할 것으로 기대할 수 있습니다. 그러나 `Object` 타입의 변수는 당신이 그들에게 어떤 값을 할당 할 수 있게 합니다 - 실제로 존재하는 것조차도 그들에게 임의의 메소드를 호출 할 수 없습니다 :

```typescript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

`any` 타입은 타입의 일부분을 알고 있다면 편리하지만 아마도 전부는 아닐 것입니다. 예를 들어 배열이 있을 수 있지만 배열에는 다른 유형이 혼합되어 있을 수 있습니다.

```
let list: any[] = [1, true, "free"];

list[1] = 100;
```

# Void

`void`는 `any`의 반대와 조금 비슷합니다 : 어떤 타입의 부재도 전혀 없습니다. 일반적으로 값을 반환하지 않는 함수의 반환 유형으로 이것을 볼 수 있습니다.: 어떤 타입의 부재도 전혀 없습니다. 일반적으로 값을 반환하지 않는 함수의 반환 유형으로 이것을 볼 수 있습니다.

```
function warnUser(): void {
    alert("This is my warning message");
}
```

Declaring variables of type `void` is not useful because you can only assign `undefined` or `null` to them:

```
let unusable: void = undefined;
```

# Null and Undefined

In TypeScript, both `undefined` and `null` actually have their own types named `undefined` and `null` respectively. Much like `void`, they’re not extremely useful on their own:

```
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

By default `null` and `undefined` are subtypes of all other types. That means you can assign `null` and `undefined`to something like `number`.

However, when using the `--strictNullChecks` flag, `null` and `undefined` are only assignable to `void` and their respective types. This helps avoid *many* common errors. In cases where you want to pass in either a `string` or `null` or `undefined`, you can use the union type `string | null | undefined`. Once again, more on union types later on.

> As a note: we encourage the use of `--strictNullChecks` when possible, but for the purposes of this handbook, we will assume it is turned off.

# Never

The `never` type represents the type of values that never occur. For instance, `never` is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns; Variables also acquire the type `never` when narrowed by any type guards that can never be true.

The `never` type is a subtype of, and assignable to, every type; however, *no* type is a subtype of, or assignable to, `never` (except `never` itself). Even `any` isn’t assignable to `never`.

Some examples of functions returning `never`:

```
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}
```

# Type assertions

Sometimes you’ll end up in a situation where you’ll know more about a value than TypeScript does. Usually this will happen when you know the type of some entity could be more specific than its current type.

*Type assertions* are a way to tell the compiler “trust me, I know what I’m doing.” A type assertion is like a type cast in other languages, but performs no special checking or restructuring of data. It has no runtime impact, and is used purely by the compiler. TypeScript assumes that you, the programmer, have performed any special checks that you need.

Type assertions have two forms. One is the “angle-bracket” syntax:

```
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

And the other is the `as`-syntax:

```
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

The two samples are equivalent. Using one over the other is mostly a choice of preference; however, when using TypeScript with JSX, only `as`-style assertions are allowed.

# A note about `let`

You may’ve noticed that so far, we’ve been using the `let` keyword instead of JavaScript’s `var` keyword which you might be more familiar with. The `let` keyword is actually a newer JavaScript construct that TypeScript makes available. We’ll discuss the details later, but many common problems in JavaScript are alleviated by using `let`, so you should use it instead of `var` whenever possible.