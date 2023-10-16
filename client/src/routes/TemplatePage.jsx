import { useSelector } from "react-redux";
import InputField from "../components/forms/InputField";
import TemplateFiller from "../components/TemplateFiller";
import { useState } from "react";
import Appbar from "../components/Appbar";
const TemplatePage = () => {
  const templates = useSelector((state) => state.templates.data);
  const fields = useSelector((state) => state.fields.data);
  const [inputValues, setInputValues] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [filledFields, setFilledFields] = useState([]);

  const handleFilled = (itemId, isFilled) => {
    isFilled
      ? setFilledFields((prevFields) => [...prevFields, itemId])
      : setFilledFields((prevFields) =>
          prevFields.filter((item) => item !== itemId)
        );
  };
  const handleFocusField = (itemId) => {
    setFocusedField(itemId);
  };
  const handleInputChange = (id, value) => {
    setInputValues((prevVal) => ({
      ...prevVal,
      [id]: value,
    }));
  };
  return (
    // Root-box
    <div
      className="
        flex
        flex-row
        w-[100vw]
        "
    >
      {/* Left-container */}
      <div
        className="
            flex
            flex-col
            max-h-screen
            w-3/4
        "
      >
        {/* Left-container header */}
        <Appbar />
        {/* Left-container templates */}
        <div
          className="
                flex-1
                shrink-0
                h-full
                overflow-auto
                "
        >
          {templates.map((template, index) => {
            return (
              <TemplateFiller
                html={template}
                key={index}
                fields={fields}
                inputValues={inputValues}
                focusedField={focusedField}
                filledFields={filledFields}
              />
            );
          })}
        </div>
      </div>
      {/* Right-container fields */}
      <div
        className="
            w-1/4
            flex
            flex-col
            justify-start
            items-center
        "
      >
        {/* Right-Container header */}
        <div
          className="
                 pt-[32px]
                 px-[16px]
                 pb-[16px]
            "
        >
          <div
            className="
                text-[16px]
                font-semibold
                mb-1
            "
          >
            Пожалуйста, заполните данные
          </div>
          <div
            className="
                text-[12px]
                font-normal
            "
          >
            После заполнения и отправки формы будет создан документ с введенными
            данными.
          </div>
        </div>
        {/* Right-Container fields */}
        <div
          className="
                flex-1
                w-full 
                p-4
                flex
                flex-col
                items-center
                gap-4
            "
        >
          {fields.map((item) => (
            <InputField
              key={item.id}
              fieldData={item}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
              onFocusChange={handleFocusField}
              onFilled={handleFilled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
