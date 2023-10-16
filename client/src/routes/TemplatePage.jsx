import { useSelector } from "react-redux";
import InputField from "../components/forms/InputField";
import TemplateFiller from "../components/TemplateFiller";
import { useState } from "react";
const TemplatePage = () => {
  const templates = useSelector((state) => state.templates.data);
  const fields = useSelector((state) => state.fields.data);
  const [inputValues, setInputValues] = useState({});
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
        bg-red-400
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
            bg-blue-200
        "
      >
        {/* Left-container header */}
        <div
          className="
                bg-green-400
                flex-0
                shrink-1
                basis-[40px]
            "
        >
          Appbar
        </div>
        {/* Left-container templates */}
        <div
          className="
                flex-1
                shrink-0
                h-full
                bg-red-200
                overflow-auto
                "
        >
          {templates.map((template) => {
            return (
              <>
                <TemplateFiller
                  html={template}
                  fields={fields}
                  inputValues={inputValues}
                />
              </>
            );
          })}
        </div>
      </div>
      {/* Right-container fields */}
      <div
        className="
            bg-green-200
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
