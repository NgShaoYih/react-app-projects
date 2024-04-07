import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Edit from "./pages/Edit";
import Share from "./pages/Share";

// import { toneObject, toneTransport, tonePart } from "./data/instruments.js";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/share/:id" element={<Share />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

