import { createRoot } from "react-dom/client";
import { App } from "@/components/app";

import "./index.scss";

const APP_ID = "root";

createRoot(document.getElementById(APP_ID)!).render(<App />);
