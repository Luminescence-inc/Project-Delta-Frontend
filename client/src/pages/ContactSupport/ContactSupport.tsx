import { useState } from "react";
import ContactSupportIcon from "assets/icons/contact-support-icon.svg?react";
import Spinner from "components/Spinner/Spinner";
import Modal from "react-modal";
import {
  ContactSupportDataSchema,
  // ContactSupportResponse,
} from "types/business";
import { BaseResponseMessage } from "types/auth";
import { submitContactRequest } from "api/business";
import { useFormik, FormikHelpers } from "formik";

import * as yup from "yup";
import "./ContactSupport.scss";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

const validationSchema = yup.object({
  personName: yup
    .string()
    .min(1, "Enter valid Name")
    .required("First Name is required!"),
  email: yup.string().email("Enter valid email").required(),
  phoneNumber: yup
    .string()
    .matches(/^\+(?:[0-9]\s?){6,14}[0-9]$/, "Invalid phone number"),
  problemDescription: yup
    .string()
    .min(1, "Describe the issue you are having")
    .required("Issue description is required"),
});

const ContactSupport = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [successMessage, setSuccessMessage] = useState<String | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (
    values: ContactSupportDataSchema,
    { resetForm }: FormikHelpers<ContactSupportDataSchema>
  ) => {
    setIsLoading(true);
    console.log("Submission occured ", values);
    try {
      const res = await submitContactRequest(values).catch((err) => {
        const errorResponse: BaseResponseMessage = err.response.data;
        // Set error message
        const errorCode = errorResponse?.message.code;
        if (errorCode == 409) {
          setErrorMessage(errorResponse?.message.desc);
        } else {
          setErrorMessage("error occured while login");
        }
        setError(true);
        console.error("The Error that occured is " + err);
        setIsLoading(false);
      });
      const resData: BaseResponseMessage = res?.data;
      setSuccessMessage(resData?.message?.desc);
      resetForm();
      setIsModalOpen(true);
      console.log(resData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.error(err);
      setErrorMessage("error occured while login");
    }
  };

  const formik = useFormik({
    initialValues: {
      personName: "",
      email: "",
      phoneNumber: "",
      problemDescription: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  // Custom Styles
  const errorMessageStyle = {
    color: "red",
    display: "flex",
    fontSize: "13px",
  };

  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-90%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90%",
      maxHeight: "80vh",
      overflow: "auto",
    },
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  };

  const submitErrorMessageStyle = {
    color: "red",
    fontSize: "13px",
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contact-support">
      <header>
        <h2>Contact Support</h2>
      </header>

      <div className="card_board">
        <div className="card_board__contact-support-icon-container">
          <div className="contact-support-icon-border">
            <ContactSupportIcon />
          </div>
        </div>
        <h4>Please complete support form</h4>

        {/* Display Error message */}
        {error && <span style={submitErrorMessageStyle}>{errorMessage}</span>}
        <form onSubmit={formik.handleSubmit}>
          <span style={errorMessageStyle}>
            {formik.touched.personName ? formik.errors.personName : ""}
          </span>
          <Input
            type="text"
            label="Name"
            name="personName"
            value={formik.values.personName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Name"
          />
          <span style={errorMessageStyle}>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
          </span>
          <Input
            type="text"
            label="Your Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Your Email"
          />
          <span style={errorMessageStyle}>
            {formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ""}
          </span>
          <Input
            type="text"
            label="Your Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Your Phone Number"
          />
          <span style={errorMessageStyle}>
            {formik.touched.problemDescription &&
            formik.errors.problemDescription
              ? formik.errors.problemDescription
              : ""}
          </span>
          <div className="form-group">
            <label htmlFor="">Describe problem</label>
            <textarea
              name="problemDescription"
              value={formik.values.problemDescription}
              onChange={formik.handleChange}
              rows={4}
              placeholder="describe the issue you are having"
            />
          </div>
          {!isLoading && (
            <Button
              type="submit"
              label="Submit Request"
              variant="primary"
              size="lg"
            />
          )}
          {isLoading && (
            <Button
              type="submit"
              label={Spinner()}
              variant="primary"
              size="lg"
              disabled={true}
            />
          )}
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        style={customStyles}
      >
        <div className="modal">
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            {successMessage && successMessage}
            {errorMessage && errorMessage}
          </h2>
        </div>
      </Modal>
    </div>
  );
};

export default ContactSupport;
