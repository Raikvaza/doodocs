import { useEffect, useState } from "react";

function TemplateFiller({
  html,
  fields,
  inputValues,
  focusedField,
  filledFields,
}) {
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const styleElement = doc.createElement("style");
    styleElement.textContent = `
      .interactiveField {
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; 
        background-color: #CFD2FF;
        transition: background-color 0.3s ease;
      }
      .interactiveField:hover {
        background-color: #DFE1FF;
      }
      .interactiveField.filled {
        background-color: #FFFFFF;
        border: 1px solid #9499E8;
      }
      .interactiveField.active {
        background-color: #0085FF;
        color: #FFFFFF;
      }
    `;
    doc.head.appendChild(styleElement);
    fields &&
      fields.map((field) => {
        const elements = doc.querySelectorAll(`[class="${field.id}"]`);
        elements &&
          elements.forEach((element) => {
            element.textContent = inputValues[field.id] || field.name;
            element.classList.add("interactiveField");
            if (filledFields.includes(field.id)) {
              element.classList.add("filled");
              element.classList.remove("active");
            } else {
              if (field.id === focusedField) {
                element.classList.add("active");
              } else {
                element.classList.remove("active");
              }
            }
          });
      });

    const serializer = new XMLSerializer();
    const updatedHtml = serializer.serializeToString(doc);

    setFileContent(updatedHtml);
  }, [html, fields, inputValues, focusedField]);
  return (
    <div
      className="
          w-[800px] 
          bg-white
          h-[1124px]
          my-16
          mx-auto
          border
          border-[#EDEDEC]
          shadow-sm
          p-16
      "
    >
      <iframe srcDoc={fileContent} className="w-full h-full"></iframe>
    </div>
  );
}

export default TemplateFiller;
