/** @format */

import PhoneIcon from 'assets/icons/phone-icon.svg?react';
import MailIcon from 'assets/icons/mail-icon.svg?react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Select from 'components/Input/Select';
import './Signup.scss';

const OperationInfo = () => {
  return (
    <div className='signup'>
      <div className='card'>
        <h4>Operation Info</h4>

        <Input
          type='tel'
          label='Business Phone Number'
          icon={<PhoneIcon className='input-icon' />}
          placeholder='Enter Phone Number'
        />

        <Input
          type='email'
          label='Business Email'
          icon={<MailIcon className='input-icon' />}
          placeholder='Enter Business Email'
        />

        <Select
          label='Business open time'
          options={['Select Open Time', 'Time 1', 'Time 2']}
        />

        <Select
          label='Business close time'
          options={['Select Close Time', 'Time 1', 'Time 2']}
        />

        <Select
          label='Days of operation'
          options={['Select Days of operation', 'Option 1', 'Option 2']}
        />

        <Button label='Submit Profile' variant='primary' size='lg' to='/' />
      </div>
    </div>
  );
};

export default OperationInfo;
