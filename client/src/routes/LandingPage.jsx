import Uploader from "../components/Uploader";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../features/templates/templateSlice";
import { setFields } from "../features/fields/fieldsSlice";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../components/TextAreaInput";

const Landing = () => {
  const templates = useSelector((state) => state.templates.data[0]);
  const fields = useSelector((state) => state.fields.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFileSelected = (file) => {
    dispatch(uploadFile(file));
    // console.log("Selected file:", file.name);
  };
  const handleNewFields = (newFields) => {
    dispatch(setFields(newFields));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(templates);
    console.log(fields);
    if (templates && fields) {
      navigate("/template-filler");
    }
  };

  return (
    <div
      className="
        w-[800px]
      "
    >
      <div
        className="
            flex
            flex-col
            justify-center
            items-center
            gap-[24px]
          "
      >
        <Uploader onFileSelected={handleFileSelected} />
        <TextAreaInput onFieldsChanged={handleNewFields} />
        <Button
          label="Далее"
          onSubmit={handleSubmit}
          disabled={!(templates && fields)}
        />
      </div>
    </div>
  );
};

export default Landing;
