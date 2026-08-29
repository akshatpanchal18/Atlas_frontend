import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/routes";

const App = () => {
  return <RouterProvider router={appRoutes} />;
};

export default App;
