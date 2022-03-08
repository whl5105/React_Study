//react 17버전에서는 React를 명시적으로 import를 해주지 않아도 된다.
import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const color = "white";

const style = css`
  color: hotpink;
`;
//선언된 css 적용
const SomeComponent = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
);

//객체전달
const anotherStyle = css({
  textDecoration: "underline",
});

const AnotherComponent = () => (
  // <div css={anotherStyle}>Some text with an underline.</div>

  // 배열로 이중 스타일 적용 가능
  // 중복된 스타일이 있을경우 마지막 스타일 오버라이드
  <div css={[anotherStyle, style]}>Some text with an underline.</div>
);

const P = (props) => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: "1.5",
      fontFamily: "Sans-Serif",
      color: "black",
    }}
    {...props} // <- props contains the `className` prop
  />
);
// 위의 p태그의 스타일 속성을 가지고 있지만 오버라이드 되어 추후에 추가한 스타일만 남는다
const ArticleText = (props) => (
  <P
    css={{
      fontSize: 14,
      fontFamily: "Georgia, serif",
      color: "darkgray",
    }}
    {...props} // <- props contains the `className` prop
  />
);

const Emotion = () => {
  return (
    <>
      <div
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color.
      </div>
      <br />
      <Button>Hi</Button>
      <br />

      <SomeComponent></SomeComponent>
      <AnotherComponent></AnotherComponent>
      <br />
      
      <P>P Tag</P>
      <ArticleText>ArticleText p Tag</ArticleText>
    </>
  );
};

export default Emotion;
