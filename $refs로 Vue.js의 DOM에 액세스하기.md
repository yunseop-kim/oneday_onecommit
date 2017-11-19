# $refs로 Vue.js의 DOM에 액세스하기



Published on April 23, 2017 by [Bo Andersen](https://codingexplained.com/author/andy)

뷰 인스턴스 몇몇 속성과 메소드를 자세히 살펴보며, 첫번째로 $refs 속성에 대해 알아봅시다.그러나 자바스크립트로 들어가기 전에, 템플릿을 먼저 살펴보도록 하겠습니다.

```html
<div id="app">
	<h1>{{ message }}</h1>
	<button @click="clickedButton">Click Me!</button>
</div>
```

```javascript
var vm = new Vue({
	el: '#app',
	data: {
		message: 'Hello World!'
	},
	methods: {
		clickedButton: function() {
    
		}
	}
});
```

템플릿 내의 여느 엘리먼트에 ref 속성을 추가함으로써, Vue 인스턴스에서 이러한 엘리먼트를 참조 할 수 있습니다. 보다 구체적으로, DOM 요소에 액세스 할 수 있습니다. 자, 내가 미리 추가 한 버튼을 사용해 보겠습니다. 버튼에는 아직 아무 동작도 하지 않는 click 이벤트 핸들러가 이미 있습니다.

```Html
<button ref="myButton" @click="clickedButton">Click Me!</button>
```

ref 속성은 표준 HTML 속성이 아니므로 Vue에서만 사용됩니다. 실제로 DOM의 일부가 아니기 때문에 렌더링 된 HTML을 검사하면 그 HTML의 표시를 볼 수 없습니다. 그리고 콜론으로 접두어(prefix)를 붙이지 않았으므로 지시자가 아닙니다.

이제 myButton이라는 이름을 사용하여 이 버튼을 참조 할 수 있습니다. Vue 인스턴스의 $refs 속성을 사용하여 이 작업을 수행 할 수 있습니다. 이것을 콘솔에 기록하고 어떻게 보이는지 보도록 하겠습니다.

```javascript
var vm = new Vue({
	el: '#app',
	data: {
		message: 'Hello World!'
	},
	methods: {
		clickedButton: function() {
			console.log(this.$refs);
		}
	}
});
```

따라서 콘솔을 열면 이 속성이 ref 속성을 추가 한 모든 요소에 대한 참조를 포함하는 JavaScript 객체임을 알 수 있습니다.

[![img](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.28.24.png)](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.28.24.png)

이 오브젝트 내의 키 이름이 ref 속성에서 명명한 이름과 일치하며, 값은 DOM 엘리먼트입니다. 이 경우 키가 myButton이고 값이 Vue.js와 아무런 관련이없는 기본 버튼 요소라는 것을 알 수 있습니다.

따라서 우리는 $refs 오브젝트에서 참조하는 이름을 속성으로 엑세스하여 간단하게 DOM 엘리먼트에 접근할 수 있습니다. 실제 동작하는 것을 보도록 하겠습니다. 아래 예제에서는 버튼을 클릭하면 텍스트가 바뀌도록 해보겠습니다.

```javascript
var vm = new Vue({
	el: '#app',
	data: {
		message: 'Hello World!'
	},
	methods: {
		clickedButton: function() {
			console.log(this.$refs);
			this.$refs.myButton.innerText = this.message;
		}
	}
});
```

버튼을 클릭하면 텍스트가 "Hello World!"로 바뀝니다.

[![img](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.30.44.png)](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.30.44.png)

물론 쿼리 선택기를 사용하여 DOM 요소에 액세스 할 수 있으므로 바닐라 JavaScript로 이 작업을 수행 할 수도 있지만, ref 속성을 사용하는 것이 더 명확하게 이를 수행하는 방법입니다. 또한 클래스와 ID에 의존하지 않으므로 안전합니다. 따라서 마크 업 또는 CSS 스타일을 변경하여 코드를 위반할 확률은 낮습니다.

Vue와 같은 JavaScript 프레임 워크의 주요 목적 중 하나는 개발자가 DOM을 다룰 필요가 없게 하는 것입니다. 그러므로 내가 정말로 필요로 하지 않는 한 당신에게 보여준 것을 하지 말아야합니다. 당신이 알고 있어야하는 잠재적인 문제가 있습니다. 나는 당신에게 지금 그것을 보여줄 것입니다.

먼저 h1 요소에 ref 속성을 추가해 보겠습니다.

```html
<h1 ref="message">{{ message }}</h1>
```

Vue 인스턴스를 이미 변수에 할당했기 때문에 그냥 사용할 수 있습니다. 내가 하고 싶은 것은 엘리먼트의 텍스트를 변경하는 것입니다. 처음에는 메시지 데이터 속성 값이 포함될 것이므로 어떤 일이 발생하는지 알 수 있도록 시간 제한을 적용하겠습니다.

```javascript
setTimeout(function() {
	vm.$refs.message.innerText = 'This is a test';
}, 2000);
```

그것을 실행하고 2 초 후에 텍스트가 바뀌는 것을 봅시다.

다음으로, 2 초 후에 메시지 데이터 속성을 변경해보겠습니다.

```javascript
setTimeout(function() {
	vm.message = 'This is another test';
}, 4000);
```

코드를 다시 실행하고 어떤 일이 발생하는지 살펴 봅시다.

[![img](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.33.42.png)](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.33.42.png)

보다시피 DOM에 대한 변경 사항은 데이터 속성을 업데이트 할 때 덮어 씁니다. 그 이유는 DOM 요소에 액세스하고 DOM 요소를 직접 조작 할 때, 이전 게시물에서 설명한 것처럼 본질적으로 가상 DOM을 건너 뛰고 있기 때문입니다. 

따라서 Vue는 템플릿의 복사본을 보유하고 있으므로 h1 요소를 계속 제어하고 있으며 Vue가 데이터 속성의 변경 내용에 반응하면 가상 DOM과 그 이후 DOM을 업데이트합니다. 따라서 조심하지 않으면 적용한 변경 사항을 덮어 쓸 수 있으므로 DOM에 직접 변경 사항을 적용 할 때는 주의해야 합니다. 참조를 사용할 때 DOM을 변경하는 것에 대해 신중해야 하지만 DOM에서 값을 읽는 것과 같은 읽기 전용 작업은 안전합니다.

마지막으로, v-for 지시문을 사용하여 프로퍼티에 대해 ref 속성을 사용하는 방법을 보여 드리고자합니다. 1에서 10까지의 숫자로 구성된 정렬되지 않은 목록을 추가하기만 합니다. 이 목록은 v-for 지시문을 사용하여 출력합니다.

```html
<ul>
    <li v-for="n in 10" ref="numbers">{{ n }}</li>
</ul>
```

우리는 이미 버튼을 클릭 할 때 $ refs 속성을 콘솔에 기록하는 라인을 추가 했으므로, 콘솔을 열고 어떻게 보이는지 살펴 보겠습니다.

[![img](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.37.32.png)](https://codingexplained.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-23-at-01.37.32.png)

숫자 속성이 예상대로 오브젝트에 추가되었지만 값의 유형을 확인해봅시다. 이전에 보았던 DOM 요소가 아니라 실제 배열입니다. DOM 요소의 배열입니다. ref 속성을 v-for 지시어와 함께 사용하면 Vue는 루프의 모든 반복에 대한 DOM 요소를 수집하여 배열 내에 배치합니다. 이 경우 우리 루프가 열 번 반복하기 때문에 DOM 요소가 10 개 배열이됩니다. 이러한 각 요소는 이전에 본 것과 똑같이 사용할 수 있습니다.

그리고 그것은 $ refs 속성에 대해 당신이 알아야 할 모든 것입니다.