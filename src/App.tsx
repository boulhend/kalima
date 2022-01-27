import React from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keybord";
function App() {
  return (
    <div className="w-1/2 mx-auto mt-16 flex flex-col items-center justify-center pb-10">
      <Board />
    </div>
  );
}

export default App;
