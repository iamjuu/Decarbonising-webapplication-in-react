import React from 'react';
import { jsPDF } from 'jspdf';
import { Logoo } from '../../assets';

const InvoiceTemplate = () => {
  const invoiceData = {
    companyDetails: {
      name: "NOS2 ENGINE DECARBONISING",
      gstin: "32AAOFN1627J1Z8",
      phone: "8921339559, 8590602551",
      email: "nos2enginedecarbonising@gmail.com",
      address: "Opp. Aquatics Complex, Near North Bus Stand, Thrissur - 680020",
      state: "32-Kerala"
    },
    customerDetails: {
      name: "SREEVIBURAJ",
      address: "VENKIDANGU",
      contact: "9895278353",
      state: "32-Kerala"
    },
    invoiceDetails: {
      number: "799",
      date: "02-12-2024",
      time: "02:12 PM",
      placeOfSupply: "32-Kerala",
      vehicleType: "BIKE",
      vehicleDetails: "BAJAJ PULSAR RS200",
      vehicleNumber: "KL46S3965"
    },
    items: [
      {
        name: "BIKE STAGE 3",
        quantity: 1,
        price: 2118.64,
        discount: "83.158%",
        gst: "64.23 (18.0%)",
        amount: 421.04
      },
      {
        name: "FUEL LINE CLEANING (LHCE)",
        quantity: 10,
        price: 11.86,
        discount: "0.0%",
        gst: "21.36 (18.0%)",
        amount: 140.00
      },
      {
        name: "NOS2 20W-50 NORMAL",
        quantity: 1.2,
        price: 415.25,
        discount: "0.0%",
        gst: "89.69 (18.0%)",
        amount: 588.00
      },
      {
        name: "BAJAJ PULSAR RS200 OIL FILTER",
        quantity: 1,
        price: 186.44,
        discount: "0.0%",
        gst: "33.56 (18.0%)",
        amount: 220.00
      },
      {
        name: "LABOUR CHARGE",
        quantity: 1,
        price: 296.61,
        discount: "0.0%",
        gst: "53.39 (18.0%)",
        amount: 350.00
      }
    ]
  };

  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4'); // Use A4 paper size (210mm x 297mm)
    
    // Set up the content of the PDF
    doc.setFont('Arial', 'normal');
    
    // Add Company Name
    doc.setFontSize(18);
    doc.text(invoiceData.companyDetails.name, 14, 20);
    doc.setFontSize(10);
    doc.text(`GSTIN: ${invoiceData.companyDetails.gstin}`, 14, 30);
    doc.text(`State: ${invoiceData.companyDetails.state}`, 14, 35);
    
    // Add Invoice Details
    doc.text(`Invoice No.: ${invoiceData.invoiceDetails.number}`, 14, 50);
    doc.text(`Date: ${invoiceData.invoiceDetails.date}`, 14, 55);
    doc.text(`Time: ${invoiceData.invoiceDetails.time}`, 14, 60);
    doc.text(`Place of Supply: ${invoiceData.invoiceDetails.placeOfSupply}`, 14, 65);
    
    // Add Customer Details
    doc.text(`Bill To: ${invoiceData.customerDetails.name}`, 14, 80);
    doc.text(invoiceData.customerDetails.address, 14, 85);
    doc.text(`Contact No.: ${invoiceData.customerDetails.contact}`, 14, 90);
    
    // Add Items Table
    let y = 100;
    doc.text('Item Name', 14, y);
    doc.text('Quantity', 100, y);
    doc.text('Price/Unit', 130, y);
    doc.text('Discount', 160, y);
    doc.text('GST', 190, y);
    doc.text('Amount', 220, y);
    y += 10;

    invoiceData.items.forEach((item, index) => {
      doc.text(item.name, 14, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`₹ ${item.price}`, 130, y);
      doc.text(item.discount, 160, y);
      doc.text(`₹ ${item.gst}`, 190, y);
      doc.text(`₹ ${item.amount}`, 220, y);
      y += 10;
    });

    // Add Total Section
    y += 10;
    doc.text(`Total: ₹ 1,750.00`, 14, y);
    doc.text(`Received: ₹ 1,750.00`, 14, y + 5);
    doc.text(`Balance: ₹ 0.00`, 14, y + 10);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="max-[700px] mx-auto p-8 bg-white">
      {/* Existing invoice layout */}
      <div className="bg-red-600 text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded">
              <img src={Logoo} alt="" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{invoiceData.companyDetails.name}</h1>
              <p className="text-sm">GSTIN: {invoiceData.companyDetails.gstin}</p>
              <p className="text-sm">State: {invoiceData.companyDetails.state}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">Tax Invoice</h2>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      {/* (same layout as before for customer and vehicle details) */}

      {/* Items Table */}
      {/* (same layout as before for items) */}

      {/* Footer */}
      {/* (same layout as before for footer) */}

      {/* Download Button */}
      <div className="text-center mt-8">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
