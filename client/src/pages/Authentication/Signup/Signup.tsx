/** @format */

import { Link } from 'react-router-dom';
import EyeIcon from 'assets/icons/eye-icon.svg?react';
import MailIcon from 'assets/icons/mail-icon.svg?react';
import ContactIcon from 'assets/icons/contact-icon.svg?react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import './Signup.scss';

const Signup = () => {
  return (
    <div className='signup'>
      <div className='card'>
        <h4>Quick write about signing up</h4>

        <Input
          type='text'
          label='First Name'
          icon={<ContactIcon className='input-icon' />}
          placeholder='Enter First Name'
        />

        <Input
          type='text'
          label='Last Name'
          icon={<ContactIcon className='input-icon' />}
          placeholder='Enter Last Name'
        />

        <Input
          type='email'
          label='Email Address'
          icon={<MailIcon className='input-icon' />}
          placeholder='Enter Email Address'
        />

        <Input
          type='password'
          label='Email Password'
          icon={<EyeIcon className='input-icon' />}
          placeholder='Enter Password'
        />

        <Input
          type='password'
          label='Confirm Password'
          icon={<EyeIcon className='input-icon' />}
          placeholder='Enter Password'
        />

        <div className='confirm-terms'>
          <input type='checkbox' />
          <p>
            By clicking Sign Up you agree to our{' '}
            <span>Terms and Conditions</span> and that you have read our{' '}
            <span>Privacy Policy</span>
          </p>
        </div>

        <Button
          label='Submit'
          variant='primary'
          size='lg'
          to='/signup/business-profile'
        />

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
