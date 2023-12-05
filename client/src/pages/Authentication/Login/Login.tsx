/** @format */
import { Link } from 'react-router-dom';
import EyeIcon from 'assets/icons/eye-icon.svg?react';
import MailIcon from 'assets/icons/mail-icon.svg?react';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import './Login.scss';

const Login = () => {
  return (
    <div className='login'>
      <div className='card'>
        <h4>Sign in</h4>

        <Input
          type='email'
          label='Email Address'
          icon={<MailIcon className='input-icon' />}
          placeholder='Enter Email Address'
        />

        <Input
          type='password'
          label='Password'
          icon={<EyeIcon className='input-icon' />}
          placeholder='Enter Password'
        />

        <Button label='Submit' variant='primary' size='lg' />

        <Link className='forgot' to='/forgot-password'>
          <p>Forgot password?</p>
        </Link>

        <p className='no-account'>
          Don't have an Account?{' '}
          <Link to='/signup'>
            <span>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
