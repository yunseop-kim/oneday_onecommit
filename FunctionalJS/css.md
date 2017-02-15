# CSS
```CSS
h1 { color: red; }
```
- h1: 선택자
- color: 스타일 속성
- red: 스타일 값

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Selector Basic</title>
    <style>
        h1{
            color: red;
            background-color: orange;
        }
    </style>
</head>
<body>
    <h1>CSS Selector Basic</h1>
</body>
</html>

```

## 태그 선택자
```html
<style>
    h1{ color: red; } /* h1 태그 color 속성에 red 키워드 적용 */

    p{ color: blue; }

    h2, h3, h4 { margin: 0; padding: 0; } /* 여러개의 선택자에 적용 */
</style>
```

## 아이디와 클래스 선택
### 아이디
- 아이디 : 웹 표준에서 아이디는 중복되면 안된다는 규칙이 있음

```html
<style>
    #header {
        width: 800px;
        margin: 0 auto;
        background: red;
    }

    #wrap {
        width: 800px;
        margin: 0 auto;
        overflow: hidden;
    }

    #aside {
        width: 200px;
        float: left;
        background: blue;
    }

    #content {
        width: 600px;
        float: left;
        background: green;
    }
</style>

<body>
    <div id="header">
        <h1>Header</h1>
    </div>
    <div id="wrap">
        <div id="aside">
            <h1>Aside</h1>
        </div>
        <div id="content">
            <h1>Content</h1>
        </div>
    </div>
</body>
```


### 클래스
```html
<style>
    .select{ color: red; }
    .mybackground{ background-color: blue }

    li.select{ color: orange; }
</style>

<body>
    <h1 class="select">Hello</h1>
    <ul>
        <li>Lorem Ipsum</li>
        <li class="select">Lorem Ipsum</li>
        <li>Lorem Ipsum</li>
        <li class="select mybackground">Lorem Ipsum</li>
    </ul>
</body>
```

- 선택자 공부 팁
    - http://flukeout.github.io/