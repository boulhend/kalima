import { useState } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import Modal from "./components/Modal";
function App() {
  const [wordColors, setWordColors] = useState<Array<any>>([]);
  const [closeModal, setCloseModal] = useState<boolean>(true);
  const [gameResult, setGameResult] = useState<string>("idle");

  return (
    <div className="w-1/2 xl:w-2/3 md:w-full relative mx-auto flex flex-col items-center justify-center pb-10 min-h-full">
      <Header closeModal={closeModal} setCloseModal={setCloseModal} />
      <Game wordColors={wordColors} setWordColors={setWordColors} setCloseModal={setCloseModal} setGameResult={setGameResult} />
      <Modal gameResult={gameResult} data={wordColors} closeModal={closeModal} setCloseModal={setCloseModal} />
    </div>
  );
}

export default App;
