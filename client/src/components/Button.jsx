const Button = ({ disabled, label, onSubmit }) => {
  return (
    <button
      className={`
        self-start
        px-4 
        py-2 
        mt-4 
        bg-blue-500  
        text-white 
        rounded 
        ${disabled ? "bg-gray-300 cursor-not-allowed" : "hover:bg-blue-600"}
        `}
      disabled={disabled}
      onClick={(e) => onSubmit(e)}
    >
      {label}
    </button>
  );
};

export default Button;
