import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import './App.css';
import Loader from './common/loader';
const Sections = lazy(() => import('./pages/sections'));
const RegisterForm = lazy(() => import('./components/forms/registerFrom')); 
import Contact from './pages/contact'
import About from './pages/about'
import DetailsPage from './pages/detailsPage'
import Booking from "./pages/Booking"
import Home from "./pages/homepage"
import Vehiclesearch from "./pages/searchform"
import PDF from "./pages/detailsPage/pdf"
function App() {

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
        
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Booking />} />
          <Route path ="/pdf" element ={<PDF/>}/>
          {/* <Route path="/vehicle-details" element={<DetailsPage/>} />
    <Route path ="/home" element ={}/> */}

          <Route path="/billsearch" element={<Vehiclesearch  />} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>



        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
