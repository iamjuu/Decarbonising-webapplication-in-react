import React, { lazy, Suspense } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer'
import './App.css';
const Sections = lazy(() => import('./components/sections')); 
import Loader from './common/loader';

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Sections />
      </Suspense>
      <Footer/>
    </>
  );
}

export default App;
