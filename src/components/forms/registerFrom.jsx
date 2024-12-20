import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "../../Instance/Instance"; // Assuming Axios instance for backend communication
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Validation schema using Yup
const validationSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  phone: Yup.number().required("Phone number is required"),
  place: Yup.string().required("Place is required"),
  vehiclenumber: Yup.string()
    .matches(/^[A-Z0-9]+$/, "Vehicle number must only contain uppercase letters and numbers")
    .required("Vehicle Number is required"),
  pickupImage: Yup.mixed().required("Image is required"),
});

// Initial form values
const initialValues = {
  full_name: "",
  phone: "",
  place: "",
  vehiclenumber: "",
  pickupImage: null,
};

const Pickup = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate(); // Use the navigate hook

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

  // Handle vehicle number change (uppercase and numbers only)
  const handleVehicleNumberChange = (event, setFieldValue) => {
    const formattedValue = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Allow only uppercase and numbers
    setFieldValue("vehiclenumber", formattedValue);
  };

  // Submit handler
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("full_name", values.full_name);
      formData.append("phone", values.phone);
      formData.append("place", values.place);
      formData.append("vehiclenumber", values.vehiclenumber);
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

  return (
    <div className="p-6 bg-white mt-24 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)} // Pass navigate to handleSubmit
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
                          style={{ textTransform: "uppercase" }}
                          onInput={(e) => handleVehicleNumberChange(e, setFieldValue)} // Handle input to format as uppercase and numbers only
                        />
                        <ErrorMessage
                          name="vehiclenumber"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      {/* Removed time input as requested */}

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
                <div className="mt-4 flex justify-center">
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
