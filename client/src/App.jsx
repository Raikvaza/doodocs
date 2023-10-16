import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./routes/LandingPage";
import TemplatePage from "./routes/TemplatePage";
import { landingLoader } from "./services/api";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Landing />} loader={landingLoader} />
        <Route path="template-filler" element={<TemplatePage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
