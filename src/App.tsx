import React from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import Modal from "./components/Modal";
function App() {
  return (
    <div className="w-1/2 mx-auto flex flex-col items-center justify-center pb-10">
      <Header />
      <Game />
      <Modal />
    </div>
  );
}

export default App;
