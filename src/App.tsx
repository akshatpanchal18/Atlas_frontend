import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/routes";
import AppInitialize from "./app-init";

const App = () => {
  return (
    <AppInitialize>
      <RouterProvider router={appRoutes} />
    </AppInitialize>
  );
};

export default App;
