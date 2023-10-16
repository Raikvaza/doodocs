import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex-0
        shrink-1
        basis-[40px] 
        py-2 
        px-4
        flex
        flex-row 
        gap-3
        justify-start
        items-center
    "
    >
      <div
        className="
         content-logo
         hover:cursor-pointer
      "
        onClick={() => navigate("/")}
      />
      <p
        className="
            text-[#3C4149]
            text-[14px]
        "
      >
        Название Документа
      </p>
    </div>
  );
};

export default Appbar;
