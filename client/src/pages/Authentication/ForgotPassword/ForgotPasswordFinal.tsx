/** @format */

import Button from 'components/Button/Button';
import './ForgotPassword.scss';

const ForgotPasswordFinal = () => {
  return (
    <div className='login'>
      <div className='card'>
        <h4>Your password reset is complete</h4>

        <Button label='Login' variant='primary' size='lg' to='/login' />
      </div>
    </div>
  );
};

export default ForgotPasswordFinal;
