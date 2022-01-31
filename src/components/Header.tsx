import Statistics from "./icons/Statistics";

interface Props {
  closeModal: boolean;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ closeModal, setCloseModal }: Props) => {
  return (
    <div className="flex items-center justify-start mb-6 border-b-2 w-[31rem] md:px-10 sm:w-full sm:mx-2 text-center py-2 ">
      <button className="" onClick={() => setCloseModal(false)}>
        <Statistics />
      </button>
      <h1 className="text-4xl w-full">كلمة</h1>
    </div>
  );
};

export default Header;
