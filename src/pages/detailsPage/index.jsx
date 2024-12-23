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
      state: "32-Kerala",
    },
    customerDetails: {
      name: "SREEVIBURAJ",
      address: "VENKIDANGU",
      contact: "9895278353",
      state: "32-Kerala",
    },
    invoiceDetails: {
      number: "799",
      date: "02-12-2024",
      time: "02:12 PM",
      placeOfSupply: "32-Kerala",
      vehicleType: "BIKE",
      vehicleDetails: "BAJAJ PULSAR RS200",
      vehicleNumber: "KL46S3965",
    },
    items: [
      {
        name: "BIKE STAGE 3",
        quantity: 1,
        price: 2118.64,
        discount: "83.158%",
        gst: "64.23 (18.0%)",
        amount: 421.04,
      },
      {
        name: "FUEL LINE CLEANING (LHCE)",
        quantity: 10,
        price: 11.86,
        discount: "0.0%",
        gst: "21.36 (18.0%)",
        amount: 140.0,
      },
      {
        name: "NOS2 20W-50 NORMAL",
        quantity: 1.2,
        price: 415.25,
        discount: "0.0%",
        gst: "89.69 (18.0%)",
        amount: 588.0,
      },
      {
        name: "BAJAJ PULSAR RS200 OIL FILTER",
        quantity: 1,
        price: 186.44,
        discount: "0.0%",
        gst: "33.56 (18.0%)",
        amount: 220.0,
      },
      {
        name: "LABOUR CHARGE",
        quantity: 1,
        price: 296.61,
        discount: "0.0%",
        gst: "53.39 (18.0%)",
        amount: 350.0,
      },
    ],
  };

  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4'); // A4 paper size

    // Set background color (for header)
    doc.setFillColor(234, 67, 53); // Red background
    doc.rect(0, 0, 210, 30, 'F'); // Create a background for the header

    // Add company name and details
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // White text for header
    doc.text(invoiceData.companyDetails.name, 14, 20);
    doc.setFontSize(10);
    doc.text(`GSTIN: ${invoiceData.companyDetails.gstin}`, 14, 25);
    doc.text(`State: ${invoiceData.companyDetails.state}`, 14, 30);

    // Add invoice details
    doc.setTextColor(0, 0, 0); // Black text for the rest
    doc.text(`Invoice No.: ${invoiceData.invoiceDetails.number}`, 14, 50);
    doc.text(`Date: ${invoiceData.invoiceDetails.date}`, 14, 55);
    doc.text(`Time: ${invoiceData.invoiceDetails.time}`, 14, 60);
    doc.text(`Place of Supply: ${invoiceData.invoiceDetails.placeOfSupply}`, 14, 65);

    // Add customer details
    doc.text(`Bill To: ${invoiceData.customerDetails.name}`, 14, 80);
    doc.text(invoiceData.customerDetails.address, 14, 85);
    doc.text(`Contact No.: ${invoiceData.customerDetails.contact}`, 14, 90);

    // Create a table for items
    let y = 100;
    doc.setFontSize(10);
    doc.text('Item Name', 14, y);
    doc.text('Quantity', 100, y);
    doc.text('Price/Unit', 130, y);
    doc.text('Discount', 160, y);
    doc.text('GST', 190, y);
    doc.text('Amount', 220, y);
    y += 10;

    // Table rows for each item
    invoiceData.items.forEach((item, index) => {
      doc.text(item.name, 14, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`₹ ${item.price.toFixed(2)}`, 130, y);
      doc.text(item.discount, 160, y);
      doc.text(`₹ ${item.gst}`, 190, y);
      doc.text(`₹ ${item.amount.toFixed(2)}`, 220, y);
      y += 10;
    });

    // Add total, received, and balance info
    y += 10;
    doc.text(`Total: ₹ 1,750.00`, 14, y);
    doc.text(`Received: ₹ 1,750.00`, 14, y + 5);
    doc.text(`Balance: ₹ 0.00`, 14, y + 10);

    // Save the PDF as 'invoice.pdf'
    doc.save('invoice.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="bg-red-600 text-white p-6 rounded-t-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={Logoo} alt="Logo" className="w-16 h-16 rounded" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {invoiceData.companyDetails.name}
              </h1>
              <p className="text-sm">GSTIN: {invoiceData.companyDetails.gstin}</p>
              <p className="text-sm">State: {invoiceData.companyDetails.state}</p>
            </div>
          </div>
          <div className="text-center sm:text-right mt-4 sm:mt-0">
            <h2 className="text-lg sm:text-2xl font-bold">Tax Invoice</h2>
          </div>
        </div>
      </div>

      {/* Customer and Invoice Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Bill To:</h3>
          <p>{invoiceData.customerDetails.name}</p>
          <p>{invoiceData.customerDetails.address}</p>
          <p>Contact: {invoiceData.customerDetails.contact}</p>
        </div>
        <div>
          <h3 className="font-semibold">Invoice Details:</h3>
          <p>Invoice No.: {invoiceData.invoiceDetails.number}</p>
          <p>Date: {invoiceData.invoiceDetails.date}</p>
          <p>Time: {invoiceData.invoiceDetails.time}</p>
          <p>Place of Supply: {invoiceData.invoiceDetails.placeOfSupply}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="table-auto w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Item Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price/Unit</th>
              <th className="border px-4 py-2">Discount</th>
              <th className="border px-4 py-2">GST</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">₹ {item.price.toFixed(2)}</td>
                <td className="border px-4 py-2">{item.discount}</td>
                <td className="border px-4 py-2">{item.gst}</td>
                <td className="border px-4 py-2">₹ {item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="mt-6 text-right">
        <p>Total: ₹ 1,750.00</p>
        <p>Received: ₹ 1,750.00</p>
        <p>Balance: ₹ 0.00</p>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
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
