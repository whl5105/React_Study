리액트는 컴포넌트에서 prop이나 state가 변경될 때, 직전에 렌더링된 요소(element)와 새로 반환된 요소를 비교하여 실제 DOM을 업데이트 할지 말지 결정해야 한다. 이때 두 element가 일치하지 않으면 리액트는 새로운 요소로 DOM을 업데이트 하는데, 이러한 프로세스를 reconciliation이라고 한다.

1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
2. 개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

![image](https://user-images.githubusercontent.com/73993670/157224621-fce2dba3-13f4-48a8-92fb-b3b1c0d2b7ef.png)



<br/>

# Reconciliation
- https://ko.reactjs.org/docs/reconciliation.html
- 우리는 실제 React 내부에서 어떤 일이 일어나고 있는지는 명확히 눈에 보이지 않는다 . 우리가 React의 “비교 (diffing)” 알고리즘을 만들 때 어떤 선택을 했는지를 알 수 있다. 이 비교 알고리즘 덕분에 컴포넌트의 갱신이 예측 가능해지면서도 고성능 앱이라고 불러도 손색없을 만큼 충분히 빠른 앱을 만들 수 있다.

### 비교알고리즘 
- 두 개의 트리를 비교할 때, React는 두 엘리먼트의 루트(root) 엘리먼트부터 비교합니다. 이후의 동작은 루트 엘리먼트의 타입에 따라 달라진다.

<br/>


#### 1. 엘리먼트의 타입이 다른 경우
- 두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축
- 트리를 버릴 때 이전 DOM 노드들은 모두 파괴되며  컴포넌트 인스턴스는 componentWillUnmount()가 실행 -> 새로운 트리가 만들어질 때, 새로운 DOM 노드들이 DOM에 삽입됩니다. 그에 따라 컴포넌트 인스턴스는 UNSAFE_componentWillMount()가 실행되고 componentDidMount()가 이어서 실행된다. 이전 트리와 연관된 모든 state는 사라진다

<br/>

```javascript
// div 와 span 은 다르므로 Counter가 동일하더라도 새로운 엘리먼트를 그린다. 
//이전 Counter는 사라지고, 새로 다시 마운트가 된다.
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```
<br/>

#### 2. DOM 엘리먼트의 타입이 같은 경우
- 같은 타입의 두 React DOM 엘리먼트를 비교할 때, React는 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신
```javascript
//이 두 엘리먼트를 비교하면, React는 현재 DOM 노드 상에 className만 수정된다.
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```
#### 3. 같은 타입의 컴포넌트 엘리먼트
- state는 그대로 유지하고, props는 갱신한다.
- LifeCycle은 componentWillReceiveProps()와 componentWillUpdate()가 실행된다.

### 자식에 대한 재귀적 처리
- DOM 노드의 자식들을 재귀적으로 처리할 때, React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경을 생성

#### 1. key가 없는 경우
- 자식의 끝에 엘리먼트를 추가하면, 두 트리 사이의 변경은 잘 작동한다.
React는 두 트리에서 <li>first</li>가 일치하는 것을 확인하고, <li>second</li>가 일치하는 것을 확인합니다. 그리고 마지막으로 <li>third</li>를 트리에 추가한다.

```javascript
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```
-  위와 같이 단순하게 구현하면, 리스트의 맨 앞에 엘리먼트를 추가하는 경우에는  성능이 좋지 않다.

```javascript
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```
- React는 <li>Duke</li>와 <li>Villanova</li> 종속 트리를 그대로 유지하는 대신 모든 자식을 변경합니다. 이러한 비효율은 문제가 될 수 있다.



<br/>

### <em>이러한 문제를 해결하기 위해, React는 key 속성을 지원한다.<br/> 자식들이 key를 가지고 있다면, React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인
### 예를 들어, 위 비효율적인 예시에 key를 추가하여 트리의 변환 작업이 효율적으로 수행되도록 수정할 수 있다</em>


#### 1. key가 있는 경우

```javascript
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```
key값이 있다면 위치와 상관없이 key를 비교해서 변경 사항을 인식하기 때문에 key가 없을 때와는 달리 마지막 요소에 추가되는게 아니라도 효율적인 작업을 할 수 있다.
key는 형제 요소 사이에서만 식별할 수 있으면 되기 때문에 전역에서 관리할 필요가 없다.

<br/>

### 고려 사항
- 재렌더링은 모든 컴포넌트의 render를 호출하는 것이지 React가 언마운트시키고 다시 마운트하는 것은 아니다. 즉, 앞서 설명했던 규칙에 따라 렌더링 전후에 변경된 부분만을 적용할 것입니다.(함수의 호출로 이루어진다.)
- 현재 구현체에서는 한 종속 트리가 그 형제 사이에서 이동했다는 사실을 표현할 수는 있지만, 아예 다른 곳으로 이동했다는 사실은 표현할 수 없다. 알고리즘은 전체 종속 트리를 재렌더링할 것이다.
- React는 휴리스틱에 의존하고 있기 때문에, 휴리스틱이 기반하고 있는 가정에 부합하지 않는 경우 성능이 나빠질 수 있다.


<br/><hr/><br/><br/>

참고 사이트 
- https://velog.io/@syoung125/eact-Reconciliation%EC%9D%B4%EB%9E%80-virtual-DOM-%EB%A6%AC%EC%95%A1%ED%8A%B8%EA%B0%80-%EC%84%A0%EC%96%B8%EC%A0%81
