import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Invoice = () => {
  const { state } = useLocation();
  const { invoiceData } = state || {};
  const printRef = useRef(null);
  const companyInfoData = {
  name: "NSo2 DECARBONISING",
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
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
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
        <div ref={printRef} className="p-8" style={{ minHeight: '29.7cm' }}>
          {/* Header */}
          <div className="border-b-2 border-red-600 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-red-600">Nos2 DECARBONISING</h1>
                <p className="text-sm text-gray-600">BIKE AND CAR - ALL VEHICLE</p>
                {invoiceData.companyInfo?.logo && (
                  <img 
                    className="w-16 mt-2" 
                    src={`http://localhost:7000/public/images/${invoiceData.companyInfo.logo}`}
                    alt="Logo" 
                  />
                )}
              </div>
              
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaInstagram className="text-pink-600" />
                  <span>{companyInfoData.instagram}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CgWebsite className="text-black-600" />
                  <span>{companyInfoData.website}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaWhatsapp className="text-green-600" />
                  <span>{companyInfoData.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <h2 className="font-semibold mb-2 text-black">Customer Details</h2>
              <div className="space-y-1 text-gray-600">
                <p><span className="inline-block w-24">Owner Name:</span> {invoiceData.ownerName}</p>
                <p><span className="inline-block w-24">Phone:</span> {invoiceData.phoneNumber}</p>
                <p><span className="inline-block w-24">Vehicle No:</span> {invoiceData.vehicleNumber}</p>
                <p><span className="inline-block w-24">Model:</span> {invoiceData.vehicleModel}</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="font-semibold mb-2 text-black">Invoice Details</h2>
              <div className="space-y-1 text-gray-600">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p className="text-white">
  Status: <span className="bg-green-800 bg-cover px-2 rounded">{invoiceData.servicestatus}</span>
</p>
                <p>Invoice No: {invoiceData._id}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2 text-black">Vehicle Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm space-y-1 text-gray-600">
                <p><span className="inline-block w-24">Year:</span> {invoiceData.vehicleYear}</p>
                <p><span className="inline-block w-24">Kilometer:</span> {invoiceData.kilometer}</p>
                <p><span className="inline-block w-24">Fuel Type:</span> {invoiceData.fuelType}</p>
                <p><span className="inline-block w-24">Smoke:</span> {invoiceData.smoke}</p>
                <p><span className="inline-block w-24">LHCE Details:</span> {invoiceData.lhceDetails}</p>
              </div>
              {invoiceData.imagelink && (
                <div className="flex justify-end">
                  <img 
                    className="w-24 object-contain" 
                    src={`http://localhost:7000/public/images/${invoiceData.imagelink}`}
                    alt="Vehicle" 
                  />
                  
                </div>
              )}
            </div>
          </div>

          {/* Services Table */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2 text-red-600">Services</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-3 text-left border-b text-gray-600">Service Type</th>
                  <th className="py-2 px-3 text-right border-b text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.services.map((service, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-3 text-gray-600">{service.serviceType}</td>
                    <td className="py-2 px-3 text-right text-gray-600">${service.serviceAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b">
                  <td className="py-2 px-3 text-right font-semibold">Total Amount:</td>
                  <td className="py-2 px-3 text-right text-gray-600">${invoiceData.totalAmount.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 text-right font-semibold">Discount:</td>
                  <td className="py-2 px-3 text-right ">-${invoiceData.discount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-right font-semibold">Net Amount:</td>
                  <td className="py-2 px-3 text-right font-bold">${(invoiceData.totalAmount - invoiceData.discount).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Terms */}
          <div className="mt-8">
            <h2 className="font-semibold mb-2 text-red-600">Terms and Conditions</h2>
            <ol className="text-sm list-decimal ml-4 space-y-1 text-gray-600">
              <li>Your Next Service is After 12 Months or 140,000 km</li>
              <li>Decarbonize your vehicle once a year to keep the engine healthy</li>
              <li>If you have queries or complaints regarding our service, feel free to contact our technical team</li>
            </ol>
          </div>
        </div>

        {/* Download Button */}
        <div className="p-4 bg-gray-50 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="bg-blue-600 text-white px-6 py-2 text-sm rounded hover:bg-red-700 transition duration-300"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;