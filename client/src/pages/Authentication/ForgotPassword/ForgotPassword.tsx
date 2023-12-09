/** @format */

import EyeIcon from 'assets/icons/eye-icon.svg?react';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import './ForgotPassword.scss';
import * as yup from "yup";
import { BaseResponseMessage, ResetPasswordData } from 'types/auth';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { resetUserPassword } from 'api/auth';

const validationSchema = yup.object({
  password: yup.string().required("Please Enter your password"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required')
})


const ForgotPassword = () => {
  let { userId, uniqueString } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConirmPassword] = useState(false);

  const onSubmit = async (values: ResetPasswordData) => {
    // to='/forgot-password-final'
    try {
      const res = await resetUserPassword(userId as string, uniqueString as string, values)
      .catch((err)=>{
        const errorResponse: BaseResponseMessage = err.response.data;

        // Set error message
        const errorCode = errorResponse?.message.code; 
        if(errorCode == 499){
          setErrorMessage(errorResponse?.message.desc)
        }else{
          setErrorMessage("error occured while resetting password")
        }
        setError(true);
        console.error(err);
      });

      const resData: BaseResponseMessage = res?.data;

      if(resData?.success){
        // route to forgot-password-final
        navigate('/forgot-password-final');
        setError(false);
        // window.location.reload();

      }

    } catch (error) {
      setError(true);
      setErrorMessage("error occured while resetting password")
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema
  });

  return (
    <div className='forgot-password'>
      <div className='card'>
        <h4>Reset password</h4>
        
        {/* Display Error message */}
        {error && (<span>{errorMessage}</span>)}

        <form onSubmit={formik.handleSubmit}>
          <Input
            type={!showPassword? 'password': 'text'}
            label='Enter new password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={<div onClick={()=> setShowPassword(!showPassword)}><EyeIcon className='input-icon' /></div>}
            placeholder='Enter password'
          />
          <span>{formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}</span>

          <Input
            type={!showConfirmPassword? 'password': 'text'}
            label='Re-enter Password'
            name='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={<div onClick={()=> setShowConirmPassword(!showConfirmPassword)}><EyeIcon className='input-icon' /></div>}
            placeholder='Re-Enter Password'
          />
          <span>{formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""}</span>

          <Button
           type='submit'
            label='Confirm Password'
            variant='primary'
            size='lg'
          />
        </form>
        
      </div>
    </div>
  );
};

export default ForgotPassword;
