import { createRoot } from "react-dom/client"

import Router from "./routing/router"
import "./styles/auth/auth.css"
import "./styles/index/index.css"

const app = createRoot(document.getElementById("root"))
app.render(
    <Router />
)