# Mock Service Worker

### 모킹(Mocking)이란?

- Mock(모의 데이터)을 만들어서 활용하는 방식
- 통상적으로 data fetch를 해야하는 경우 통신을 통해 응답을 내려주는 서버가 있어야 한다.
- 서버가 없는 경우, api 요청으로 내려올 데이터를 프론트에서 모킹하거나 서버의 역할을 해주는 무언가 필요

## MSW

- https://mswjs.io/
- 네트워크 레벨에서 요청에 맞는 데이터를 내려줄 수 있다.
- 리액트는 REST API & GraphQL support 한다.
- 실제 서버와 동일한 주소여도 서로 올라가지 않고 Interceptor 해서 msw를 통해 데이터 처리가 가능

### Rest API

- https://github.com/mswjs/examples/tree/master/examples/rest-react

### Worker / Server

- Browser : 브라우저 에서 제공되는 서비스워커 기능
- Node :서비스워커는 브라우저가 아닌환경에서는 동작하지 않는다 노드에서는 따로 노드 서버방식을 사용한다.

## Request flow diagram

- Browser

![image](https://user-images.githubusercontent.com/73993670/157840757-08c6b989-229b-4edc-98ed-372598f2c471.png)

응답 요청 -> 서비스 봉사자가 상태 -> res clone -> msw 전송 -> 모킹 데이터 응답

## install

```
$ npm install msw --save-dev
# or
$ yarn add msw --dev
```

<hr/>

## Mocking REST API

### 1. Imports

```javascript
// src/mocks/handlers.js
import { rest } from "msw";
```

### 2. Request handler

```javascript
// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.post("/login", null),

  // Handles a GET /user request
  rest.get("/user", null),
];
```

### 3. Response resolver

```javascript
// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
```

<hr/>

## Setup

핸들러를 만들었다고 동작되는것이 아니라 빌드해서 퍼블릭 안에 서비스 워커 파일을 만들어주어야한다.
PUBLIC_DIR은 어떤 프레임워크 혹은 라이브러리를 사용하고 있느냐에 따라 다른데, 우리는 리액트를 사용하고 있으므로 public/을 입력

```
$ npx msw init <PUBLIC_DIR> --save
|
$ npx msw init public/ --save
```

## Query parameters

- parameter로 들어온값을 res를 조작할 수있다.

```javascript

rest.get(
    "https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json",
    async (req, res, ctx) => {
      const id = req.url.searchParams.get("id");

      return res(
        ctx.json({
          data: {
            people: [
              {
                name: id,
                age: 135,
              },

              ...
            ],
          },
        })
      );
    }
  ),
```

## Response patching

- 실제 url의 응답을 받아 데이터 처리

```javascript
rest.get(
    "https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json",
    async (req, res, ctx) => {
      const id = req.url.searchParams.get("id");

      //Response patching
      const originalResponse = await ctx.fetch(req);
      const originalResponseData = await originalResponse.json();

      return res(
        ctx.json({
          data: {
            people: [
              ...originalResponseData.data.people,
              {
                name: id,
                age: 135,
              },
            ],
          },
        })
      );
    }
  ),
```

## Mocking error responses

- 에러상황 테스트

```javascript
return res(
  // Send a valid HTTP status code
  ctx.status(403),
  // And a response body, if necessary
  ctx.json({
    errorMessage: `Data not found`,
  })
);
```

- 에러 메세지를 화면에 보여주기

```javascript
const handleClick = () => {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      //에러메세지가 있다면 띄워주기
      if (json.errorMessage) {
        throw new Error(json.errorMessage);
      }
      setData(json.data);
    })
    .catch((err) => {
      setErr(`Somthing Wrong : ${err}`);
    });
};
```

## context status
```javascript
rest.get('/post/:postId', (req, res, ctx) => {
  // You can override the inferred status text
  // by providing it as the second argument.
  return res(ctx.status(404, 'Custom status text'))
})
```
