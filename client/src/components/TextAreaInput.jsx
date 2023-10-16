const TextAreaInput = ({ onFieldsChanged }) => {
  return (
    <textarea
      type="text"
      className="
        w-full
        border
      border-[#333333]
        my-[24px]
        mx-0
        h-[400px]
      "
      onChange={(e) => onFieldsChanged(e.target.value)}
    />
  );
};

export default TextAreaInput;
