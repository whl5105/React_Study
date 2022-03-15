import axios from "axios";
import React from "react";
import { atom, selector, useRecoilState, useRecoilValue ,selectorFamily, useRecoilValueLoadable} from "recoil";
import ErrorBoundary from "./ErrorBoundary";

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

//임시 테이블 
const tableOfUsers = [{name:"suin"}, {name:"inin"}];

//동기 
// const currentUserNameState = selector({
//   key: 'CurrentUserName',
//   get: ({get}) => {
//     return tableOfUsers[get(currentUserIDState)].name;
//   },
// });

//비동기
// const currentUserNameQuery = selector({
//   key: 'CurrentUserName',
//   get: async ({get}) => {
//     const response = await axios.get(`/api/user-name?id=${get(currentUserIDState)}`);
//     return response.data.name;
//   },
// });


//selectorFamily
const currentUserNameQuery = selectorFamily({
  key: 'CurrentUserName',
  get:(id)=> async () => {
    const response = await axios.get(`/api/user-name?id=${id}`);
    return response.data.name;
  },
});

// Error Handling (에러 처리하기)
function CurrentUser() {
    // const userName = useRecoilValue(currentUserNameState); //currentUserNameState
    // const [id,setId] = useRecoilState(currentUserIDState);
    // const userName = useRecoilValue(currentUserNameQuery); //currentUserNameQuery
    // const userName = useRecoilValue(currentUserNameQuery(1)); // selectorFamily

    //ErrorBoundary.Suspense 없이 에러 처리하기 
    const userName = useRecoilValueLoadable(currentUserNameQuery(1)); //useRecoilValueLoadable
    if(userName.state === 'loading'){
      return <div>Loading...</div>
    }
    if(userName.state === 'hasError'){
      return <div>Something wrong...</div>
    }
    
    return (
      <div>
      {userName.contents}
      {/* {userName} */}
      {/* <input 
      type="text" 
      value={id} 
      onChange={(e)=>{
        setId(e.target.value);
      }} /> */}
    </div>
    )
}

//Queries with Parameters (매개변수가 있는 쿼리)
export default function CurrentUserInfo() {
    return(
      // Error Handling (에러 처리하기)
      // <ErrorBoundary>
      //   <React.Suspense fallback={<div>Loading...</div>}>
      //     <CurrentUser />
      //   </React.Suspense>
      // </ErrorBoundary> 
      <>
        <CurrentUser />
      </>
    
        
    );
}

