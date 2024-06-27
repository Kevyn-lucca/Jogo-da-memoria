import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GetData from "./CreateItem";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GetData difficulty={"35"} />
	</React.StrictMode>
);
