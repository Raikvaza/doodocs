const Button = ({ disabled, label, onSubmit }) => {
  return (
    <button
      className={`
        self-start
        px-4 
        py-2 
        mt-4 
        rounded
        border
        ${
          disabled
            ? "bg-gray-background border-gray-border cursor-not-allowed text-disabled-text"
            : "bg-button-base text-white active:bg-button-active hover:bg-button-hover"
        }
        `}
      disabled={disabled}
      onClick={(e) => onSubmit(e)}
    >
      {label}
    </button>
  );
};

export default Button;
