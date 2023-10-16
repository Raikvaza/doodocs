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
          w-[800px] 
          bg-white
          h-[1124px]
          my-16
          mx-auto
          border 
          p-16
          border-[#90959D]
      "
    >
      <iframe srcDoc={fileContent} className="w-full h-full"></iframe>
    </div>
  );
}

export default TemplateFiller;
