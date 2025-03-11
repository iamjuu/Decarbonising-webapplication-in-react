// import React, { useEffect, useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { FaInstagram, FaWhatsapp } from "react-icons/fa";
// import { CgWebsite } from "react-icons/cg";

// // Sample data moved outside the component
// const sampleData = {
//   "_id": {
//     "$oid": "677d09fb4496d7f7decdfa12"
//   },
//   "vehicleNumber": "KL10AB7846",
//   "ownerName": "nithin",
//   "phoneNumber": 9061362696,
//   "vehicleYear": 2016,
//   "vehicleModel": "mahindra suzuki acess",
//   "kilometer": 200000,
//   "fuelType": "petrol",
//   "imagelink": "1736247500972-github-mark.png",
//   "smoke": "okkok",
//   "lhceDetails": "25",
//   "services": [
//     {
//       "serviceType": "woeker",
//       "serviceAmount": 1000,
//       "_id": {
//         "$oid": "677d09fb4496d7f7decdfa13"
//       }
//     }
//   ],
//   "totalAmount": 1000,
//   "discount": 0,
//   "servicestatus": "Serviced",
//   "createdAt": {
//     "$date": "2025-01-07T11:03:23.446Z"
//   },
//   "__v": 0
// };

// const companyInfoData = {
//   name: "Nos2 DECARBONISING",
//   subTitle: "BIKE AND CAR - ALL VEHICLE",
//   instagram: "nos2kannur_enginedecarbonising",
//   website: "www.Nos2Decarbanising.com",
//   whatsapp: "7025715250",
//   logo: "",
//   vehicleImage: "",
// };

// const Invoice = ({ data = sampleData, companyInfo = companyInfoData }) => {
//   const printRef = useRef(null);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const handleDownloadPdf = async () => {
//     const element = printRef.current;
//     if (!element) return;

//     try {
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         allowTaint: true,
//       });

//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "pt",
//         format: "a4"
//       });

//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
//       const ratio = canvas.width / canvas.height;
//       const imgWidth = pageWidth;
//       const imgHeight = pageWidth / ratio;

//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(`Invoice-${data.vehicleNumber}.pdf`);
//     } catch (error) {
//       console.error("PDF generation failed:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl">
//         <div ref={printRef} className="bg-white p-4 sm:p-8">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-4">
//             <div className="flex-1">
//               <h2 className="text-red-500 text-base sm:text-lg font-bold">{companyInfo.name}</h2>
//               <h4 className="text-xs sm:text-sm text-red-500">{companyInfo.subTitle}</h4>
//               {companyInfo.logo && (
//                 <img className="w-12 sm:w-16 mt-2" src={companyInfo.logo} alt="Logo" />
//               )}
//             </div>
            
//             <div className="flex-1 text-right">
//               <div className="space-y-1">
//                 <div className="flex items-center justify-end gap-2">
//                   <FaInstagram className="text-pink-600 text-lg" />
//                   <span className="text-xs sm:text-sm">{companyInfo.instagram}</span>
//                 </div>
//                 <div className="flex items-center justify-end gap-2">
//                   <CgWebsite className="text-blue-600 text-lg" />
//                   <span className="text-xs sm:text-sm">{companyInfo.website}</span>
//                 </div>
//                 <div className="flex items-center justify-end gap-2">
//                   <FaWhatsapp className="text-green-600 text-lg" />
//                   <span className="text-xs sm:text-sm">{companyInfo.whatsapp}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Customer & Invoice Details */}
//           <div className="grid grid-cols-2 gap-1 mb-4">
//             <div className="space-y-0.5">
//               <p className="text-sm"><span className="font-semibold">Owner:</span> {data.ownerName}</p>
//               <p className="text-sm"><span className="font-semibold">Phone:</span> {data.phoneNumber}</p>
//               <p className="text-sm"><span className="font-semibold">Vehicle No:</span> {data.vehicleNumber}</p>
//             </div>
//             <div className="text-right space-y-0.5">
//               <p className="text-sm"><span className="font-semibold">Date:</span> {formatDate(data.createdAt.$date)}</p>
//               <p className="text-sm"><span className="font-semibold">Time:</span> {formatTime(data.createdAt.$date)}</p>
//               <p className="text-sm"><span className="font-semibold">Status:</span> {data.servicestatus}</p>
//             </div>
//           </div>

