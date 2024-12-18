import React from 'react';

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

  return (
    <div className="max-[700px] mx-auto p-8 bg-white">
      {/* Header */}
      <div className="bg-red-600 text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-black rounded"></div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 border-x border-gray-200">
        <div>
          <h3 className="font-bold mb-2">Bill To</h3>
          <p className="font-bold">{invoiceData.customerDetails.name}</p>
          <p>{invoiceData.customerDetails.address}</p>
          <p>Contact No.: {invoiceData.customerDetails.contact}</p>
          <p>State: {invoiceData.customerDetails.state}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Invoice No.:</p>
            <p className="font-semibold">Date:</p>
            <p className="font-semibold">Time:</p>
            <p className="font-semibold">Place of Supply:</p>
          </div>
          <div>
            <p>{invoiceData.invoiceDetails.number}</p>
            <p>{invoiceData.invoiceDetails.date}</p>
            <p>{invoiceData.invoiceDetails.time}</p>
            <p>{invoiceData.invoiceDetails.placeOfSupply}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="bg-gray-50 p-4 border-x border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="font-semibold">Vehicle Type: </span>
            <span>{invoiceData.invoiceDetails.vehicleType}</span>
          </div>
          <div>
            <span className="font-semibold">Vehicle Details: </span>
            <span>{invoiceData.invoiceDetails.vehicleDetails}</span>
          </div>
          <div>
            <span className="font-semibold">Vehicle Number: </span>
            <span>{invoiceData.invoiceDetails.vehicleNumber}</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="border-x border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-2 text-left">Item name</th>
                <th className="p-2 text-right">Quantity</th>
                <th className="p-2 text-right">Price/Unit</th>
                <th className="p-2 text-right">Discount</th>
                <th className="p-2 text-right">GST</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-right">{item.quantity}</td>
                  <td className="p-2 text-right">₹ {item.price}</td>
                  <td className="p-2 text-right">{item.discount}</td>
                  <td className="p-2 text-right">₹ {item.gst}</td>
                  <td className="p-2 text-right">₹ {item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="p-6 border-x border-b border-gray-200">
        <h3 className="font-bold mb-2">Terms And Conditions</h3>
        <ul className="text-sm space-y-1">
          <li>Congratulation for choosing NOS2 ENGINE DECARBONISING..!</li>
          <li>15 - 30km must be driven after decarbonising service.</li>
          <li>Feedback should be shared within 2-4 days (8590602551).</li>
          <li>Black smoke destroys vehicle, human and nature alike.</li>
          <li>It is our responsibility to reduce pollution!!</li>
          <li>A small step to the green future !!</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-end p-6 border-t border-gray-200">
        <div>
          <p className="font-bold mb-2">For: {invoiceData.companyDetails.name}</p>
          <p className="mt-16">Authorized Signatory</p>
        </div>
        <div className="text-right">
          <div className="space-y-1">
            <p>Sub Total: ₹ 3,218.64</p>
            <p>Discount: ₹ 1,761.83</p>
            <p>SGST@9.0%: ₹ 131.11</p>
            <p>CGST@9.0%: ₹ 131.11</p>
            <p>Swiping Charge: ₹ 30.97</p>
            <p>Round off: -₹ 0.01</p>
            <p className="font-bold">Total: ₹ 1,750.00</p>
            <p>Received: ₹ 1,750.00</p>
            <p>Balance: ₹ 0.00</p>
            <p className="text-red-600">You Saved: ₹ 2,078.96</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
  