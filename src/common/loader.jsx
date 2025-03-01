import React, { useEffect, useRef } from 'react';
import Loader from '../assets/video/master-mechanic-with-wrench-animation-download-in-lottie-json-gif-static-svg-file-formats--spanner-toolbox-carpenter-pack-man-animations-5800358.mp4';
import Loader1 from '../assets/video/car-repair-shop-animation-download-in-lottie-json-gif-static-svg-file-formats--service-auto-services-pack-vehicle-animations-8689303.mp4';

const LoadingSpinner = () => {
  const wrenchVideoRef = useRef(null);
  const carVideoRef = useRef(null);

  useEffect(() => {
    // Initialize both videos
    const videos = [wrenchVideoRef.current, carVideoRef.current];
    videos.forEach(video => {
      if (video) {
        video.play().catch(error => {
          console.error("Video playback failed:", error);
        });
        video.loop = true;
      }
    });
  }, []);

  return (
    <div className="h-screen bg-white">
      <div className="absolute   inset-0 flex items-center justify-center gap-5">
        {/* Wrench animation */}
        <div className="relative">
          <video
            ref={wrenchVideoRef}
            className="w-24 h-24 object-contain"
            playsInline
            muted
            autoPlay
            loop
          >
            <source src={Loader} type="video/mp4" />
            <div className="w-32 h-32 border-8 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </video>
        </div>

        {/* Car repair animation */}
        <div className="relative">
          <video
            ref={carVideoRef}
            className="w-24 h-24 object-contain"
            playsInline
            muted
            autoPlay
            loop
          >
            <source src={Loader1} type="video/mp4" />
            {/* Fallback animation */}
            <div className="w-32 h-32 border-8 border-gray-300 border-t-red-600 rounded-full animate-spin" />
          </video>
        </div>
      </div>
      
      {/* Optional loading text */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xxl font-semibold text-gray-700 animate-pulse">
          Nos2 kannur..
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;