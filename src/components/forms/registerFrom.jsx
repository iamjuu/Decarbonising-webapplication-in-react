import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "../../Instance/Instance"; // Assuming Axios instance for backend communication
import Swal from "sweetalert2";

// Validation schema using Yup
const validationSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  phone: Yup.number().required("Phone number is required"),
  place: Yup.string().required("Place is required"),
  vehiclenumber: Yup.string().required("Vehicle Number is required"),
  time: Yup.string().required("Time is required"),
  pickupImage: Yup.mixed().required("Image is required"),
});

// Initial form values
const initialValues = {
  full_name: "",
  phone: "",
  place: "",
  vehiclenumber: "",
  vehicleyear:"",
  time: "",
  pickupImage: null,
};

// Submit handler
const handleSubmit = async (values, { resetForm, setSubmitting }) => {
  try {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("phone", values.phone);
    formData.append("place", values.place);
    formData.append("vehiclenumber", values.vehiclenumber);
    formData.append("vehicleyear",values.vehicleyear)
    formData.append("time", values.time);
    formData.append("pickupImage", values.pickupImage);

    const response = await Axios.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      resetForm();
      Swal.fire({
        title: "Success",
        text: "Pickup request submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to submit the pickup request. Please try again later.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
  setSubmitting(false); // Ensure the submitting state is set back to false after submission
};

const Pickup = () => {
  const [previewImage, setPreviewImage] = useState(null);

  // Clean up image preview on component unmount
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // Handle image change and set the field value
  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("pickupImage", file);
    setPreviewImage(URL.createObjectURL(file));
  };

<<<<<<< HEAD
  // Submit handler
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // Manually convert vehicle number to uppercase before submitting
    const formattedVehicleNumber = values.vehiclenumber.toUpperCase();

    // Check the format with regex before submitting
    if (!/^[A-Z0-9]+$/.test(formattedVehicleNumber)) {
      Swal.fire({
        title: "Error",
        text: "Vehicle number must only contain uppercase letters and numbers",
        icon: "error",
        confirmButtonText: "OK",
      });
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("full_name", values.full_name);
      formData.append("phone", values.phone);
      formData.append("place", values.place);
      formData.append("vehiclenumber", formattedVehicleNumber);
      formData.append("pickupImage", values.pickupImage);

      const response = await Axios.post("/Nso2/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        resetForm();
        Swal.fire({
          title: "Success",
          text: "Pickup request submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Redirect to homepage after successful form submission
        navigate("/");  // This will redirect to the homepage
      }
    } catch (error) {
      
      console.log(error)
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    setSubmitting(false); // Ensure the submitting state is set back to false after submission
  };

=======
>>>>>>> 1f6b319d1650ba0f1e32f4afc8157ba6d3a625fe
  return (
    <div className="p-6 bg-white mt-24 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="full_name">Full Name</label>
                        <Field
                          type="text"
                          name="full_name"
                          id="full_name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        <ErrorMessage
                          name="full_name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="phone">Phone number</label>
                        <Field
                          type="number"
                          name="phone"
                          id="phone"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Phone number"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="place">Place</label>
                        <Field
                          type="text"
                          name="place"
                          id="place"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        <ErrorMessage
                          name="place"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="vehiclenumber">Vehicle Number</label>
                        <Field
                          type="text"
                          name="vehiclenumber"
                          id="vehiclenumber"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
<<<<<<< HEAD
=======
                          style={{ textTransform: "uppercase" }}
                          onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
>>>>>>> 1f6b319d1650ba0f1e32f4afc8157ba6d3a625fe
                        />
                        <ErrorMessage
                          name="vehiclenumber"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="vehicleyear">Vehicle Year</label>
                        <Field
                          type="text"
                          name="vehicleyear"
                          id="vehicleyear"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          style={{ textTransform: "uppercase" }}
                          onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                        />
                        <ErrorMessage
                          name="vehicleyear"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="time">Time</label>
                        <Field
                          type="time"
                          name="time"
                          id="time"
                          min="12:00"
                          max="19:00"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        <ErrorMessage
                          name="time"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="pickupImage">Upload Image of Items</label>
                        <input
                          type="file"
                          name="pickupImage"
                          id="pickupImage"
                          accept="image/*;capture=camera"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={(event) => handleImageChange(event, setFieldValue)}
                        />
                        <ErrorMessage
                          name="pickupImage"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Image */}
                <div className="mt-4  flex justify-center">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-auto object-contain rounded"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Pickup;
