
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import {Pic1,Logoo} from '../../assets'
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function Invoice() {
  const printRef = React.useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref={printRef} className="p-8 bg-white border  border-gray-200">
          <div className="flex  border-b border-gray-400 mb-3  justify-between">
<div>  <img className="w-16" src={Logoo} alt="" /></div>
<div>
  <div  className=" flex flex-col gap-5 ">
    <div  className="text-center">
     <h2 className="text-red-500">Nos2 DECARBONISING</h2>
  <h4 className="text-[12px] text-red-500">BIKE AND CAR  - ALL VEHICLE</h4>
    </div>
    <div className="flex gap-1 mb-3 flex-col  ">
      {/* Instagram */}
      <div className="flex items-center space-x-4">
        <FaInstagram className="text-pink-600 text-xl" />
        <span className="text-gray-700   text-[12px] font-semibold">nos2kannur_enginedecarbonising</span>
      </div>

      {/* Facebook */}
      <div className="flex items-center space-x-4">
        <CgWebsite className="text-blue-600 text-xl" />
        <span className="text-gray-700   text-[12px] font-semibold">www.Nos2Decarbanising.com</span>
      </div>

      {/* WhatsApp */}
      <div className="flex items-center space-x-4">
        <FaWhatsapp className="text-green-600 text-xl" />
        <span className="text-gray-700  text-[12px] font-semibold">7025715250</span>
      </div>
    </div>
  </div>
  </div>     

     </div>
          <div className="flex justify-between    items-center mb-8">
            <div>
           <p className="text-[13px]">Owner Name:Muhammed ajmal</p>
           <p className="text-[13px]">Phone: 7025715250</p>
           <p className="text-[13px]">Vehicle Number: KL 13 AQ 1596</p>

            </div>
            <div className="text-right">
             <p  className="text-[13px]">Date:  31/12/2024</p>
             <p className="text-[13px]">Time  11:30 </p>
             <p className="text-[13px]">Invoice No: 12dsd442</p>
            </div>
          </div>

          <div className="mb-8   justify-between flex ">
            <div className=" w-36 ">
              <div className="flex justify-between">
<p  className="text-[13px]">year  </p>
<p className="text-[13px]  font-bold">2012</p>
 </div>

 <div className="flex justify-between">
<p  className="text-[13px]">Vehicle Model  </p>
<p className="text-[13px]  font-bold">Bike</p>
 </div>

 <div className="flex justify-between">
<p  className="text-[13px]">Kilometer </p>
<p className="text-[13px]  font-bold">120000</p>
 </div>

 <div className="flex justify-between">
<p  className="text-[13px]">Fuel  </p>
<p className="text-[13px]  font-bold">Petrol</p>
 </div>

 <div className="flex justify-between">
<p  className="text-[13px]">Smoke </p>
<p className="text-[13px]  font-bold">Normal</p>
 </div>

 <div className="flex justify-between">
<p  className="text-[13px]">LHCE USED </p>  
<p className="text-[13px]  font-bold">60 Ml</p>        
 </div>
            </div>
            <div>
              <img className="w-24" src={Pic1} alt="" />
            </div>

          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Si-No</th>
                <th className="border p-2 text-right">Details</th>
                <th className="border p-2 text-right">Qty</th>
                <th className="border p-2 text-right">Each</th>
                <th className="border p-2 text-right"> Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1</td>
                <td className="border p-2 text-right">engine</td>
                <td className="border p-2 text-right">1</td>
                <td className="border p-2 text-right">1,500.00</td>
                <td className="border p-2 text-right">$1,500.00</td>  
            </tr>
            <tr>
  <td className="border p-2 text-right" colSpan={4}>
    Total Amount
  </td>
  
  <td className="border p-2 text-right font-bold">$1,500.00</td>
</tr>
  <p> Discount   120/-</p>

<div>
  <h2>Teams</h2>
</div>
            
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
            
          
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}