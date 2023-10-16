import React, { useState } from "react";
import { useSelector } from "react-redux";
import UploaderButton from "../buttons/UploaderButton";
import { useDispatch } from "react-redux";
import { deleteLatestFile } from "../../features/templates/templateSlice";
const Uploader = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const status = useSelector((state) => state.templates.status);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteLatestFile());
    setFileName("");
  };

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
      const filesArray = Array.from(e.dataTransfer.files);
      setFileName(filesArray[0].name);
      onFilesSelected(filesArray);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setFileName(filesArray[0].name);
      onFilesSelected(filesArray);
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
        gap-[8px]
        w-[800px] 
        rounded-lg 
        relative 
        cursor-pointer 
        ${isDragging ? "border-blue-darker" : "border-gray-300"}`}
    >
      {/* Uploader-Icon */}

      {/* Uploader-input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx,.rtf,.html"
        multiple
        className="absolute top-0 left-0 opacity-0 w-full h-full"
        onChange={handleFileChange}
      />
      {/* Uploader-text */}
      {status === "pending" && (
        <>
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
          <div className="flex flex-row items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p>Файл загружается</p>
          </div>
          <UploaderButton label="Отменить" />
        </>
      )}
      {status === "idle" && (
        <>
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
          <div className="text-center">
            <p className="text-[14px] mb-2">
              Выберите файл или перенесите его сюда
            </p>
            <p className="text-[12px] text-[#6B6F76">
              Можно выбрать несколько файлов: pdf, doc, docx, rtf
            </p>
          </div>
        </>
      )}
      {status === "succeeded" && (
        <div
          className="
            flex
            w-full
            flex-col
            justify-evenly
            items-center
            gap-2
          "
        >
          <div>
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>

          <p className="text-[14px] mb-2">{fileName}</p>

          <UploaderButton label="Удалить" onClickHandler={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default Uploader;
