import React, { useState, useEffect, } from "react";
import { useNavigate } from 'react-router-dom'
import VIDEO_URL from "./../assets/video/videoplayback.mp4";
import axios from "./../Instance/Instance"

const VehicleSearch = () => {
  const [vehicleNo, setVehicleNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState({ vehicle: "", mobile: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
const navigate =useNavigate()
  useEffect(() => {
    const video = document.getElementById("backgroundVideo");
    if (video) {
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const handleVehicleInput = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z0-9 ]*$/.test(value)) {
      setVehicleNo(value);
      setError((prev) => ({ ...prev, vehicle: "" }));
    } else {
      setError((prev) => ({ ...prev, vehicle: "Only letters and numbers allowed" }));
    }
  };

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobileNo(value);
      setError((prev) => ({
        ...prev,
        mobile: value.length !== 10 && value.length ? "Mobile number must be 10 digits" : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post('/findbills', { 
        vehicleNo,mobileNo
      });
  
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClear = () => {
    setVehicleNo("");
    setMobileNo("");
    setSearchResults([]);
    setError({ vehicle: "", mobile: "" });
  };

  const handleViewDetails = (invoiceData) => {
    navigate("/pdf", { state: { invoiceData } });
  };
  return (
    <div className="min-h-screen relative bg-black">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40  z-10" />
        <video
          id="backgroundVideo"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute top-0 left-0 min-w-full min-h-full object-cover ${
            videoLoaded ? "opacity-40" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        <div
          className={`flex flex-col md:flex-row items-center ${
            searchResults.length > 0 ? "justify-start" : "justify-center"
          } space-y-8 md:space-y-0 md:space-x-8 transition-all duration-500`}
        >
          {/* Form */}
          <div
            className={`w-full md:w-1/3 bg-black/40 backdrop-blur-sm p-8 rounded-xl border-2 border-red-100 shadow-2xl ${
              searchResults.length > 0 ? "md:h-auto" : "h-[450px]"
            } transition-all duration-500`}
          >
            <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
              Search Previous Bills
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="vehicleNo" className="block text-lg font-medium text-white mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleNo"
                  value={vehicleNo}
                  onChange={handleVehicleInput}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-black border-2 border-red-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-500"
                  placeholder="Enter vehicle number"
                  required
                />
                {error.vehicle && <p className="mt-1 text-sm text-red-400 font-semibold">{error.vehicle}</p>}
              </div>

              <div>
                <label htmlFor="mobileNo" className="block text-lg font-medium text-white mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNo"
                  value={mobileNo}
                  onChange={handleMobileInput}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-black border-2 border-red-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-500"
                  placeholder="Enter 10-digit mobile number"
                  required
                />
                {error.mobile && <p className="mt-1 text-sm text-red-400 font-semibold">{error.mobile}</p>}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={!!error.mobile || !!error.vehicle || !vehicleNo || mobileNo.length !== 10 || isLoading}
                  className="bg-gradient-to-r from-red-700 to-red-900 text-white py-4 px-6 rounded-lg hover:from-red-800 hover:to-red-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg"
                >
                  {isLoading ? "Searching..." : "Search Bills"}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-gray-600 text-white py-4 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 font-bold text-lg shadow-lg"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Results */}
          {searchResults.length > 0 && (
            <div className="w-full md:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
                Previous Bills
              </h2>
              {searchResults.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-black/80 backdrop-blur-sm border-2 border-red-600 rounded-lg p-4 hover:border-white transition-all duration-300 shadow-md transform hover:-translate-y-1 text-sm"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <p className="text-white">Vehicle: {bill.vehicleNumber}</p>
                      <p className="text-gray-300">
  Date: {new Date(bill.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
</p>
                      <p className="text-white font-bold">Amount: ₹{bill.totalAmount}</p>
                      
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-4 py-1 rounded-full font-bold ${
                          bill.servicestatus === "Serviced"
                            ? "bg-green-900/80 text-white border border-green-500"
                            : "bg-yellow-900/80 text-white border border-yellow-500"
                        }`}
                      >
                        {bill.servicestatus}
                      </span>
                      <button
                        onClick={() => handleViewDetails(bill)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md text-xs"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleSearch;
