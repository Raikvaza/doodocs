// Folder for api and loader calls
import store from "../app/store";
import {
  setTemplate,
  setTemplateStatus,
} from "../features/templates/templateSlice";
import { setFields } from "../features/fields/fieldsSlice";
export async function landingLoader() {
  store.dispatch(setTemplate([]));
  store.dispatch(setFields(""));
  store.dispatch(setTemplateStatus("idle"));
  return null;
}
