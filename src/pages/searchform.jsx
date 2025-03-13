import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VIDEO_URL from "./../assets/video/videoplayback.mp4";
import axios from "./../Instance/Instance";

const VehicleSearch = () => {

  const [vehicleNo, setVehicleNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState({ vehicle: "", mobile: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const navigate = useNavigate();

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
      setError((prev) => ({
        ...prev,
        vehicle: "Only letters and numbers allowed",
      }));
    }
  };

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobileNo(value);
      setError((prev) => ({
        ...prev,
        mobile:
          value.length !== 10 && value.length
            ? "Mobile number must be 10 digits"
            : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchAttempted(true);

    try {
      const response = await axios.post("/findbills", {
        vehicleNo,
        mobileNo,
      });
      console.log("API Response:", response.data); // Debug log
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
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
    setSearchAttempted(false);
  };

  const handleViewDetails = (invoiceData) => {
    navigate("/nos2/pdf", { state: { invoiceData } });
  };

  const Gobackbtn = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen relative bg-black overflow-x-hidden">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 z-10" />
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
      <div className="relative z-20 w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="w-full">
            <button onClick={Gobackbtn} className="border px-3 py-1 hover:bg-red-600 duration-75 text-xs md:text-sm border-gray-700 rounded-md text-white">
              back
            </button>
          </div>
          {/* Form Section */}
          <div className="w-full">
            <div className="bg-black/40 shadow-sm backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border-1 border-red-100">
              <h1 className="text-xl md:text-2xl font-light text-white mb-6 text-center drop-shadow-lg">
                Search Previous Bills
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="vehicleNo"
                    className="block text-xs md:text-sm font-normal text-white mb-2"
                  >
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    id="vehicleNo"
                    value={vehicleNo}
                    onChange={handleVehicleInput}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/90 text-black border-2 border-red-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="Enter vehicle number"
                    required
                  />
                  {error.vehicle && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 font-semibold">
                      {error.vehicle}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobileNo"
                    className="block text-xs md:text-sm font-normal text-white mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNo"
                    value={mobileNo}
                    onChange={handleMobileInput}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/90 text-black border-2 border-red-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="Enter 10-digit mobile number"
                    required
                  />
                  {error.mobile && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 font-semibold">
                      {error.mobile}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={
                      !!error.mobile ||
                      !!error.vehicle ||
                      !vehicleNo ||
                      mobileNo.length !== 10 ||
                      isLoading
                    }
                    className="flex-1 bg-gradient-to-r from-red-700 to-red-900 text-white py-2 md:py-3 px-4 rounded-lg hover:from-red-800 hover:to-red-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm sm:text-base shadow-lg"
                  >
                    {isLoading ? "Searching..." : "Search Bills"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex-1 bg-gray-600 text-white py-2 md:py-3 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 font-bold text-sm sm:text-base shadow-lg"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full mt-8">
            {isLoading && (
              <div className="text-white text-center">Loading...</div>
            )}
            
            {searchAttempted && !isLoading && searchResults.length === 0 && (
              <div className="text-red-600 text-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
                No bills found for the given details
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-6 text-center sm:text-left drop-shadow-lg">
                  Previous Bills ({searchResults.length})
                </h2>
                <div className="grid gap-4">
                  {searchResults.map((bill) => (
                    <div
                      key={bill.id}
                      className="bg-black/80 backdrop-blur-sm border-2 border-red-600 rounded-lg p-3 md:p-4 hover:border-white transition-all duration-300 shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4">
                        <div className="space-y-1 md:space-y-2">
                          <p className="text-white text-xs sm:text-sm md:text-base">
                            Vehicle: {bill.vehicleNumber}
                          </p>
                          <p className="text-gray-300 text-xs sm:text-sm">
                            Date:
                            {new Date(bill.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-white font-bold text-xs sm:text-sm md:text-base">
                            Amount: ₹{bill.totalAmount}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-2 mt-2 sm:mt-0">
                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold ${
                              bill.servicestatus === "Serviced"
                                ? "bg-green-900/80 text-white border border-green-500"
                                : "bg-yellow-900/80 text-white border border-yellow-500"
                            }`}
                          >
                            {bill.servicestatus}
                          </span>
                          <button
                            onClick={() => handleViewDetails(bill)}
                            className="px-2 md:px-3 py-1 md:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md text-xs"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSearch;
