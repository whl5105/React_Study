import React, { useState } from 'react'

const Item = ({name , age}) => {
  return(
    <li>
      name : {name} / age : {age}
    </li>
  )
}

const url = "https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json?id=React";
const url2 = "/login";

export default function TestMocking() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  if(err){
    return <p>{err}</p>;
  }

  const handleClick = () =>{  
    fetch(url)
      .then((res)=>{
        return res.json();
    })
    .then((json)=>{
      if(json.errorMessage){
        throw new Error(json.errorMessage);
      }
      setData(json.data);
    })
    .catch((err)=>{
      setErr(`Somthing Wrong : ${err}`);
    })
  }
  const handleClick2 = () =>{  
    fetch(url2)
      .then((res)=>{
        return res.json();
    })
    .then((json)=>{
      console.log(JSON.stringify(json))
    })
    .catch((err)=>{
      setErr("err발생");
    })
  }

  return (
    <div>
      <button onClick={handleClick}>데이터 가져오기</button>
      <button onClick={handleClick2}>데이터 가져오기</button>
      {
        data && (
          <ul>
            {data.people.map((person) => (
              <Item key={`${person.name}-${person.age} `} name={person.name} age={person.age}/>
            ))}
          </ul>
        )
      }
    </div>
  )
}
