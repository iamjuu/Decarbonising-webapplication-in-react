import React, { useState, useEffect ,useRef} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { Calendar, Clock, MapPin, Camera, Car, Phone, User } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import videoFile from "./../assets/video/videoplayback.mp4";
import axios from "axios";
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
      .matches(/^\d+$/, "Phone number must only contain digits"),
    vehicleModel: Yup.string().required("Vehicle name is required"),
    place: Yup.string().required("Place is required"),
    vehiclenumber: Yup.string()
      .required("Vehicle Number is required")
      .matches(/^[A-Z0-9]+$/, "Vehicle Number must only contain uppercase letters and numbers"),
    vehicleyear: Yup.string().required("Vehicle Year is required"),
    kilometer: Yup.string().required("Vehicle kilometer is required"),
    pickupImage: Yup.mixed().required("Image is required"),
    ...(view === "bookLater" && {
      appointmentDate: Yup.date().required("Appointment date is required")
    })
  });

  useEffect(() => {
    // Pause video when the view is not null (form is being shown)
    if (view) {
      console.log("useffect worked")
      if (videoRef.current) {
        videoRef.current.play();
      }
    }else{
      if (videoRef.current) {
        videoRef.current.play();
      }


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

      const response = await axios.post("http://localhost:7000/register", formData, {
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

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const renderForm = (isBookLater) => (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="max-w-4xl mx-auto">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl p-6 mb-6 text-white">
            <div className="border-b border-red-600 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-red-500">
                {isBookLater ? "Schedule Your Pickup" : "Instant Pickup"}
              </h2>
              <p className="text-gray-400">Please fill in your details below</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-red-400">
                    <User size={18} />
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="full_name"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="full_name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-red-400">
                    <Phone size={18} />
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-red-400">
                    <MapPin size={18} />
                    Place
                  </label>
                  <Field
                    type="text"
                    name="place"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="place" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-red-400">
                    <Car size={18} />
                    Vehicle Details
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      type="text"
                      name="vehicleModel"
                      placeholder="Model"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <Field
                      type="text"
                      name="vehiclenumber"
                      placeholder="Vehicle Number"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      onChange={(e) => {
                        const formattedValue = formatVehicleNumber(e.target.value);
                        setFieldValue("vehiclenumber", formattedValue);
                      }}
                    />
                    <ErrorMessage name="vehiclenumber" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <ErrorMessage name="vehicleModel" component="div" className="text-red-500 text-sm mt-1" />
                  <ErrorMessage name="vehiclenumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-red-400">Year</label>
                    <Field
                      type="text"
                      name="vehicleyear"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <ErrorMessage name="vehicleyear" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="text-red-400">Kilometers</label>
                    <Field
                      type="text"
                      name="kilometer"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <ErrorMessage name="kilometer" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-red-400">
                  <Camera size={18} />
                  Vehicle Image
                </label>
                <input
                  type="file"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  accept="image/*"
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-2 max-h-40 rounded-lg" />
                )}
                <ErrorMessage name="pickupImage" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {isBookLater && (
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-red-400">
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
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage name="appointmentDate" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setView(null)}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay */}
        <video
        ref={videoRef} 
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {!view ? (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">Vehicle Service Booking</h1>
                <p className="text-gray-300">Choose your preferred booking option below</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 ">
                <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-red-600 hover:border-red-400 transition-colors ">
                  <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-white mb-2">Instant Booking</h2>
                  <p className="text-gray-300 mb-4">Schedule your vehicle service right now</p>
                  <button
                    onClick={() => setView("instantBooking")}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-red-600 hover:border-red-400 transition-colors">
                  <Calendar className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-white mb-2">Schedule Appointment</h2>
                  <p className="text-gray-300 mb-4">Plan your service for a future date</p>
                  <button
                    onClick={() => setView("bookLater")}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl">
              {renderForm(view === "bookLater")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;