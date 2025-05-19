import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from './admin/js/admin';
import Home from './client/js/home';
import Detail from './client/js/detail';
import Video from './client/js/video';
import PhimListStyle from './client/js/phimliststyle';
import PhimListType from './client/js/phimlisttype';
import PhimListNation from './client/js/phimlistnation';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/film/:slug" element={<Detail />} />
        <Route path="/film/:movieName/:episodes" element={<Video />} />
        <Route path="/danh-sach/:nameStyle" element={<PhimListStyle />} />
        <Route path="/the-loai/:nameType" element={<PhimListType />} />
        <Route path="/quoc-gia/:nameNaion" element={<PhimListNation />} />

        </Routes>
    </Router>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();

