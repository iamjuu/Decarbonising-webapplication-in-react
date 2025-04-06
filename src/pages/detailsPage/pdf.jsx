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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const companyInfoData = {
    name: "Nos2 DECARBONISING",
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
      const firstPageServices = 5;
      const remainingServices = invoiceData.services.length - firstPageServices;
      
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
      return invoiceData.services.slice(0, servicesPerPage);
    } else {
      return invoiceData.services.slice(servicesPerPage);
    }
  };

  // Function to wait for images to load
  const waitForImages = (element) => {
    if (!element) return Promise.resolve();
    
    return Promise.all(
      Array.from(element.getElementsByTagName('img')).map(img => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Don't fail if image errors
        });
      })
    );
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPDF(true);
    try {
      // Wait for all images to load first
      await Promise.all([
        waitForImages(printRef1.current),
        totalPages > 1 ? waitForImages(printRef2.current) : Promise.resolve()
      ]);
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // First page
      setCurrentPage(1);
      await new Promise(resolve => setTimeout(resolve, 500)); // Extra delay for rendering
      
      const canvas1 = await html2canvas(printRef1.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: true,
        windowWidth: printRef1.current.scrollWidth,
        windowHeight: printRef1.current.scrollHeight,
      });
      pdf.addImage(canvas1.toDataURL('image/jpeg', 1.0), "JPEG", 0, 0, 210, 297);

      // Second page if needed
      if (totalPages > 1) {
        pdf.addPage();
        setCurrentPage(2);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const canvas2 = await html2canvas(printRef2.current, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: true,
          windowWidth: printRef2.current.scrollWidth,
          windowHeight: printRef2.current.scrollHeight,
        });
        pdf.addImage(canvas2.toDataURL('image/jpeg', 1.0), "JPEG", 0, 0, 210, 297);
      }

      pdf.save(`Invoice-${invoiceData?._id || "default"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderPage = (pageNumber) => (
    <div 
      key={pageNumber}
      className="relative p-8 print:p-0" 
      style={{ 
        height: '29.7cm',
        width: '21cm',
        margin: '0 auto',
        backgroundColor: 'white',
        boxSizing: 'border-box'
      }}
    >
      {/* Show header only on first page */}
      {pageNumber === 1 && (
        <>
          {/* Header */}
          <div className="pb-6 mb-6 border-b-2 border-red-600">
            <div className="flex flex-row gap-4 justify-between items-start">
              <div className="flex-1">
                <h1 className="mb-1 text-2xl font-bold text-red-600">{companyInfoData.name}</h1>
                <p className="mb-2 text-sm text-gray-600">{companyInfoData.subTitle}</p>
                {invoiceData.companyInfo?.logo && (
                  <img 
                    className="object-contain w-24 h-auto" 
                    src={`http://localhost:7000/public/images/${invoiceData.companyInfo.logo}`}
                    alt="Logo"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>
              
              <div className="text-sm">
                <div className="grid grid-cols-[24px,1fr] gap-2 items-center mb-2">
                  <FaInstagram className="justify-self-center w-4 h-4 text-pink-600" />
                  <span className="text-base text-gray-600">{companyInfoData.instagram}</span>
                </div>
                <div className="grid grid-cols-[24px,1fr] gap-2 items-center mb-2">
                  <CgWebsite className="justify-self-center w-4 h-4 text-blue-600" />
                  <span className="text-base text-gray-600">{companyInfoData.website}</span>
                </div>
                <div className="grid grid-cols-[24px,1fr] gap-2 items-center">
                  <FaWhatsapp className="justify-self-center w-4 h-4 text-green-600" />
                  <span className="text-base text-gray-600">{companyInfoData.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer and Invoice Info */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-800">Customer Details</h2>
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
              <h2 className="mb-3 text-lg font-semibold text-gray-800">Invoice Details</h2>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="justify-self-end font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="justify-self-end px-3 py-1 text-lg font-bold text-green-600 rounded-full">
                    {invoiceData.servicestatus}
                  </span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-center">
                  <span className="text-gray-600">Invoice No:</span>
                  <span className="justify-self-end font-medium">{invoiceData._id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-gray-800">Vehicle Information</h2>
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
                    className="object-contain w-32 h-32" 
                    src={invoiceData.imagelink}
                    alt="Vehicle"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      // First fallback - try with cache busting
                      e.target.src = `${invoiceData.imagelink}?${Date.now()}`;
                      e.target.onerror = () => {
                        // Second fallback - try different URL format
                        e.target.src = invoiceData.imagelink
                          .replace('https://nso2-bucket.s3.ap-south-1.amazonaws.com/', 'https://nso2-bucket.s3.amazonaws.com/');
                        e.target.onerror = null;
                      };
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Services Table - Show on both pages */}
      <div className={`mb-8 ${pageNumber === 2 ? 'mt-8' : ''}`}>
        <h2 className="mb-3 text-lg font-semibold text-red-600">
          Services {totalPages > 1 ? `(Page ${pageNumber} of ${totalPages})` : ''}
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600 bg-gray-50 border-y">
                Service Type
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-right text-gray-600 bg-gray-50 border-y">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageServices().map((service, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3 text-sm text-gray-600">{service.serviceType}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-600">
                  ₹{service.serviceAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          {pageNumber === totalPages && (
            <tfoot>
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold text-right">Total Amount:</td>
                <td className="px-4 py-3 text-right text-gray-600">
  ₹{invoiceData.services.reduce((sum, s) => sum + s.serviceAmount, 0).toFixed(2)}
</td>

              </tr>
            
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold text-right">Discount:</td>
                <td className="px-4 py-3 text-right text-red-600">
                  -₹{invoiceData.discount.toFixed(2)}
                </td>
              </tr>




              <tr>
                <td className="px-4 py-3 font-semibold text-right">Net Amount:</td>
                <td className="px-4 py-3 font-bold text-right text-gray-800">
                  ₹{invoiceData.totalAmount.toFixed(2)}
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
          <div className="mb-24">
            <h2 className="mb-3 text-lg font-semibold text-red-600">Terms and Conditions</h2>
            <div className="text-sm text-gray-600">
              {[
                "Your Next Service is After 12 Months or 140,000 km",
                "Decarbonize your vehicle once a year to keep the engine healthy",
                "If you have queries or complaints regarding our service, feel free to contact our technical team"
              ].map((term, index) => (
                <div key={index} className="flex gap-2 items-start mb-2">
                  <span className="flex-shrink-0 w-6 text-right">{index + 1}.</span>
                  <span className="flex-grow">{term}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer with QR Code */}
          <div className="flex absolute right-8 left-8 bottom-12 justify-between items-end">
            <div className="flex-shrink-0 w-20 h-20">
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
            <div className="text-xs text-right text-gray-500">
              <p>Thank you for your business!</p>
              <p>{companyInfoData.name}</p>
            </div>
          </div>
        </>
      )}

      {/* Page number */}
      <div className="absolute bottom-2 right-4 text-xs text-gray-400">
        Page {pageNumber} of {totalPages}
      </div>
    </div>
  );

  return (
    <div className="px-4 py-8 min-h-screen bg-gray-100">
      <div className="mx-auto" style={{ width: '21cm' }}> 
        <div className="mb-8 bg-white shadow-lg">
          <div ref={printRef1} className="w-full">
            {renderPage(1)}
          </div>
        </div>
        
        {totalPages > 1 && (
          <div className="bg-white shadow-lg">
            <div ref={printRef2} className="w-full">
              {renderPage(2)}
            </div>
          </div>
        )}
        
        <div className="flex justify-center p-6 mt-8 bg-white shadow-lg">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPDF}
            className="px-8 py-3 font-semibold text-white bg-red-600 rounded-lg transition duration-300 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? 'Generating PDF...' : 'Download Invoice'}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
        }
        
        html, body {
          min-width: 21cm;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-text-size-adjust: 100%;
        }
        
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
        
        @media screen and (max-width: 800px) {
          html {
            -webkit-text-size-adjust: none;
            -moz-text-size-adjust: none;
            -ms-text-size-adjust: none;
            text-size-adjust: none;
          }
          
          html, body {
            touch-action: manipulation;
          }
          
          body {
            background-color: #f1f5f9;
          }
          
          body:after {
            content: "";
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            height: 6px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            z-index: 1000;
          }
        }
      `}</style>

      <div className="fixed top-0 right-0 left-0 z-50 p-2 text-sm text-center text-white bg-blue-600 md:hidden">
        You can scroll horizontally and pinch-zoom to view the entire invoice
      </div>
    </div>
  );
};

export default Invoice;
