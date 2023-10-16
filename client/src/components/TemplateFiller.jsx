import { useEffect, useState } from "react";

function TemplateFiller({ html }) {
  const [fileContent, setFileContent] = useState("");
  useEffect(() => {
    if (html && html.type === "text/html") {
      const reader = new FileReader();

      reader.onload = (event) => {
        setFileContent(event.target.result);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsText(html);
    }
  }, [html]);
  return (
    <div
      className="
        flex
        flex-col
        h-full
        items-center
        justify-center
        pt-[64px]
        bg-red-200
      "
    >
      <div
        className="
          w-[800px] 
          h-[1124px]
          border
          border-[#90959D]
      "
      >
        <iframe srcDoc={fileContent} className="w-full h-full"></iframe>
      </div>
    </div>
  );
}

export default TemplateFiller;
