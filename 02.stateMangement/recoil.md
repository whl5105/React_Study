# recoil

https://recoiljs.org/

- Minimal and Reactish
- Data-Flow Graph
- Cross-App Observation
- facebook experimental : https://github.com/facebookexperimental/Recoil

<br/>
<hr/>

## 동기

호환성 및 단순함을 이유로 외부의 글로벌 상태관리 라이브러리보다는 React 자체에 내장된 상태 관리 기능을 사용하는 것이 가장 좋다. 그러나 React는 다음과 같은 한계가 있다.

- 컴포넌트의 상태는 공통된 상위요소까지 끌어올린다.그러다보니 상태가 계속 전달되어야하며 중간의 트리가 거대해지게되면 변경에 따라서 리랜더링이 될 수 있다
- context api는 단일값만 저장할 수 있으므로 여러가지의 값을 집합으로 만들 수 없다.
  여러 context를 가지기 위해서는 여러개의 provider로 감싸주어야하는 문제들이 있다.

이러한 문제들은 트리의 최상단에서 부터 하단의 자식요소까지 코드분할을 어렵게한다. 리코일은 이러한 문제들 개선하고자 리코일이 나오게 되었다.

- 공유상태(shared state)도 React의 내부상태(local state)처럼 간단한 get/set 인터페이스로 사용할 수 있도록 boilerplate-free API를 제공한다. (필요한 경우 reducers 등으로 캡슐화할 수도 있다.)
- 동시성 모드(Concurrent Mode)를 비롯한 다른 새로운 React의 기능들과의 호환 가능성도 갖는다.
- 상태 정의는 증분 및 분산되므로 코드 분할이 가능하다.
- 상태를 사용하는 컴포넌트를 수정하지 않고도 상태를 파생된 데이터로 대체할 수 있다.
- 파생된 데이터를 사용하는 컴포넌트를 수정하지 않고도 파생된 데이터는 동기식과 비동기식 간에 이동할 수 있다.
- 탐색을 일급 개념으로 취급할 수 있고 심지어 링크에서 상태 전환을 인코딩할 수도 있다.
- 역호환성 방식으로 전체 애플리케이션 상태를 유지하는 것은 쉬우므로, 유지된 상태는 애플리케이션 변경에도 살아남을 수 있다.

<br/>

#### [Data Flow Graph]
atoms(상태): 고유한 키를 가짐 <br/>
|<br/>
selectors(순수 함수): atoms 이나 selectors를 입력으로 받음<br/>
|<br/>
components<br/>

<hr>

## 설치

```shell
yarn add recoil
```

```javascript
//cdn
<script src="https://cdn.jsdelivr.net/npm/recoil@0.0.11/umd/recoil.production.js"></script>
```

<hr>

## Atoms

- Atoms는 상태의 단위이며, 업데이트와 구독이 가능하다.
- atom이 업데이트되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 다시 렌더링 된다.
- 동일한 atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다.

```javascript
import { atom } from "recoil";
const fontSizeState = atom({
  key: "fontSizeState",
  default: 14,
});
```

- 두개의 atom이 같은 키를 갖는 것은 오류이기 때문에 키값은 전역적으로 고유하도록 해야한다. React 컴포넌트의 상태처럼 기본값도 가진다.

- 컴포넌트에서 atom을 읽고 쓰려면 useRecoilState라는 훅을 사용한다. React의 useState와 비슷하지만 상태가 컴포넌트 간에 공유될 수 있다는 차이가 있다.

```javascript
import { useRecoilState } from "recoil";
import { fontSizeState } from "./CounterStore";

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button
      onClick={() => setFontSize((size) => size + 1)}
      style={{ fontSize }}
    >
      Click to Enlarge
    </button>
  );
}
```
- 버튼을 클릭하면 버튼의 글꼴 크기가 1만큼 증가하며, fontSizeState atom을 사용하는 다른 컴포넌트의 글꼴 크기도 같이 변화한다.


<br/>
<hr/>

## Selector
- Selector는 atoms나 다른 selectors를 입력으로 받아들이는 순수 함수(pure function)다
- 상위의 atoms 또는 selectors가 업데이트되면 하위의 selector 함수도 다시 실행된다. 
- 컴포넌트들은 selectors를 atoms처럼 구독할 수 있으며 selectors가 변경되면 컴포넌트들도 다시 렌더링된다.
- 최소한의 상태 집합만 atoms에 저장하고 다른 모든 파생되는 데이터는 selectors에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태의 보존을 방지한다.
- set을 잘 하지않고 변경된 값을 가지고오는 get을 많이 사용한다. 변경은 다른 atom의 값에 따라서 바뀌어 져 있기 때문에 주로 사용하지 않는다.

```javascript
import { atom, selector } from "recoil";

const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
```
- get 속성은 계산될 함수다. 전달되는 get 인자를 통해 atoms와 다른 selectors에 접근할 수 있다. 다른 atoms나 selectors에 접근하면 자동으로 종속 관계가 생성되므로, 참조했던 다른 atoms나 selectors가 업데이트되면 이 함수도 다시 실행된다.

```javascript
import {useRecoilState , useRecoilValue} from "recoil";
import {fontSizeLabelState, fontSizeState} from "./store";

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: ${fontSizeLabel}</div>
      <button onClick={setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}
```
<br/>
<hr/>

## Synchronous Example (동기 예제)

```javascript
import { atom, selector, useRecoilValue } from "recoil";

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

const tableOfUsers = [{name:"suin"}, {name:"inin"}];

const currentUserNameState = selector({
  key: 'CurrentUserName',
  get: ({get}) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});


export default function CurrentUserInfo() {
    const userName = useRecoilValue(currentUserNameState);
    return <div>{userName}</div>;
}

```


## Asynchronous Example (비동기 예제)

### Suspense
-  Recoil은 보류중인 데이터를 다루기 위해 React Suspense와 함께 동작하도록 디자인되어 있다. 컴포넌트를 Suspense의 경계로 감싸는 것으로 아직 보류중인 하위 항목들을 잡아내고 대체하기 위한 UI를 렌더한다.

```javascript
//Suspense 
function MyApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentUserInfo />
      </React.Suspense>
    </RecoilRoot>
  );
}
```
- 프로미스가 펜딩 상태일때 fallback 을 보여준다.

### Error Handling (에러 처리하기)
- 요청에 에러가 있다면 Recoil selector는 컴포넌트에서 특정 값을 사용하려고 할 때에 어떤 에러가 생길지에 대한 에러를 던질 수 있다. 이는 React <ErrorBoundary>로 잡을 수 있다.

```javascript
//React ErrorBoundary
//ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong. 에러발생 </h1>;
    }

    return this.props.children;
  }
}
```
```javascript
function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

### Queries with Parameters
- 매개변수를 기반으로 쿼리를 하고싶을 때 selectorFamily 를 사용하여 selector 자체에 id 값을 넣어서 값을 불러올 수 있다. 
