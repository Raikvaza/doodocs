import React from "react";

function InputField({ fieldData, onChange }) {
  return (
    <div className="w-full">
      <label
        className="
            text-[14px]
        "
      >
        {fieldData.name}
      </label>
      <input
        type="text"
        required={fieldData.is_required}
        maxLength={fieldData.attrs.has_max && fieldData.attrs.max}
        minLength={fieldData.attrs.has_min && fieldData.attrs.min}
        pattern={fieldData.attrs.numeric && "\\d+"}
        onChange={onChange}
        className="border p-2 w-full"
      />
    </div>
  );
}

export default InputField;
