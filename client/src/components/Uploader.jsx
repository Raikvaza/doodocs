import React, { useState } from "react";

const Uploader = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  // const dispatch = useDispatch();
  // const status = useSelector((state) => state.sample.status);
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // dispatch(convertFileAsync(e.dataTransfer.files[0]));
      onFileSelected(e.target.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        flex 
        flex-col 
        justify-center 
        items-center 
        border-[2px] 
        border-dashed 
        py-[32px] 
        px-[24px] 
        w-[800px] 
        rounded-lg 
        relative 
        cursor-pointer 
        ${isDragging ? "border-blue-400" : "border-gray-300"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.rtf,.html"
        multiple
        className="absolute top-0 left-0 opacity-0 w-full h-full"
        onChange={handleFileChange}
      />
      <div className="text-center">
        <p className="text-[14px] mb-2">
          Выберите файл или перенесите его сюда
        </p>
        <p className="text-[12px] text-[#6B6F76] text-gray-600">
          Можно выбрать несколько файлов: pdf, doc, docx, rtf
        </p>
      </div>
    </div>
  );
};

export default Uploader;
