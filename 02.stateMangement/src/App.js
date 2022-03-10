import "./App.css";

import { RecoilRoot } from "recoil";
import FontButton from "./components/Recoil/FontButton";
import Text from "./components/Recoil/Text";
import CharacterCounter from "./components/Recoil/CharacterCounter";
import TodoList from "./components/Recoil/Todo/TodoList";
import CurrentUserInfo from "./components/Recoil/CurrentUserInfo";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <FontButton />
        <Text />
        <CharacterCounter />
        <hr />
        <h1>TodoList</h1>
        <TodoList />
        <CurrentUserInfo />
      </RecoilRoot>
    </div>
  );
}

export default App;
