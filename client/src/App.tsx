import "./App.css";
import Uploader from "./components/uploader/uploader";
function App() {
  const handleFileSelected = (file: File) => {
    console.log("Selected file:", file.name);
  };
  return (
    <>
      <Uploader onFileSelected={handleFileSelected} />
    </>
  );
}

export default App;
