import { atom, selector } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length; // todo 항목들의 총개수
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length; //완료된 todo 항목들의 총개수
    const totalUncompletedNum = totalNum - totalCompletedNum; // 완료되지 않은 todo 항목들의 총개수
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum; // 완료된 항목의 백분율

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
