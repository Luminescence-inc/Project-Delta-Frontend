/** @format */

import { Link } from 'react-router-dom';
import EyeIcon from 'assets/icons/eye-icon.svg?react';
import MailIcon from 'assets/icons/mail-icon.svg?react';
import ContactIcon from 'assets/icons/contact-icon.svg?react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { useFormik } from "formik";
import { SignUpResponse, SignUpData, TOKEN_NAME, LogInResponse } from 'types/auth';
import { registerUser } from 'api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string().min(1, "Enter valid First Name").required("First Name is required!"),
  lastName: yup.string().min(1, "Enter valid Last Name").required("Last Name is required!"),
  email: yup.string().email("Enter valid email").required(),
  password: yup.string().required("Please Enter your password"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required')
})


const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const onSubmit = async (values: SignUpData) => {
    const {confirmPassword, ...data} = values;
    try {
      const res = await registerUser(data)
      .catch((err)=>{
        const errorResponse:LogInResponse = err.response.data;

        // Set error message
        const errorCode = errorResponse?.message.code; 
        if(errorCode == 409){
          setErrorMessage(errorResponse?.message.desc)
        }else{
          setErrorMessage("error occured while login")
        }
        setError(true);
        console.error(err);
      });
      const resData: SignUpResponse = res?.data;

      if(res && resData?.success){
        // setToken
        localStorage.setItem(TOKEN_NAME, resData.data.token.split(' ')[1]);

        // route to verify-account
        navigate('/verify-account');
        window.location.reload();

      }else{
        // Set error message
        setError(true);
      }

    } catch (err) {
      setError(true);
      console.error(err);
      setErrorMessage("error occured while login");
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: "", 
      lastName: "", 
      email: "",
      password: "",
      confirmPassword: ""
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema
  });

  return (
    <div className='signup'>
      <div className='card'>
        <h4>Quick write about signing up</h4>
        
        {/* Display Error message */}
        {error && (<span>{errorMessage}</span>)}
        
        <form onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            label='First Name'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            icon={<ContactIcon className='input-icon' />}
            onBlur={formik.handleBlur}
            placeholder='Enter First Name'
          />
          <span>{formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : ""}</span>

          <Input
            type='text'
            label='Last Name'
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={<ContactIcon className='input-icon' />}
            placeholder='Enter Last Name'
          />
          <span>{formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : ""}</span>

          <Input
            type='email'
            label='Email Address'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={<MailIcon className='input-icon' />}
            placeholder='Enter Email Address'
          />
          <span>{formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}</span>

          <Input
            type={!showPassword? 'password': 'text'}
            label='Email Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={<div onClick={()=> setShowPassword(!showPassword)}><EyeIcon className='input-icon' /></div>}
            placeholder='Enter Password'
          />
          <span>{formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}</span>

          <Input
            type={!showConfirmPassword? 'password': 'text'}
            label='Confirm Password'
            name='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={<div onClick={()=> setShowConirmPassword(!showConfirmPassword)}><EyeIcon className='input-icon' /></div>}
            placeholder='Enter Password'
          />
          <span>{formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""}</span>

          <div className='confirm-terms'>
            <input type='checkbox' />
            <p>
              By clicking Sign Up you agree to our{' '}
              <span>Terms and Conditions</span> and that you have read our{' '}
              <span>Privacy Policy</span>
            </p>
          </div>

          <Button
            type='submit'
            label='Submit'
            variant='primary'
            size='lg'
            // to='/signup/business-profile'
          />
        </form>

        <p className='no-account'>
          Have an Account?{' '}
          <Link to='/login'>
            <span>Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

// (e)=>{formik.setFieldValue("firstName",e.target.value)}