//           {/* Vehicle Details */}
//           <div className="flex justify-between mb-4">
//             <div className="space-y-2 flex-1">
//               <p className="flex justify-between text-sm">
//                 <span className="font-semibold">Year</span>
//                 <span>{data.vehicleYear}</span>
//               </p>
//               <p className="flex justify-between text-sm">
//                 <span className="font-semibold">Vehicle Model</span>
//                 <span>{data.vehicleModel}</span>
//               </p>
//               <p className="flex justify-between text-sm">
//                 <span className="font-semibold">Kilometer</span>
//                 <span>{data.kilometer}</span>
//               </p>
//               <p className="flex justify-between text-sm">
//                 <span className="font-semibold">Fuel Type</span>
//                 <span>{data.fuelType}</span>
//               </p>
//               <p className="flex justify-between text-sm">
//                 <span className="font-semibold">Smoke</span>
//                 <span>{data.smoke}</span>
//               </p>
//               <p className="flex justify-between text-sm">
//                 <span className="font-semibold">LHCE Used</span>
//                 <span>{data.lhceDetails} ml</span>
//               </p>
//             </div>
//             {data.imagelink && (
//               <div className="ml-4">
//                 <img 
//                   className="w-24 sm:w-32 object-contain" 
//                   src={data.imagelink} 
//                   alt="Vehicle" 
//                 />
//               </div>
//             )}
//           </div>

//           {/* Services Table */}
//           <div className="overflow-x-auto mb-4">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="border p-2 text-sm text-left">SI No</th>
//                   <th className="border p-2 text-sm text-right">Service Type</th>
//                   <th className="border p-2 text-sm text-right">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.services.map((service, index) => (
//                   <tr key={index}>
//                     <td className="border p-2 text-sm">{index + 1}</td>
//                     <td className="border p-2 text-sm text-right">{service.serviceType}</td>
//                     <td className="border p-2 text-sm text-right">₹{service.serviceAmount.toFixed(2)}</td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td colSpan="2" className="border p-2 text-sm text-right font-bold">Total Amount</td>
//                   <td className="border p-2 text-sm text-right font-bold">₹{data.totalAmount.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="2" className="border p-2 text-sm text-right font-bold">Discount</td>
//                   <td className="border p-2 text-sm text-right font-bold text-red-500">-₹{data.discount.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="2" className="border p-2 text-sm text-right font-bold">Net Amount</td>
//                   <td className="border p-2 text-sm text-right font-bold">₹{(data.totalAmount - data.discount).toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* Terms */}
//           <div className="mt-4">
//             <h2 className="font-bold text-sm mb-2">TERMS</h2>
//             <ol className="list-decimal ml-4 text-xs space-y-1">
//               <li>Your Next Service is After 12 Months or {data.kilometer + 20000} km</li>
//               <li>Decarbonize your vehicle once a year to keep the engine healthy</li>
//               <li>If you have queries or complaints regarding our service, feel free to contact our technical team</li>
//             </ol>
//           </div>

//           {/* Signature Section */}
//           <div className="mt-6 flex justify-between">
//             <div className="text-center">
//               <div className="border-t border-gray-400 mt-12 pt-1">
//                 <p className="text-xs">Customer Signature</p>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="border-t border-gray-400 mt-12 pt-1">
//                 <p className="text-xs">Authorized Signature</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Download Button */}
//         <div className="p-4 flex justify-center">
//           <button
//             onClick={handleDownloadPdf}
//             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;


import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

// Previous sample data remains the same
const sampleData = {
    "_id": {
      "$oid": "677d09fb4496d7f7decdfa12"
    },
    "vehicleNumber": "KL10AB7846",
    "ownerName": "nithin",
    "phoneNumber": 9061362696,
    "vehicleYear": 2016,
    "vehicleModel": "mahindra suzuki acess",
    "kilometer": 200000,
    "fuelType": "petrol",
    "imagelink": "1736247500972-github-mark.png",
    "smoke": "okkok",
    "lhceDetails": "25",
    "services": [
      {
        "serviceType": "woeker",
        "serviceAmount": 1000,
        "_id": {
          "$oid": "677d09fb4496d7f7decdfa13"
        }
      }
    ],
    "totalAmount": 1000,
    "discount": 0,
    "servicestatus": "Serviced",
    "createdAt": {
      "$date": "2025-01-07T11:03:23.446Z"
    },
    "__v": 0
  };
  
  const companyInfoData = {
     name: "Nos2 DECARBONISING",
    subTitle: "BIKE AND CAR - ALL VEHICLE",
    instagram: "nos2kannur_enginedecarbonising",
    website: "www.Nos2Decarbanising.com",
    whatsapp: "7025715250",
    logo: "",
    vehicleImage: "",
  };
  

