import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Pic1, Logoo } from "../../assets";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function Invoice() {
  const barcodeRef = useRef(null);
  const printRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, "123456789012", {
        format: "CODE128",
        displayValue: true,
        fontSize: 18,
      });
    }
  }, []);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    let remainingHeight = imgHeight;
    let position = 0;

    while (remainingHeight > 0) {
      const heightToRender = Math.min(remainingHeight, imgHeight);
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, (heightToRender * pdfWidth) / imgWidth);
      remainingHeight -= heightToRender;

      if (remainingHeight > 0) {
        pdf.addPage();
        position = 0;
      }
    }

    pdf.save("Invoice.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 sm:p-8  flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg  sm:p-6 w-full max-w-2xl">
        <div ref={printRef} className="  bg-white p-8">
          {/* Header Section */}
          <div className="flex flex-wrap justify-between items-center  ">
            <div>
            <h2 className="text-red-500 text-sm sm:text-lg">Nos2 DECARBONISING</h2>
              <h4 className="text-[10px] sm:text-[12px] text-red-500">
                BIKE AND CAR - ALL VEHICLE
              </h4>
            <img className="w-12 sm:w-16" src={Logoo} alt="Logo" />
            </div>
            <div className="text-center">
           
              <div className="  space-y-1">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <FaInstagram className="text-pink-600 text-sm sm:text-xl" />
                  <span className="text-gray-700 text-[10px] sm:text-[12px] font-semibold">
                    nos2kannur_enginedecarbonising
                  </span>
                </div>
                <div className="flex items-center ">
                  <CgWebsite className="text-blue-600 text-sm sm:text-xl" />
                  <span className="text-gray-700 text-[10px] sm:text-[12px] font-semibold">
                    www.Nos2Decarbanising.com
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <FaWhatsapp className="text-green-600 text-sm sm:text-xl" />
                  <span className="text-gray-700 text-[10px] sm:text-[12px] font-semibold">
                    7025715250
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Owner and Vehicle Details */}
          <div className="flex flex-wrap justify-between   mb-1">
            <div>
              <p className="text-[10px] sm:text-[13px]">Owner Name: Muhammed Ajmal</p>
              <p className="text-[10px] sm:text-[13px]">Phone: 7025715250</p>
              <p className="text-[10px] sm:text-[13px]">Vehicle Number: KL 13 AQ 1596</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] sm:text-[13px]">Date: 31/12/2024</p>
              <p className="text-[10px] sm:text-[13px]">Time: 11:30</p>
              <p className="text-[10px] sm:text-[13px]">Invoice No: 12dsd442</p>
            </div>
          </div>

          {/* Vehicle Info Section */}
          <div className="flex flex-wrap justify-between ">
            <div className="w-full sm:w-36">
              <p className="flex justify-between text-[10px] sm:text-[13px]">
                Year <span className="font-bold">2012</span>
              </p>
              <p className="flex justify-between text-[10px] sm:text-[13px]">
                Vehicle Model <span className="font-bold">Bike</span>
              </p>
              <p className="flex justify-between text-[10px] sm:text-[13px]">
                Kilometer <span className="font-bold">120000</span>
              </p>
              <p className="flex justify-between text-[10px] sm:text-[13px]">
                Fuel <span className="font-bold">Petrol</span>
              </p>
              <p className="flex justify-between text-[10px] sm:text-[13px]">
                Smoke <span className="font-bold">Normal</span>
              </p>
              <p className="flex justify-between text-[10px] sm:text-[13px]">
                LHCE Used <span className="font-bold">60 ml</span>
              </p>
            </div>
            <img className="w-16 sm:w-24 sm:mt-0" src={Pic1} alt="Vehicle" />
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full  mt-1 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-1 sm:p-2">Si-No</th>
                  <th className="border p-1 sm:p-2 text-right">Details</th>
                  <th className="border p-1 sm:p-2 text-right">Qty</th>
                  <th className="border p-1 sm:p-2 text-right">Each</th>
                  <th className="border p-1 sm:p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-1 sm:p-2">1</td>
                  <td className="border p-1 sm:p-2 text-right">Engine</td>
                  <td className="border p-1 sm:p-2 text-right">1</td>
                  <td className="border p-1 sm:p-2 text-right">1,500.00</td>
                  <td className="border p-1 sm:p-2 text-right">$1,500.00</td>
                </tr>
                <tr>
                  <td colSpan="4" className="border p-1 sm:p-2 text-right">
                    Total Amount
                  </td>
                  <td className="border p-1 sm:p-2 text-right font-bold">$1,500.00</td>
                </tr>
                <tr>
                  <td colSpan="4" className="border p-1 sm:p-2 text-right">
                    Discount
                  </td>
                  <td className="border p-1 sm:p-2 text-right font-bold">-$120.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms Section */}
          <div className="p-4">
            <h2 className="font-bold text-[12px] sm:text-[14px]">TERMS</h2>
            <ol className="text-[10px] sm:text-[12px] list-decimal ml-4">
              <li>Your Next Service is After 12 Months or 140,000 km</li>
              <li>Decarbonize your vehicle once a year to keep the engine healthy</li>
              <li>
                If you have queries or complaints regarding our service, feel
                free to contact our technical team
              </li>
            </ol>
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
