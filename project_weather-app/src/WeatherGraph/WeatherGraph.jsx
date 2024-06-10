import React, { useContext } from "react";
import { LabelList, Line, LineChart, XAxis } from "recharts";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";

// Import Swiper 
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const formatXAxis = (data) => `${new Date(data * 1000).getHours()}시`;
//라인 그래프 dot(날씨 이미지)
const CustomizedDot = ({ payload, cx, cy }) => (
  <CurrentWeatherIcon
    weatherState={payload.weather}
    x={cx - 13}
    y={cy - 5}
    fontSize={30}
  />
);
// 라인그래프 온도 
const CustomizedLabel = ({ x, y, value }) => (
  <text x={x} y={y} dy={-4} fontSize={15} textAnchor="middle">
    {value}°
  </text>
);

// 날씨 그래프
function LineGraph({ num }) {
  const { hourly } = useContext(WeatherContext);
  return (
    <LineChart
      width={960}
      height={200}
      data={hourly
        ?.slice(num * 12, (num + 1) * 12)
        .map(({ dt, temp, weather }) => ({
          dt,
          temp,
          weather: weather[0].main,
        }))}
      margin={{
        top: 30,
        right: 30,
        left: 30,
        bottom: 10,
      }}
    >
      <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis} />
      <Line
        dataKey="temp"
        stroke="#3cb371"
        strokeWidth={2}
        dot={<CustomizedDot />}
        isAnimationActive={false}
      >
        <LabelList content={<CustomizedLabel />} />
      </Line>
    </LineChart>
  );
}

function WeatherGraph() {
  const slides = [];

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <LineGraph num={i} />
      </SwiperSlide>
    );
  }
  return (
    <Swiper navigation={true} modules={[Navigation]}>
      {slides}
    </Swiper>
  );
}

export default WeatherGraph;