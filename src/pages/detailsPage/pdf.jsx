import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import QRCode from "react-qr-code";

const Invoice = () => {
  const { state } = useLocation();
  const { invoiceData } = state || {};
  const printRef1 = useRef(null);
  const printRef2 = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [servicesPerPage, setServicesPerPage] = useState(5);

  const companyInfoData = {
    name: "NSo2 DECARBONISING",
    subTitle: "BIKE AND CAR - ALL VEHICLE",
    instagram: "nos2kannur_enginedecarbonising",
    website: "www.nos2kannur.in",
    whatsapp: "7025715250",
    logo: "",
    vehicleImage: "",
  };

  // Modify the services per page calculation
  useEffect(() => {
    if (invoiceData?.services) {
      // First page can fit 5 services
      const firstPageServices = 5;
      const remainingServices = invoiceData.services.length - firstPageServices;
      
      // Always create second page if there are more than 5 services
      if (remainingServices > 0) {
        setTotalPages(2);
        setServicesPerPage(firstPageServices);
      } else {
        setTotalPages(1);
        setServicesPerPage(invoiceData.services.length);
      }
    }
  }, [invoiceData]);

  // Get current page's services
  const getCurrentPageServices = () => {
    if (!invoiceData?.services) return [];
    
    if (currentPage === 1) {
      // First page shows fixed number off services
      return invoiceData.services.slice(0, servicesPerPage);
    } else {
      // Second page shows remaining services
      return invoiceData.services.slice(servicesPerPage);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const originalPage = currentPage;

      // Generate first page
      setCurrentPage(1);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const firstPageElement = printRef1.current;
      if (firstPageElement) {
        const canvas1 = await html2canvas(firstPageElement, {
          scale: 4,
          useCORS: true,
          logging: false,
          allowTaint: true,
          scrollX: 0,
          scrollY: -window.scrollY,
        });

        const imgWidth = 210;
        const imgHeight = 297;
        const imgData1 = canvas1.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData1, "JPEG", 0, 0, imgWidth, imgHeight, "", "FAST");
      }

      // Generate second page if needed
      if (totalPages > 1) {
        pdf.addPage();
        setCurrentPage(2);
        await new Promise(resolve => setTimeout(resolve, 200));

        const secondPageElement = printRef2.current;
        if (secondPageElement) {
          const canvas2 = await html2canvas(secondPageElement, {
            scale: 4,
            useCORS: true,
            logging: false,
            allowTaint: true,
            scrollX: 0,
            scrollY: -window.scrollY,
          });

          const imgWidth = 210;
          const imgHeight = 297;
          const imgData2 = canvas2.toDataURL("image/jpeg", 1.0);
          pdf.addImage(imgData2, "JPEG", 0, 0, imgWidth, imgHeight, "", "FAST");
        }
      }

      pdf.save(`Invoice-${invoiceData?._id || "default"}.pdf`);
      setCurrentPage(originalPage);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  // Helper functions to generate content
  const renderHeaderContent = () => `
    <div class="header">
      <!-- Company Info -->
      <h1>${companyInfoData.name}</h1>
      <p>${companyInfoData.subTitle}</p>
      <!-- Contact Info -->
      <div>
        <p>${companyInfoData.instagram}</p>
        <p>${companyInfoData.website}</p>
        <p>${companyInfoData.whatsapp}</p>
      </div>
      <!-- Customer Details -->
      <div>
        <h2>Customer Details</h2>
        <p>Owner Name: ${invoiceData.ownerName}</p>
        <p>Phone: ${invoiceData.phoneNumber}</p>
        <p>Vehicle No: ${invoiceData.vehicleNumber}</p>
        <p>Model: ${invoiceData.vehicleModel}</p>
      </div>
      <!-- Vehicle Info -->
      <div>
        <h2>Vehicle Information</h2>
        <p>Year: ${invoiceData.vehicleYear}</p>
        <p>Kilometer: ${invoiceData.kilometer}</p>
        <p>Fuel Type: ${invoiceData.fuelType}</p>
        <p>Smoke: ${invoiceData.smoke}</p>
        <p>LHCE Details: ${invoiceData.lhceDetails}</p>
      </div>
    </div>
  `;

  const renderServicesTable = (pageNumber) => {
    const services = getCurrentPageServices();
    return `
      <div class="services">
        <h2>Services (Page ${pageNumber} of ${totalPages})</h2>
        <table>
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-50 text-left text-sm font-semibold text-gray-600 border-y">
                Service Type
              </th>
              <th className="py-3 px-4 bg-gray-50 text-right text-sm font-semibold text-gray-600 border-y">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            ${services.map((service, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-600">{service.serviceType}</td>
                <td className="py-3 px-4 text-sm text-gray-600 text-right">
                  ₹${service.serviceAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ${pageNumber === totalPages ? renderTotals() : ''}
      </div>
    `;
  };

  const renderTotals = () => `
    <div class="totals">
      <p>Total Amount: ₹${invoiceData.totalAmount.toFixed(2)}</p>
      <p>Discount: -₹${invoiceData.discount.toFixed(2)}</p>
      <p>Net Amount: ₹${(invoiceData.totalAmount - invoiceData.discount).toFixed(2)}</p>
    </div>
  `;

  const renderFooterContent = () => `
    <div class="footer">
      <div class="terms">
        <h2>Terms and Conditions</h2>
        <ol>
          <li>Your Next Service is After 12 Months or 140,000 km</li>
          <li>Decarbonize your vehicle once a year to keep the engine healthy</li>
          <li>If you have queries or complaints regarding our service, feel free to contact our technical team</li>
        </ol>
      </div>
      <div class="qr-code">
        <!-- QR code will be added here -->
      </div>
      <div class="thank-you">
        <p>Thank you for your business!</p>
        <p>${companyInfoData.name}</p>
      </div>
    </div>
  `;

  // Add this function to render a single page
  const renderPage = (pageNumber) => (
    <div 
      key={pageNumber}
      className="p-8 relative print:p-0" 
      style={{ 
        height: '29.7cm',
        width: '100%',
        maxWidth: '21cm',
        margin: '0 auto',
        backgroundColor: 'white',
        boxSizing: 'border-box'
      }}
    >
      {/* Show header only on first page */}
      {pageNumber === 1 && (
        <>
          {/* Header */}
          <div className="border-b-2 border-red-600 pb-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1 w-full md:w-auto">
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
              
              <div className="text-sm w-full md:w-auto">
                <div className="grid grid-cols-[24px,1fr] md:gap-2 items-center mb-2">
                  <FaInstagram className="text-pink-600 w-4 h-4 justify-self-center" />
                  <span className="text-gray-600 text-sm md:text-base">{companyInfoData.instagram}</span>
                </div>
                <div className="grid grid-cols-[24px,1fr] md:gap-2 items-center mb-2">
                  <CgWebsite className="text-blue-600 w-4 h-4 justify-self-center" />
                  <span className="text-gray-600 text-sm md:text-base break-all md:break-normal">{companyInfoData.website}</span>
                </div>
                <div className="grid grid-cols-[24px,1fr] md:gap-2 items-center">
                  <FaWhatsapp className="text-green-600 w-4 h-4 justify-self-center" />
                  <span className="text-gray-600 text-sm md:text-base">{companyInfoData.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer and Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6">
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

            <div className="mt-4 md:mt-0">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Invoice Details</h2>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium justify-self-end">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-bold px-3 py-1 rounded-full text-[18px] justify-self-end">
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

          {/* Vehicle Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
                <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                  <img 
                    className="w-32 h-32 object-contain" 
                    src={invoiceData.imagelink}
                    alt="Vehicle" 
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Services Table - Show on both pages */}
      <div className={`mb-8 ${pageNumber === 2 ? 'mt-8' : ''}`}>
        <h2 className="text-lg font-semibold mb-3 text-red-600">
          Services {totalPages > 1 ? `(Page ${pageNumber} of ${totalPages})` : ''}
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-50 text-left text-sm font-semibold text-gray-600 border-y">
                Service Type
              </th>
              <th className="py-3 px-4 bg-gray-50 text-right text-sm font-semibold text-gray-600 border-y">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageServices().map((service, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-600">{service.serviceType}</td>
                <td className="py-3 px-4 text-sm text-gray-600 text-right">
                  ₹{service.serviceAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          {pageNumber === totalPages && (
            <tfoot>
              <tr className="border-b">
                <td className="py-3 px-4 text-right font-semibold">Total Amount:</td>
                <td className="py-3 px-4 text-right text-gray-600">
                  ₹{invoiceData.totalAmount.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-right font-semibold">Discount:</td>
                <td className="py-3 px-4 text-right text-red-600">
                  -₹{invoiceData.discount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-right font-semibold">Net Amount:</td>
                <td className="py-3 px-4 text-right font-bold text-gray-800">
                  ₹{(invoiceData.totalAmount - invoiceData.discount).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Show footer content only on last page */}
      {pageNumber === totalPages && (
        <>
          {/* Terms and Conditions */}
          <div className="mb-32">
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
          <div className="absolute bottom-16 left-8 right-8 flex justify-between items-end">
            <div className="w-[80px] h-[80px] flex-shrink-0">
              <QRCode 
                value={companyInfoData.website}
                size={80}
                style={{ 
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            </div>
            <div className="text-xs text-gray-500 text-right">
              <p>Thank you for your business!</p>
              <p>{companyInfoData.name}</p>
            </div>
          </div>
        </>
      )}

      {/* Page number */}
      <div className="absolute bottom-8 right-4 text-xs text-gray-400">
        Page {pageNumber} of {totalPages}
      </div>
    </div>
  );

  // Update the return statement to show all pages
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-[21cm] mx-auto">
        <div className="mb-8 bg-white shadow-lg">
          <div ref={printRef1}>
            {renderPage(1)}
          </div>
        </div>
        
        {totalPages > 1 && (
          <div className="bg-white shadow-lg">
            <div ref={printRef2}>
              {renderPage(2)}
            </div>
          </div>
        )}
        
        {/* Download Button */}
        <div className="mt-8 p-6 bg-white shadow-lg flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
          >
            Download Invoice
          </button>
        </div>
      </div>

      {/* Existing styles */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print-container {
            width: 21cm;
            height: 29.7cm;
            margin: 0 !important;
          }
        }
        @media screen and (max-width: 768px) {
          .print-container {
            width: 100%;
            min-height: auto;
            padding: 1rem;
          }
          
          /* Ensure text doesn't overflow on small screens */
          .text-overflow-handle {
            word-break: break-word;
            hyphens: auto;
          }
          
          /* Adjust spacing for mobile */
          .grid-spacing {
            gap: 1rem;
          }
        }
        
        /* Prevent layout breaks at specific breakpoint */
        @media screen and (max-width: 692px) {
          .contact-info {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Invoice;
