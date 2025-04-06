import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { Calendar, Clock, MapPin, Camera, Car, Phone, User, Home } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import videoFile from "./../assets/video/videoplayback.mp4";
import Axios from "../Instance/Instance";
import Swal from "sweetalert2";  // Import SweetAlert2

const BookingPage = () => {
  const [view, setView] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const videoRef = useRef(null);
  const validationSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  vehicleModel: Yup.string().required("Vehicle name is required"),
  place: Yup.string().required("Place is required"),
  vehiclenumber: Yup.string()
    .required("Vehicle Number is required")
    .matches(/^[A-Z0-9]+$/, "Vehicle Number must only contain uppercase letters and numbers"),
  vehicleyear: Yup.number()
    .required("Vehicle Year is required")
    .min(1900, "Vehicle year must be after 1900")
    .max(new Date().getFullYear(), "Vehicle year cannot be in the future")
    .integer("Vehicle year must be a whole number")
    .typeError("Vehicle year must be a number"),
  kilometer: Yup.number()
    .required("Vehicle kilometer is required")
    .min(0, "Kilometer reading cannot be negative")
    .max(999999, "Kilometer reading seems too high")
    .integer("Kilometer must be a whole number")
    .typeError("Kilometer must be a number"),
  pickupImage: Yup.mixed().required("Image is required"),
  ...(view === "bookLater" && {
    appointmentDate: Yup.date().required("Appointment date is required"),
  }),
});

  useEffect(() => {
    // Reset form data when switching between views
    if (view) {
      setPreviewImage(null);
      setSelectedDate(null);
    }
    
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [view]);

  const initialValues = {
    full_name: "",
    phone: "",
    vehicleModel: "",
    place: "",
    vehiclenumber: "",
    vehicleyear: "",
    kilometer: "",
    pickupImage: null,
    appointmentDate: null
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      let booking = false;

      if (view === "bookLater" && selectedDate) {
        formData.append("appointmentDate", selectedDate);
        booking = true;
      }
      formData.append("booking", booking.toString());

      const response = await Axios.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for formData
        },
      });

      if (response.status === 200) {  // Check if the response is successful
        resetForm();
        setPreviewImage(null);
        setSelectedDate(null);
        Swal.fire({
          icon: 'success',
          title: 'Booking Submitted',
          text: 'Your booking has been submitted successfully!',
        });
        setView(null);
      } else {
        throw new Error(response.data.message || "Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Error',
        text: error.response?.data?.message || 'Failed to submit booking. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatVehicleNumber = (value) => {
    if (!value) return "";
    return value
      .toUpperCase() // Convert to uppercase
      .replace(/[^A-Z0-9]/g, "") // Remove all non-alphanumeric characters
      .trim(); // Trim whitespace
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("pickupImage", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Clean up object URL when component unmounts or previewImage changes
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // Navigate to home
  const navigateToHome = () => {
    window.location.href = "/"; // Change this to your home route if needed
  };

  const renderForm = (isBookLater) => (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} // This helps with resetting form state
    >
      {({ setFieldValue, isSubmitting, resetForm }) => (
        <Form className="mx-auto max-w-4xl">
          <div className="p-6 mb-6 text-white rounded-lg shadow-2xl backdrop-blur-sm bg-black/80">
            <div className="pb-4 mb-6 border-b border-red-600">
              <h2 className="text-2xl font-bold text-red-500">
                {isBookLater ? "Schedule Your Booking" : "Instant Booking"}
              </h2>
              <p className="text-gray-400">Please fill in your details below</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="flex gap-2 items-center text-red-400">
                    <User size={18} />
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="full_name"
                    className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="full_name" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                <div>
                  <label className="flex gap-2 items-center text-red-400">
                    <Phone size={18} />
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                <div>
                  <label className="flex gap-2 items-center text-red-400">
                    <MapPin size={18} />
                    Place
                  </label>
                  <Field
                    type="text"
                    name="place"
                    className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="place" component="div" className="mt-1 text-sm text-red-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex gap-2 items-center text-red-400">
                    <Car size={18} />
                    Vehicle Details
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      type="text"
                      name="vehicleModel"
                      placeholder="Model"
                      className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <Field
                      type="text"
                      name="vehiclenumber"
                      placeholder="Vehicle Number"
                      className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      onChange={(e) => {
                        const formattedValue = formatVehicleNumber(e.target.value);
                        setFieldValue("vehiclenumber", formattedValue);
                      }}
                    />
                  </div>
                  <ErrorMessage name="vehicleModel" component="div" className="mt-1 text-sm text-red-500" />
                  <ErrorMessage name="vehiclenumber" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-red-400">Year</label>
                    <Field
                      type="text"
                      name="vehicleyear"
                      className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <ErrorMessage name="vehicleyear" component="div" className="mt-1 text-sm text-red-500" />
                  </div>
                  <div>
                    <label className="text-red-400">Kilometers</label>
                    <Field
                      type="text"
                      name="kilometer"
                      className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <ErrorMessage name="kilometer" component="div" className="mt-1 text-sm text-red-500" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex gap-2 items-center text-red-400">
                  <Camera size={18} />
                  Vehicle Image
                </label>
                <input
                  type="file"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  accept="image/*"
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-2 max-h-40 rounded-lg" />
                )}
                <ErrorMessage name="pickupImage" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              {isBookLater && (
                <div className="md:col-span-2">
                  <label className="flex gap-2 items-center text-red-400">
                    <Calendar size={18} />
                    Appointment Date
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setFieldValue("appointmentDate", date);
                    }}
                    minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                    dateFormat="yyyy/MM/dd"
                    className="px-4 py-2 mt-1 w-full bg-gray-900 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="appointmentDate" component="div" className="mt-1 text-sm text-red-500" />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setPreviewImage(null);
                  setSelectedDate(null);
                  setView(null);
                }}
                className="px-6 py-2 text-white bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 text-white bg-red-600 rounded-lg transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Booking"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="overflow-hidden relative min-h-screen">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div className="absolute inset-0 z-10 bg-black/20" /> {/* Overlay */}
        <video
          ref={videoRef} 
          autoPlay
          loop
          muted
          playsInline
          className="object-cover absolute top-0 left-0 w-auto min-w-full h-auto min-h-full"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-12 min-h-screen">
        <div className="mx-auto max-w-4xl">
          {!view ? (
            <div className="space-y-8 text-center">
              {/* Home button */}
              <div className="flex justify-end">
                <button 
                  onClick={navigateToHome}
                  className="flex gap-2 items-center px-4 py-2 text-white bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
                >
                  <Home size={18} />
                  Home
                </button>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">Vehicle Service Booking</h1>
                <p className="text-gray-300">Choose your preferred booking option below</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-lg border border-red-600 shadow-lg backdrop-blur-sm transition-colors bg-black/80 hover:border-red-400">
                  <Clock className="mx-auto mb-4 w-12 h-12 text-red-500" />
                  <h2 className="mb-2 text-xl font-bold text-white">Instant Booking</h2>
                  <p className="mb-4 text-gray-300">Schedule your vehicle service right now</p>
                  <button
                    onClick={() => setView("instantBooking")}
                    className="py-2 w-full text-white bg-red-600 rounded-lg transition-colors hover:bg-red-700"
                  >
                    Book Now
                  </button>
                </div>

                <div className="p-6 rounded-lg border border-red-600 shadow-lg backdrop-blur-sm transition-colors bg-black/80 hover:border-red-400">
                  <Calendar className="mx-auto mb-4 w-12 h-12 text-red-500" />
                  <h2 className="mb-2 text-xl font-bold text-white">Schedule Appointment</h2>
                  <p className="mb-4 text-gray-300">Plan your service for a future date</p>
                  <button
                    onClick={() => setView("bookLater")}
                    className="py-2 w-full text-white bg-red-600 rounded-lg transition-colors hover:bg-red-700"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg shadow-2xl backdrop-blur-sm bg-black/80">
              {renderForm(view === "bookLater")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

