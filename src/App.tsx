import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/routes";
import AppInitialize from "./app-init";
import { ToastProvider } from "./components/ui/toast";
import MaintenancePage from "./maintenance-page";

const App = () => {
  const isMaintenance = import.meta.env.VITE_ENV === "maintenance";
  if (isMaintenance) {
    return <MaintenancePage />;
  }
  return (
    <AppInitialize>
      <RouterProvider router={appRoutes} />
      <ToastProvider />
    </AppInitialize>
  );
};

export default App;
