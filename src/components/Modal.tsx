import { useState, useEffect } from "react";
import Close from "./icons/Close";

const Modal = () => {
  const [close, setClose] = useState<boolean>(false);
  const [dsiplay, setDisplay] = useState<string>("flex");
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClose(true);
  };
  useEffect(() => {
    if (close) {
      setTimeout(() => {
        setDisplay("hidden");
      }, 180);
    }
  }, [close]);

  return (
    <>
      <div
        className={`${
          close ? "hidden" : "flex"
        }  flex-nowrap justify-center items-center absolute p-0 m-0 top-0 right-0 w-screen h-screen bg-white/70 z-30`}
      ></div>
      <div
        className={` z-50 absolute ${dsiplay} flex-col w-1/3 h-2/3 bg-white drop-shadow-2xl p-3 ${
          close ? " animate-slideOut" : "animate-slideIn"
        }`}
      >
        <div className="cursor-pointer" onClick={handleClick}>
          <Close />
        </div>
        <div className="w-100">Content</div>
      </div>
    </>
  );
};

export default Modal;
