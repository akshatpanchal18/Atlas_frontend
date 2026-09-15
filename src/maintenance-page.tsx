import MaintenanceImage from "./asset/maintenance_1.png";
const MaintenancePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <img src={MaintenanceImage} alt="Maintenance" className="mx-auto mb-8 w-72" />

        <h1 className="text-3xl font-bold tracking-tight">We’ll be right back</h1>

        <p className="mt-3 text-sm text-muted-foreground">We’re currently performing some maintenance. Please check back shortly.</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
