import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Loader from "./common/loader";

const Sections = lazy(() => import("./pages/sections"));
const RegisterForm = lazy(() => import("./components/forms/registerFrom"));
const DetailsPage = lazy(() => import("./pages/detailsPage"));
const Booking = lazy(() => import("./pages/Booking"));
const Home = lazy(() => import("./pages/homepage"));
const Vehiclesearch = lazy(() => import("./pages/searchform"));
const PDF = lazy(() => import("./pages/detailsPage/pdf"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Common route prefix /nos2 */}
            <Route index element={<Home />} /> {/* Default: /nos2 */}
          <Route path="/nos2">
            <Route path="/nos2/register" element={<Booking />} /> {/* /nos2/register */}
            <Route path="/nos2/pdf" element={<PDF />} /> {/* /nos2/pdf */}
            <Route path="billsearch" element={<Vehiclesearch />} /> {/* /nos2/billsearch */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
