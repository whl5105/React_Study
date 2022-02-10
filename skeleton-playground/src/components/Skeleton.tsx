import React ,{useMemo} from 'react';
import styled from "@emotion/styled/macro";
import {keyframes , css} from "@emotion/react";


interface Props {
  width?:number;
  height?:number;
  circle?:boolean;  //원형 스켈레톤
  rounded?:boolean; //모서리 
  unit?:string;     //px or % 단위 
  animation?:boolean; //애니메이션 유무
  color?:string;      
  style?:React.CSSProperties; //스켈레톤의 추가적인 스타일객체
}


const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
`;

const Base = styled.span<Props>`
  ${({color}) => color && `background-color: ${color}`};
  ${({rounded}) => rounded && `border-radius: 8px`};
  ${({circle}) => circle && `border-radius: 50%`};
  ${({width, height}) => (width || height) && `display: block`};
  ${({animation}) => animation && pulseAnimation};
  width : ${({width, unit}) => width && unit && `${width}${unit}`};
  height : ${({height, unit}) => height && unit && `${height}${unit}`};
`;
const Content = styled.span`
  opacity: 0;
`;


const Skeleton: React.FC<Props> = ({
  animation = true,
  children,
  width,
  height,
  circle,
  rounded,
  unit = 'px',
  color = '#F4F4F4',
  style,
}) => {

  const styles ={
    style:style,
    rounded:rounded,
    circle:circle,
    width:width,
    height:height,
    animation:animation,
    unit:unit,
    color:color,
  }

  return (
    <Base {...styles}>
      <Content></Content>
    </Base>
  );
};

export default Skeleton;