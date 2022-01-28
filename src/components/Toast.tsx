import { useEffect } from "react";

interface Props {
  toastData: Array<any>;
  setToastData: React.Dispatch<React.SetStateAction<any[]>>;
}

const Toast = ({ toastData, setToastData }: Props) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toastData.length > 0) {
      timer = setTimeout(() => {
        setToastData((state) => {
          const newData = [...state];
          newData.pop();
          return newData;
        });
      }, 900 / toastData.length);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [toastData, setToastData]);
  return (
    <div className="absolute top-[5.3rem]">
      {toastData
        ? toastData.map((toast: string, index: number) => (
            <div
              key={index}
              className="flex justify-center items-center w-auto px-2 h-12 rounded-md  bg-black text-white mb-5"
            >
              {toast}
            </div>
          ))
        : null}
    </div>
  );
};

export default Toast;
