import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import QRCode from "react-qr-code";
const Invoice = () => {
  const { state } = useLocation();
  const { invoiceData } = state || {};
  const printRef = useRef(null);
  const companyInfoData = {
    name: "Nos2 DECARBONISING",
    subTitle: "BIKE AND CAR - ALL VEHICLE",
    instagram: "nos2kannur_enginedecarbonising",
    website: "www.Nos2Decarbanising.com",
    whatsapp: "7025715250",
    logo: "",
    vehicleImage: "",
  };
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        logging: false,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, "", "FAST");
      pdf.save(`Invoice-${invoiceData?._id || "default"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };
  if (!invoiceData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-[21cm] mx-auto bg-white shadow-lg">
        <div 
          ref={printRef} 
          className="p-8 relative" 
          style={{ 
            minHeight: '29.7cm',
            width: '21cm',
            margin: '0 auto',
            backgroundColor: 'white',
            boxSizing: 'border-box'
          }}
        >
          {/* Header */}
          <div className="border-b-2 border-red-600 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-red-600 mb-1">{companyInfoData.name}</h1>
                <p className="text-sm text-gray-600 mb-2">{companyInfoData.subTitle}</p>
                {invoiceData.companyInfo?.logo && (
                  <img 
                    className="w-24 h-auto object-contain" 
                    src={`http://localhost:7000/public/images/${invoiceData.companyInfo.logo}`}
                    alt="Logo" 
                  />
                )}
              </div>
              
              {/* Fixed contact info alignment */}
              <div className="text-sm">
                <div className="grid grid-cols-[24px,1fr] gap-2 items-center mb-2">
                  <FaInstagram className="text-pink-600 w-4 h-4 justify-self-center" />
                  <span className="text-gray-600">{companyInfoData.instagram}</span>
                </div>
                <div className="grid grid-cols-[24px,1fr] gap-2 items-center mb-2">
                  <CgWebsite className="text-blue-600 w-4 h-4 justify-self-center" />
                  <span className="text-gray-600">{companyInfoData.website}</span>
                </div>
                <div className="grid grid-cols-[24px,1fr] gap-2 items-center">
                  <FaWhatsapp className="text-green-600 w-4 h-4 justify-self-center" />
                  <span className="text-gray-600">{companyInfoData.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Invoice Info */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Customer Details</h2>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Owner Name:</span>
                  <span className="font-medium">{invoiceData.ownerName}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{invoiceData.phoneNumber}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Vehicle No:</span>
                  <span className="font-medium">{invoiceData.vehicleNumber}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-medium">{invoiceData.vehicleModel}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Invoice Details</h2>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium justify-self-end">{new Date().toLocaleDateString()}</span>
                </div>
                {/* Fixed status alignment */}
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Status:</span> 
                  <span className="text-green-600 font-bold   px-3 py-1 rounded-full text-[18px] justify-self-end inline-block items-center">
                    {invoiceData.servicestatus}
                  </span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Invoice No:</span>
                  <span className="font-medium justify-self-end">{invoiceData._id}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Rest of the component remains the same... */}
          {/* Vehicle Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Vehicle Information</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{invoiceData.vehicleYear}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Kilometer:</span>
                  <span className="font-medium">{invoiceData.kilometer}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Fuel Type:</span>
                  <span className="font-medium">{invoiceData.fuelType}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">Smoke:</span>
                  <span className="font-medium">{invoiceData.smoke}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr]">
                  <span className="text-gray-600">LHCE Details:</span>
                  <span className="font-medium">{invoiceData.lhceDetails}</span>
                </div>
              </div>
              {invoiceData.imagelink && (
                <div className="flex justify-end">
                  <img 
                    className="w-32 h-32 object-contain" 
                    src={`${invoiceData.imagelink}`}
                    alt="Vehicle" 
                  />
                </div>
              )}
            </div>
          </div>
          {/* Services Table */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-red-600">Services</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50 text-left text-sm font-semibold text-gray-600 border-y">Service Type</th>
                  <th className="py-3 px-4 bg-gray-50 text-right text-sm font-semibold text-gray-600 border-y">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.services.map((service, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-600">{service.serviceType}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">₹{service.serviceAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b">
                  <td className="py-3 px-4 text-right font-semibold">Total Amount:</td>
                  <td className="py-3 px-4 text-right text-gray-600">₹{invoiceData.totalAmount.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-right font-semibold">Discount:</td>
                  <td className="py-3 px-4 text-right text-red-600">-₹{invoiceData.discount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-right font-semibold">Net Amount:</td>
                  <td className="py-3 px-4 text-right font-bold text-gray-800">₹{(invoiceData.totalAmount - invoiceData.discount).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          {/* Terms and Conditions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-red-600">Terms and Conditions</h2>
            <div className="text-sm text-gray-600">
              {[
                "Your Next Service is After 12 Months or 140,000 km",
                "Decarbonize your vehicle once a year to keep the engine healthy",
                "If you have queries or complaints regarding our service, feel free to contact our technical team"
              ].map((term, index) => (
                <div key={index} className="flex items-start gap-2 mb-2">
                  <span className="flex-shrink-0 w-6 text-right">{index + 1}.</span>
                  <span className="flex-grow">{term}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Footer with QR Code */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <QRCode 
              value={companyInfoData.website} 
              size={96}
              style={{ height: 'auto', maxWidth: '96px', width: '100%' }}
            />
            <div className="text-xs text-gray-500 text-right">
              <p>Thank you for your business!</p>
              <p>{companyInfoData.name}</p>
            </div>
          </div>
        </div>
        {/* Download Button */}
        <div className="p-6 bg-gray-50 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}; 
export default Invoice
