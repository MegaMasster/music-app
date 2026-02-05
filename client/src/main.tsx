import { createRoot } from "react-dom/client"

import Router from "./routing/router"
import "./styles/auth/auth.css"
import "./styles/index/index.css"

const rootElement = document.getElementById("root") 

if (!rootElement) {
    throw new Error("Failed to find the root element");
}

const app = createRoot(rootElement)

app.render (
    <Router />
)