const UploaderButton = ({ label, onClickHandler }) => {
  return (
    <button
      className={`
      px-4 
      py-2
      rounded
      border
      z-50
      hover:cursor-pointer
      bg-white
      border-gray-border
      text-gray-700
      `}
      onClick={() => onClickHandler()}
    >
      {label}
    </button>
  );
};

export default UploaderButton;
