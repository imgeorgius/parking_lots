import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/components/Layout";
import { AppRoutes } from "@/components/app/AppRoutes";

type AppSwitchProps = {
  appRoutes?: typeof AppRoutes;
};

const AppSwitch: React.FC<AppSwitchProps> = ({ appRoutes = AppRoutes }) => (
  <Router>
    <Routes>
      {appRoutes.map((appRoute) => (
        <Route
          path={appRoute.path}
          key={appRoute.path}
          element={<Layout Component={appRoute.page} />}
        />
      ))}
    </Routes>
  </Router>
);

export default AppSwitch;
