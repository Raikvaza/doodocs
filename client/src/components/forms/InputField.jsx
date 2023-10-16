import React, { useState } from "react";

function InputField({ fieldData, onChange, onFocusChange, onFilled }) {
  const [invalidParams, setInvalidParams] = useState("");

  const handleFilled = (id, text, minLength, isNumeric) => {
    const isNumericCheck = (str) => /^[0-9]+$/.test(str);
    console.log(isNumericCheck(text));

    if (text.length >= minLength) {
      onFilled(id, true);
      setInvalidParams("");
    } else {
      onFilled(id, false);
      setInvalidParams(`Минимальная длинна поля ${minLength}`);
    }
    if (isNumeric && !isNumericCheck(text)) {
      console.log("asd");
      onFilled(id, false);
      setInvalidParams("Поле может содержать только цифры");
    }
    onFocusChange(null);
  };

  return (
    <div
      className="
        flex
        flex-col
        items-start
        self-stretch
        gap-[2px]
    "
    >
      <label
        className="
            text-[14px]
        "
      >
        {fieldData?.name}
      </label>
      <input
        type="text"
        required={fieldData?.is_required}
        maxLength={fieldData?.attrs?.has_max && fieldData?.attrs?.max}
        minLength={fieldData?.attrs?.has_min && fieldData?.attrs?.min}
        pattern={fieldData?.attrs?.numeric && "\\d+"}
        onChange={onChange}
        onFocus={() => onFocusChange(fieldData.id)}
        onBlur={(e) =>
          handleFilled(
            fieldData.id,
            e.target.value,
            e.target.minLength,
            fieldData?.attrs?.numeric
          )
        }
        className="
          border-[2px]
          outline-none
          focus:border-blue-darker
            focus:ring-2
            focus:ring-blue-light
          p-2
          rounded-[4px]
          w-full
        "
        style={{ borderColor: invalidParams ? "red" : "" }}
      />
      <div
        className="
           h-5
          text-[12px]
          text-red-500
        "
      >
        {invalidParams}
      </div>
    </div>
  );
}

export default InputField;
