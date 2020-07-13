# 자바스크립트 모듈 시스템

## 이전
```html
<script src="jquery.js"></script>
<script src="jquery-add-on.js"></script>
<script src="main.js"></script>
```
별다른 모듈시스템이 존재하지 않았음  
필요하다면 script src 로 로드  

문제1) 전역스코프 오염  
문제2) 선언순서(로드순서)에 의존성이 생김

## AMD
> Asynchronous Module Definition ( 비동기적으로 모듈을 로드 )  

해당모듈이 필요한곳에서 의존성을 명시하고 사용  
고로 스코프 오염을 막을 수 있음  

또한 동적 로딩(Dynamic Loading, Lazy Loading)을 사용하므로  
페이지 렌더링을 방해하지 않으면서  
필요할때만 스크립트를 로드할 수 있음  

이를 구현한 구현체중 하나가 requirejs

## CommonJS
노드에서 채택한 모듈시스템  
동기적으로 동작하므로 서버사이드에 적합 ( file을 원할때 읽을 수 있음 )  
모듈임포트로 require **함수** 를 이용함

## UMD
> universal module definition  

다양한 모듈시스템 ( window, cjs, amd ... )  
어떤 모듈을 쓰던지 동작하게 하기 위해서 등장  
세가지 방식을 커버하기 위한 디자인패턴이라고 봐도 무방함  
if 문으로 모듈시스템을 체크하고 그에 맞게 로드  
```javascript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['jquery', 'myModule'], factory);
  } else if (typeof module === 'object' && module.exports) { // CommonJS
    module.exports = factory(require('jquery'), require('myModule'));
  } else { // window
    root.myModule = factory(root.$, root.m); 
  }
}(this, function($, m) {
  return {
    a: $,
    b: m,
  };
});
```

## ESM
> ECMAScript Module
자바스크립트 명세에 추가된 모듈시스템 ( import export )
```html
<script src="a.js" type="module">
<script src="main.js" type="module">
```
```js
// main.js
import a from './a.js'
a()
```
```js
// a.js
function a() {
  console.log('hello')
}
export default a
```

## cjs(require) vs amd
amd는 브라우져에서 동작하는 js를 위해서 탄생했음  
그래서 비동기적인 로드를 선택 ( 파일시스템에서 모듈을 읽는게 아님 )

이와다르게 cjs는 본래 js를 브라우져 밖으로 꺼내고 싶은 노력과 함께 탄생했음  
따라서 node 환경에서 동기적 ( 파일로드 )으로 동작

결국 두 그룹은 지향점이 다르므로 합의점을 찾지 못하고 독립적으로 떨어졌음

## cjs(require) vs es6 module(import)
require는 필요한 시점에 종속성(모듈)을 로드하면서 실행하지만  
import 모든 모듈들이 **미리** 파싱되고 로드되고나서 실행된다.