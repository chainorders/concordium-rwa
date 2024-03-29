import React from "react";
import ReactDOM from "react-dom/client";
import App from "./AppUser.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/styles";
import theme from "./Theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
