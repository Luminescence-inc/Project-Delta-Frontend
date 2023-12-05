/** @format */

import Button from 'components/Button/Button';
import '../ForgotPassword/ForgotPassword.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { verifyUserAccount } from 'api/auth';
import { BaseResponseMessage } from 'types/auth';


const VerifiedEmail = () => {
  const { userId, uniqueString } = useParams();
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  
  useEffect(()=>{
    try {
      verifyUserAccount(userId as string, uniqueString as string)
      .catch((err)=>{
        const errorResponse: BaseResponseMessage = err.response.data;
  
        // Set error message
        const errorCode = errorResponse?.message.code; 
        if(errorCode == 499){
          setErrorMessage(errorResponse?.message.desc)
        }else{
          setErrorMessage("error occured while verifying acount")
        }
        setError(true);
        console.error(err);
      })
      .then((res)=>{
        const resData: BaseResponseMessage = res?.data;
        if(resData?.success){
          setVerified(true);
        }
      })
    } catch (error) {
      setError(true);
      setErrorMessage("error occured while verifying acount")
    }
  },[])

  return (
    <div className='login'>
      <div className='card'>
        {verified && (
            <>
              <h4>Your Account is Verified</h4>
              <Button label='Login' variant='primary' size='lg' to='/login' />
            </>
        )}
        {/* Display Error message */}
        {!verified && error && (
          <>
            <h4>Your Account is not Verified</h4>
            <span>Error: {errorMessage}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifiedEmail;
