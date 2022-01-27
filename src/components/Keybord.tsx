import { lettersList } from "../data/letters-list";

const Keyboard = () => {
  return (
    <div className="flex justify-center flex-wrap my-10 w-[600px] h-[198px]">
      {lettersList.map((letter) => (
        <button
          key={letter}
          className={`cursor-pointer flex justify-center items-center  ${
            letter === "Enter" || letter === "Backspace" ? "w-40" : "w-14"
          } h-14 rounded-md bg-gray-300 text-black text-lg font-bold m-1`}
          onClick={(event) =>
            console.log((event.target as HTMLInputElement).value)
          }
          value={letter}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
