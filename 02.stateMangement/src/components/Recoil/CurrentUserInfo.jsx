import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
// import axios from "axios";
import ErrorBoundary from "./ErrorBoundary";

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

const tableOfUsers = [{name:"suin"}, {name:"inin"}];

//동기 
const currentUserNameState = selector({
  key: 'CurrentUserName',
  get: ({get}) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

//비동기
// const currentUserNameQuery = selector({
//   key: 'CurrentUserName',
//   get: async ({get}) => {
//     const response = await axios.get(`/api/user-name?id=${get(currentUserIDState)}`)
//     return response.data.name;
//   },
// });

// Error Handling (에러 처리하기)
function CurrentUser() {
    const userName = useRecoilValue(currentUserNameState);
    // const userName = useRecoilValue(currentUserNameQuery);
    const [id,setId] = useRecoilState(currentUserIDState);
    return (
      <div>
      {userName}
      <input 
      type="text" 
      value={id} 
      onChange={(e)=>{
        setId(e.target.value);
      }} />
    </div>
    )
}

//Queries with Parameters (매개변수가 있는 쿼리)

export default function CurrentUserInfo() {
    return(
      // Error Handling (에러 처리하기)
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUser />
        </React.Suspense>
      </ErrorBoundary>
    )
}

