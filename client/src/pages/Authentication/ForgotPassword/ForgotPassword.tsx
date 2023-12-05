/** @format */

import EyeIcon from 'assets/icons/eye-icon.svg?react';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  return (
    <div className='forgot-password'>
      <div className='card'>
        <h4>Reset password</h4>

        <Input
          type='password'
          label='Enter new password'
          icon={<EyeIcon className='input-icon' />}
          placeholder='Enter password'
        />

        <Input
          type='password'
          label='Re-enter Password'
          icon={<EyeIcon className='input-icon' />}
          placeholder='Re-Enter Password'
        />

        <Button
          label='Confirm Password'
          variant='primary'
          size='lg'
          to='/forgot-password-final'
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
