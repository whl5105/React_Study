import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { todoListState , filteredTodoListState } from './TodoStore';

import TodoListStats from './TodoListStats';
import TodoListFilters from './TodoListFilters';
import TodoListCreator from './TodoListCreator';
import TodoItem  from './TodoItem';


export default function TodoList() {
  // const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);

  useEffect(()=>{
    console.log(`todoList : ${JSON.stringify(todoList)}`)
  },[todoList]);


  return (
    <div>
      <TodoListStats />
      <TodoListFilters />
      <TodoListCreator />
        {
          todoList.map(item =>(
            <TodoItem key={item.id} item={item} />
          ))
        }
    </div>
  )
}
