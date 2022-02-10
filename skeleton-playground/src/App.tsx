import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import Skeleton from './components/Skeleton';


// 스켈레톤 UI
const Placeholder: React.FC = () => ( // <Item /> 에 대응하는 Placeholder 제작
  <Container>
    <ImageWrapper>
      <Skeleton  height={220} />
    </ImageWrapper>
    <Info>
      {/* Title */}
      <Skeleton width={150} height={29} rounded />  
      <div style={{ height: '8px' }} />
      {/* Description */}
      <Skeleton width={200} height={19} rounded />
    </Info>
  </Container>
)

const Item: React.FC = () => ( // 실제 보여줄 컨텐츠
  <Container>
    <ImageWrapper>
      {/* 더미데이터  */}
      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqiN6h4EBIKut_XAn4KxgJKNNrY8LcFZq7Q&usqp=CAU" />
    </ImageWrapper>
      <Info>
        <Title>제목입니다.</Title>
        <Description>신이난다 신이나~신이난다 신이나~</Description>
      </Info>
  </Container>
)

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { 
    // 임의로 로딩 상태 표현
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <Base>
      {
        loading ?  Array.from({ length: 25 }).map((_, idx) => (
          <Placeholder key={idx} />
        )) : Array.from({ length: 25 }).map((_, idx) => (
          <Item key={idx} />
        ))
      }
    </Base>
  );
}
const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr); // 1열에 5개 
  column-gap: 12px;   // column 간격 
  row-gap: 24px;  // row 간격 
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 16px;
`;
export default App;
