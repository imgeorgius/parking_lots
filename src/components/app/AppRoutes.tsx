import * as AppPages from "./AppPages";
import { Routes } from "@/constants/Routes";

type AppRoute = {
  path: (typeof Routes)[keyof typeof Routes];
  page: React.ElementType;
};

const AppRoutes: AppRoute[] = [
  {
    path: Routes.HOME,
    page: AppPages.HomePage,
  },
  {
    path: Routes.SUMMARY,
    page: AppPages.SummaryPage,
  },
];

export { AppRoutes };
