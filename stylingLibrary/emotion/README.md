# emotion 
- https://emotion.sh/docs/introduction
- 프레임워크와 무관하게 @emotion/css 로 사용가능하며 리액트로 사용시 @emotion/react 리액트에 특화된 패키지를 사용하자 
- css Props로 서비스를 한다. (jsx를 대체하는 부분이다)
- styled-components 와 유사한 + @ 기능 제공
- composition 안에서 css 안에서 css 사용이가능
- Composing dynamic styles
- as prop
- Nesting components
- auto vendor-prefix / nested selectors / media queries
- SSR with zero configuration




<br/>

## styled-components vs emotion
- 두 라이브러리 처음에는 조금 달랐지만, 이제 거의 유사해졌다.
- 하지만 emotion이 사이즈가 작고 빠르다 라는 의견이 있다. 
https://github.com/jsjoeio/styled-components-vs-emotion

<br/>

# install

리액트용
```
npm i @emotion/styled @emotion/react
```
- The “@emotion/react” package requires React and is recommended for users of that framework if possible.
- The @emotion/styled package is for those who prefer to use the styled.div style API for creating components.
- React 버전을 사용하고 있는 경우(create-react-app) 에서는  /** @jsx jsx */pragma가 작동하지 않을 수 있으므로 /** @jsxImportSource @emotion/react */대신 사용해야 합니다.

<br/>
<br/>

1. '@emotion/styled 로 styled-component 와 동일하게 사용할 수 있다. 

2. emotion/react 로 css props를 제공해줄 수 있다. 


<br/>
<br/>

 # The css Prop


<br/>

### 1. Object Styles
```
Object Styles: css={{ fontSize: 12 }}
```

```javascript
/** @jsx jsx */
import { jsx } from '@emotion/react'

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

### 2. String Styles
```
String Styles: css={css`font-size: 12px`}
```

```javascript
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const color = 'darkgreen'

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```

### 3. Style Precedence
- The P component in this example has its default styles overridden in the ArticleText component.
- 스타일에 오버라이드되는 스타일을 만들 수 있다.
```javascript
/** @jsx jsx */
import { jsx } from '@emotion/react'

const P = props => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'Sans-Serif',
      color: 'black'
    }}
    {...props} // <- props contains the `className` prop
  />
)

const ArticleText = props => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props} // <- props contains the `className` prop
  />
)
```

<br/>

# Styled Components
### as props
 - 버튼 컴포넌트지만 a태그로 사용이 가능하다 

 ```javascript
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`

render(
  <Button
    as="a"
    href="https://github.com/emotion-js/emotion"
  >
    Emotion on GitHub
  </Button>
)
 ```
<br/>

# Composition
- Composition자체가 emotion에 파워풀하게 사용된다. 
- css 의 스타일을 재사용가능하게 할 수 있다.(확장이 가능하다)
```javascript
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const danger = css`
  color: red;
`

const base = css`
  background-color: darkgreen;
  color: turquoise;
`

render(
  <div>
    <div css={base}>This will be turquoise</div>
    <div css={[danger, base]}>
      This will be also be turquoise since the base styles overwrite the danger
      styles.
    </div>
    <div css={[base, danger]}>This will be red</div>
  </div>
)
```

<br/>

# Object Styles

- 하위요소의 className을 사용할 수있다.
```javascript
<div
    css={{
      color: 'darkorchid',
      '& .name': {
        color: 'orange'
      }
    }}
>
</div>
```

-  px을 자동으로 붙이며 계산된다.

```javascript
<div
    css={{
      padding: 8,
      zIndex: 200
    }}
>
</div>
```
- Media Queries 사용

```javascript
  <div
    css={{
      color: 'darkorchid',
      '@media(min-width: 420px)': {
        color: 'orange'
      }
    }}
  >
  </div>
```

- 배열로 전달이 가능
```javascript
 <div
    css={[
      { color: 'darkorchid' },
      { backgroundColor: 'hotpink' },
      { padding: 8 }
    ]}
  >
  </div>
```

- Fallbacks ,그라디언트가 제공되지 않는 브라우저는 기본 red값이 적용된다., (문제가 생겼을때 기본값)
```javascript
 <div
    css={{
      background: [
        'red',
        'linear-gradient(#e66465, #9198e5)'
      ],
      height: 100
    }}
  >
  </div>
```
<br/>

# Nested Selectors
- 해당 태그의 안에만 css값만 변경할 수 있다. 
```javascript
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const paragraph = css`
  color: turquoise;

  /* header 안의 자식요소의 p태그를 green으로 바꿔라 */
  header & {
    color: green;
  }
`
render(
  <div>
    <header>
      <p css={paragraph}>
        This is green since it's inside a header
      </p>
    </header>
    <p css={paragraph}>
      This is turquoise since it's not inside a header.
    </p>
  </div>
)
```

<br/>

# Media Queries
```javascript
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)

render(
  <div>
    <div
      css={{
        color: 'green',
        [mq[0]]: {
          color: 'gray'
        },
        [mq[1]]: {
          color: 'hotpink'
        }
      }}
    >
      Some text!
    </div>
    <p
      css={css`
        color: green;
        ${mq[0]} {
          color: gray;
        }
        ${mq[1]} {
          color: hotpink;
        }
      `}
    >
      Some other text!
    </p>
  </div>
)
```


<br/>

# Global Styles
- emotion의 Global 을 사용하여 공통된 css 적용 
- css 가 아닌 styles라는 props로 전달 해줘야한다
``` javascript
import { Global, css } from '@emotion/react'

render(
  <div>
    <Global
      styles={css`
        .some-class {
          color: hotpink !important;
        }
      `}
    />
    <Global
      styles={{
        '.some-class': {
          fontSize: 50,
          textAlign: 'center'
        }
      }}
    />
    <div className="some-class">This is hotpink now!</div>
  </div>
)
```

<br/>

# Keyframes

```javascript
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

render(
  <div
    css={css`
      animation: ${bounce} 1s ease infinite;
    `}
  >
    some bouncing text!
  </div>
)
```