const Invoice = ({ data = sampleData, companyInfo = companyInfoData }) => {
  const printRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

   const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });
      //       const imgData = canvas.toDataURL("image/png");

    
      

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgWidth = pageWidth;
      const imgHeight = pageWidth / ratio;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Invoice-${data.vehicleNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };
    

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <div ref={printRef} className="bg-white p-4 sm:p-8">
          {/* Enhanced Header with gradient background */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-red-600 text-xl sm:text-2xl font-bold mb-1">{companyInfo.name}</h2>
                <h4 className="text-red-500 text-sm sm:text-base">{companyInfo.subTitle}</h4>
                {companyInfo.logo && (
                  <img className="w-16 sm:w-20 mt-2" src={companyInfo.logo} alt="Logo" />
                )}
              </div>
              
              <div className="flex-1 text-right">
                <div className="space-y-2">
                  <div className="flex items-center justify-end gap-2 hover:text-pink-600 transition-colors">
                    <FaInstagram className="text-pink-600 text-lg" />
                    <span className="text-sm">{companyInfo.instagram}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 hover:text-blue-600 transition-colors">
                    <CgWebsite className="text-blue-600 text-lg" />
                    <span className="text-sm">{companyInfo.website}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 hover:text-green-600 transition-colors">
                    <FaWhatsapp className="text-green-600 text-lg" />
                    <span className="text-sm">{companyInfo.whatsapp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Invoice Details in a card */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-1"><span className="text-gray-600">Owner:</span> <span className="font-medium">{data.ownerName}</span></p>
                <p className="text-sm mb-1"><span className="text-gray-600">Phone:</span> <span className="font-medium">{data.phoneNumber}</span></p>
                <p className="text-sm"><span className="text-gray-600">Vehicle No:</span> <span className="font-medium">{data.vehicleNumber}</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm mb-1"><span className="text-gray-600">Date:</span> <span className="font-medium">{formatDate(data.createdAt.$date)}</span></p>
                <p className="text-sm mb-1"><span className="text-gray-600">Time:</span> <span className="font-medium">{formatTime(data.createdAt.$date)}</span></p>
                <p className="text-sm"><span className="text-gray-600">Status:</span> <span className="font-medium text-green-600">{data.servicestatus}</span></p>
              </div>
            </div>
          </div>

          {/* Vehicle Details with tighter spacing */}
          <div className="bg-white border rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Vehicle Details</h3>
            <div className="flex justify-between">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-28">Year</span>
                  <span className="font-medium">{data.vehicleYear}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-28">Vehicle Model</span>
                  <span className="font-medium">{data.vehicleModel}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-28">Kilometer</span>
                  <span className="font-medium">{data.kilometer}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-28">Fuel Type</span>
                  <span className="font-medium">{data.fuelType}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-28">Smoke</span>
                  <span className="font-medium">{data.smoke}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-28">LHCE Used</span>
                  <span className="font-medium">{data.lhceDetails} ml</span>
                </div>
              </div>
              {data.imagelink && (
                <div className="ml-4">
                  <img 
                    className="w-24 sm:w-32 object-contain rounded-lg border p-1" 
                    src={data.imagelink} 
                    alt="Vehicle" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Services Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b px-4 py-2 text-sm text-gray-600 text-left">SI No</th>
                  <th className="border-b px-4 py-2 text-sm text-gray-600 text-right">Service Type</th>
                  <th className="border-b px-4 py-2 text-sm text-gray-600 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.services.map((service, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-2 text-sm">{index + 1}</td>
                    <td className="border-b px-4 py-2 text-sm text-right">{service.serviceType}</td>
                    <td className="border-b px-4 py-2 text-sm text-right font-medium">₹{service.serviceAmount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan="2" className="border-b px-4 py-2 text-sm text-right font-medium">Total Amount</td>
                  <td className="border-b px-4 py-2 text-sm text-right font-medium">₹{data.totalAmount.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan="2" className="border-b px-4 py-2 text-sm text-right font-medium">Discount</td>
                  <td className="border-b px-4 py-2 text-sm text-right font-medium text-red-500">-₹{data.discount.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan="2" className="border-b px-4 py-2 text-sm text-right font-bold">Net Amount</td>
                  <td className="border-b px-4 py-2 text-sm text-right font-bold">₹{(data.totalAmount - data.discount).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Enhanced Terms Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h2 className="font-bold text-sm text-gray-700 mb-2">TERMS</h2>
            <ol className="list-decimal ml-4 text-sm space-y-1 text-gray-600">
              <li>Your Next Service is After 12 Months or {data.kilometer + 20000} km</li>
              <li>Decarbonize your vehicle once a year to keep the engine healthy</li>
              <li>If you have queries or complaints regarding our service, feel free to contact our technical team</li>
            </ol>
          </div>

          {/* Enhanced Signature Section */}
          <div className="mt-6 flex justify-between">
            <div className="text-center w-32">
              <div className="border-t-2 border-gray-300 mt-12 pt-1">
                <p className="text-xs text-gray-600">Customer Signature</p>
              </div>
            </div>
            <div className="text-center w-32">
              <div className="border-t-2 border-gray-300 mt-12 pt-1">
                <p className="text-xs text-gray-600">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Download Button */}
        <div className="p-4 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;