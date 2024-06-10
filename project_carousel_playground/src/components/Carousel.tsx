import React,{useEffect, useState} from 'react';
import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';
import {RiArrowDropLeftLine,RiArrowDropRightLine} from "react-icons/ri";


//컴포넌트 스타일링
const Base = styled.div``;
const Container = styled.div`
  position : relative;
`;
const ArrowBtn = styled.button<{ pos: 'left' | 'right'}>`
  position: absolute;
  top: 50%;
  z-index: 1;
  padding: 8px 12px;
  font-size: 48px;
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  border: none;
  margin: 0;
  cursor: pointer;
  ${({ pos }) => pos === 'left' ? 
          css`
            left: 0;
          ` : 
          css`
            right: 0;
          `};
`;
const CarouselList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
`;

const CarouselListItem = styled.li<{ activeIndex: number }>`
  width: 100%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 200ms ease;
  > img {
    width: 100%;
    height: fit-content;
  }
`;

const NavBtn = styled.button<{ isActive?: boolean }>`
  width: 4px;
  height: 4px;
  background-color: #000;
  opacity: ${({ isActive }) => isActive ? 0.3 : 0.1};
`;

const NavItem = styled.li`
  display: inline-block;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  ${NavItem} + ${NavItem} {
    margin-left: 4px;
  }
`;

//더미 데이터
const banners = [
  'https://via.placeholder.com/600/92c952',
  'https://via.placeholder.com/600/771796', 
  'https://via.placeholder.com/600/24f355'
];


const Carousel:React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused,setIsFocused] = useState<boolean>(false);
  
  //화살표 슬라이드(다음,이전,선택 idx)
  const handleNext =()=>{
    setActiveIndex(prev => (prev + 1) % banners.length); 
  }
  const handlePrev =()=>{
    setActiveIndex(prev => (prev - 1 + banners.length)% banners.length); 
  }
  const goTo=(idx:number)=>{
    setActiveIndex(idx)
  }

  //포커스 
  const handleMouseEnter=()=> setIsFocused(true);
  const handleMouseLeave=()=> setIsFocused(false);  

  //autoPlay 
  useEffect(()=>{
    let intervalId:NodeJS.Timeout;

    if(!isFocused){
      intervalId = setInterval(handleNext, 2000);
    }  
    return ()=>{
      clearInterval(intervalId)
    }
  },[isFocused]);
  

  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Container>
        <ArrowBtn pos="left" onClick={handlePrev}>
          <RiArrowDropLeftLine/>
        </ArrowBtn >
        <CarouselList>
          {
            banners.map((url,idx) => (
              <CarouselListItem activeIndex={activeIndex} key={idx} >
                <img src={url} alt="banner"/>
              </CarouselListItem>
            ))
          }
        </CarouselList>
        <ArrowBtn pos="right" onClick={handleNext}>
          <RiArrowDropRightLine/>
        </ArrowBtn>
      </Container>
      <Nav>
        {
          Array.from({length:banners.length}).map((_,idx)=>(
            <NavItem key={idx}>
              <NavBtn isActive={activeIndex === idx} onClick={()=> goTo(idx)}/>
            </NavItem>
          ))
        }
      </Nav>
    </Base>
  );
};

export default Carousel;