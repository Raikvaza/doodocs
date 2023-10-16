import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./routes/LandingPage";
import TemplatePage from "./routes/TemplatePage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Landing />} />
        <Route path="template-filler" element={<TemplatePage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
